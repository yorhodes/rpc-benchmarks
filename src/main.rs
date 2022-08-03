// use ethers_core::types::Address;
// use ethers_providers::{Provider, Http, Middleware};
// use std::convert::TryFrom;

use std::fs::File;
use std::io::Read;

fn main() {
    let mut file = File::open("providers.json").unwrap();
    let mut data = String::new();
    file.read_to_string(&mut data).unwrap();
    println!("data: {}", data);

    // let provider = Provider::<Http>::try_from(
    //     "https://mainnet.infura.io/v3/YOUR_API_KEY"
    // )?;


    // println!("Hello, world!");
}
