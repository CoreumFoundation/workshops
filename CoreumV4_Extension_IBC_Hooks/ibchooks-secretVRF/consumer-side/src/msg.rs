use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Uint128;

#[cw_serde]
pub struct InstantiateMsg {
    pub denom: String,
    pub issuance_msg: IssuanceMsg,
}

#[cw_serde]
pub struct IssuanceMsg {
    pub extra_data: Option<String>,
}

#[cw_serde]
pub enum ExecuteMsg {
    RequestRandom {
        job_id: String,
    },
    ReceiveRandom {
        job_id: String,
        randomness: String,
        signature: String,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(JobsResponse)]
    GetAllJobs {},
    #[returns(JobResponse)]
    GetJobById { id: String },
}

#[cw_serde]
pub struct JobResponse {
    pub id: String,
    pub randomness: String,
    pub result: String,
}

#[cw_serde]
pub struct JobsResponse {
    pub jobs: Vec<JobResponse>,
}

#[cw_serde]
pub enum IBCPurpose {
    None,
    Out,
    In,
    Ack,
    Timeout,
}

#[cw_serde]
pub struct TransferContext {
    pub sender_is_smart_contract: bool,
    pub recipient_is_smart_contract: bool,
    pub ibc_purpose: IBCPurpose,
}

#[cw_serde]
pub enum SudoMsg {
    ExtensionTransfer {
        recipient: String,
        sender: String,
        transfer_amount: Uint128,
        commission_amount: Uint128,
        burn_amount: Uint128,
        context: TransferContext,
    },
}
