# Config

Copy the template and configure your RPC urls
```shell
cp providers.examples.json providers.json
```

Also check the benchmark configuration in `config.json`

## Typescript

### Install deps
```
yarn install
```

### Run tests

```
yarn ts-node benchmark.ts
```

## Rust

### Install deps

```
cargo install
```

### Run tests

```
cargo build && cargo run
```
