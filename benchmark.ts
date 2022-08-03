import { ethers } from 'ethers';

import rpcs from './providers.json';
import config from './config.json';

const RATE_LIMIT_MS = config.ethereum.rate;
const PARALLELISM = config.ethereum.parallelism;

export async function compare(providers: ethers.providers.Provider[], quorum = config.ethereum.quorum) {
    // check serially to avoid contention issues
    let base = [];
    providers.concat()
    for (const provider of providers) {
        base.push(await benchmark(provider));
    }

    const fallbackProvider = new ethers.providers.FallbackProvider(providers, quorum);
    const fallback = await benchmark(fallbackProvider);

    return { base, fallback }
}

export async function benchmark(provider: ethers.providers.Provider, maxRequests = 100) {
    let roundTrips = [];
    let start = 0;
    do {
        const now = Date.now();
        if (now - start > RATE_LIMIT_MS) {
            const concurrentRoundTrips = await Promise.all(new Array(PARALLELISM).fill(0).map(async () => {
                const localStart = Date.now();
                try {
                    await provider.getBlockNumber();
                } catch (e) {
                    console.error(e);
                }
                return Date.now() - localStart;
            }));

            start += Math.max(...concurrentRoundTrips);
            roundTrips.push(...concurrentRoundTrips);
        }
    } while (roundTrips.length < maxRequests);

    return roundTrips;
}

const providers = rpcs.ethereum.map((rpc) => new ethers.providers.JsonRpcProvider(rpc));
compare(providers).then(console.log).catch(console.error);

