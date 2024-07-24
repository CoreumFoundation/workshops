use cw_storage_plus::Item;
use serde::Deserialize;
use serde::Serialize;
pub const JOBS: Item<Vec<Job>> = Item::new("jobs");

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct Job {
    pub id: String,
    pub randomness: String,
    pub result: String,
}

pub const DENOM: Item<String> = Item::new("state");
pub const EXTRA_DATA: Item<String> = Item::new("extradata");
