use cosmwasm_std::{Binary, CanonicalAddr};
use secret_toolkit::storage::{Item};

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

/// Storage key for this contract's configuration.
pub static CONFIG: Item<State> = Item::new(b"config");

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    /// Admin adress.
    pub admin: CanonicalAddr,
    /// Status of gateway key generation.
    pub keyed: bool,
    /// Private gateway signing key pair.
    pub signing_keys: KeyPair,
}
/// A key pair using the [Binary] type
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema, Default)]
pub struct KeyPair {
    /// Secret key part of the key pair.
    pub sk: Binary,
    /// Public key part of the key pair.
    pub pk: Binary,
}