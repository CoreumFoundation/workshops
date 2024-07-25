use crate::msg::{ExecuteMsg, QueryMsg};
use anybuf::Anybuf;
use base64::decode;
use base64::Engine;
use byteorder::{ByteOrder, LittleEndian};
use cosmwasm_std::{
    entry_point, to_json_binary, BankQuery, Binary, Coin, CosmosMsg::Stargate, Deps, DepsMut, Env,
    MessageInfo, Response, StdError, StdResult, Uint128,
};
use serde_json_wasm::from_str;
use sha2::{Digest, Sha256};

use crate::error::ContractError;
use crate::msg::{InstantiateMsg, JobResponse, JobsResponse, SudoMsg, TransferContext};
use crate::state::{Job, DENOM, EXTRA_DATA, JOBS};
use coreum_wasm_sdk::core::{CoreumMsg, CoreumQueries, CoreumResult};
use cw2::set_contract_version;

// Constants for the contract
const SECRET_VRF_CONTRACT_ADDRESS: &str = "secret1up0mymn4993hgn7zpzu4je34w0n5s7l0mem7rk";
const SECRET_VRF_VERIFICATION_KEY: &str =
    "BClOY6gcGjBCqeaFskrg0VIzptmyftgfY329GcZOvr3/eH/C4pJ4nH6ch6W/gjog8UErnEpIbMUOmElayUOxDas=";
const SECRET_TRANSFER_CHANNEL_ID: &str = "channel-101";
const CHAIN_TRANSFER_CHANNEL_ID: &str = "channel-25";
const AMOUNT_TO_SEND: u128 = 1; // Amount to send in utestcore (from the contract)

// version info for migration info
const CONTRACT_NAME: &str = env!("CARGO_PKG_NAME");
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

// Instantiate entry point
#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    set_contract_version(_deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    let jobs: Vec<Job> = vec![];
    JOBS.save(_deps.storage, &jobs)?;

    DENOM.save(_deps.storage, &_msg.denom)?;
    EXTRA_DATA.save(
        _deps.storage,
        &_msg.issuance_msg.extra_data.unwrap_or_default(),
    )?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", _info.sender))
}

// Execute entry point
#[entry_point]
pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetAllJobs {} => query_all_jobs(deps),
        QueryMsg::GetJobById { id } => query_job_by_id(deps, id),
    }
}

fn query_job_by_id(deps: Deps, id: String) -> StdResult<Binary> {
    let jobs = JOBS.load(deps.storage)?;
    let job = jobs.iter().find(|&job| job.id == id).ok_or_else(|| {
        println!("Job with id {} not found", id); // Add logging
        StdError::not_found("Job")
    })?;

    let response = JobResponse {
        id: job.id.clone(),
        randomness: job.randomness.clone(),
        result: job.result.clone(),
    };

    println!("Job found: {:?}", response); // Add logging

    let binary_response = to_json_binary(&response)?;
    println!("Serialized Binary Response: {:?}", binary_response); // Add logging

    Ok(binary_response)
}
fn query_all_jobs(deps: Deps) -> StdResult<Binary> {
    let jobs = JOBS.load(deps.storage)?;
    let response = JobsResponse {
        jobs: jobs
            .iter()
            .map(|job| JobResponse {
                id: job.id.clone(),
                randomness: job.randomness.clone(),
                result: job.result.clone(),
            })
            .collect(),
    };

    to_json_binary(&response)
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: ExecuteMsg) -> StdResult<Response> {
    match msg {
        ExecuteMsg::RequestRandom { job_id } => request_random(deps, env, info, job_id),
        ExecuteMsg::ReceiveRandom {
            job_id,
            randomness,
            signature,
        } => receive_random(deps, env, job_id, randomness, signature),
    }
}

fn receive_random(
    deps: DepsMut,
    _env: Env,
    job_id: String,
    randomness: String,
    signature: String,
) -> StdResult<Response> {
    // Log receipt of the IBC packet
    let mut response = Response::new();
    response = response.add_attribute("action", "receive_random");
    response = response.add_attribute("job_id", job_id.clone());
    response = response.add_attribute("randomness", randomness.clone());
    response = response.add_attribute("signature", signature.clone());

    let random_number = randomness.clone();

    let data = base64::prelude::BASE64_STANDARD
        .decode(randomness.clone())
        .expect("Failed to decode base64 data.");

    let my_int = LittleEndian::read_i32(&data);
    let coin_flip_result = if my_int % 2 == 0 { "Heads" } else { "Tails" };

    // // Load the current list of jobs from the state
    let mut jobs = JOBS.load(deps.storage)?;

    //update the state
    let new_job = Job {
        id: job_id.clone(),
        randomness: randomness.clone(),
        result: coin_flip_result.to_string(),
    };

    jobs.push(new_job);

    JOBS.save(deps.storage, &jobs)?;

    // Add result attributes to the response
    response = response.add_attribute("random", "successful");
    response = response.add_attribute("coin_flip_result", coin_flip_result);
    response = response.add_attribute("random_number", random_number);

    Ok(response)
}

fn request_random(
    _deps: DepsMut,
    env: Env,
    info: MessageInfo,
    job_id: String,
) -> StdResult<Response> {
    // Create the IBC Hook memo that will be executed by Secret Network
    let ibc_callback_hook_memo = format!(
        "{{\"wasm\": {{\"contract\": \"{}\", \"msg\": {{\"request_random\": {{\"job_id\": \"{}\", \"num_words\": \"1\", \"callback_channel_id\": \"{}\", \"callback_to_address\": \"{}\", \"timeout_sec_from_now\": \"{}\"}}}}}}}}",
        SECRET_VRF_CONTRACT_ADDRESS, // Secret VRF Contract address on Secret Network
        job_id,
        SECRET_TRANSFER_CHANNEL_ID, // IBC Channel on the Secret Network side to send it back
        env.contract.address,
        "900" // IBC callback timeout, here 900s = 15 min
    );

    let funds = if info.funds.is_empty() {
        // Query the contract balance to use its funds

        Coin {
            denom: "ucore".to_string(),
            amount: Uint128::from(AMOUNT_TO_SEND),
        }
    } else {
        info.funds[0].clone()
    };

    // Construct a CosmosMsg::Stargate message with the serialized IBC Transfer Data
    let msg = Stargate {
        type_url: "/ibc.applications.transfer.v1.MsgTransfer".to_string(),
        value: Anybuf::new()
            .append_string(1, "transfer") // source port
            .append_string(2, CHAIN_TRANSFER_CHANNEL_ID.to_string()) // source channel (IBC Channel on your network side)
            .append_message(
                3,
                &Anybuf::new()
                    .append_string(1, funds.denom.clone())
                    .append_string(2, funds.amount.to_string()),
            ) // Token
            .append_string(4, env.contract.address) // sender
            .append_string(5, SECRET_VRF_CONTRACT_ADDRESS.to_string()) // receiver
            .append_message(6, &Anybuf::new().append_uint64(1, 0).append_uint64(2, 0)) // TimeoutHeight
            .append_uint64(7, env.block.time.plus_seconds(900).nanos()) // TimeoutTimestamp, here 900s = 15 min
            .append_string(8, ibc_callback_hook_memo)
            .into_vec()
            .into(),
    };

    // Return the response with the Secret VRF IBC message added to it

    Ok(Response::new().add_message(msg))
}

#[entry_point]
pub fn sudo(deps: DepsMut, env: Env, msg: SudoMsg) -> StdResult<Response> {
    match msg {
        SudoMsg::ExtensionTransfer {
            sender,
            recipient,
            transfer_amount,
            commission_amount,
            burn_amount,
            context,
        } => sudo_extension_transfer(
            deps,
            env,
            transfer_amount,
            sender,
            recipient,
            commission_amount,
            burn_amount,
            context,
        ),
    }
}

pub fn sudo_extension_transfer(
    deps: DepsMut,
    env: Env,
    amount: Uint128,
    sender: String,
    recipient: String,
    commission_amount: Uint128,
    burn_amount: Uint128,
    context: TransferContext,
) -> StdResult<Response> {
    let info = MessageInfo {
        sender: deps.api.addr_validate(&sender).unwrap(),
        funds: vec![],
    };

    let job_id = "Smart Token Extension!".to_string(); // Assume this function generates a job ID

    request_random(deps, env, info, job_id).map_err(|err| err.into())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::msg::{InstantiateMsg, QueryMsg};
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{attr, from_binary, Binary};

    #[test]
    fn test_receive_random_and_query() {
        let mut deps = mock_dependencies();
        let env = mock_env();
        let info = mock_info("sender", &[]);

        // Initialize the contract state
        let instantiate_msg = InstantiateMsg {};
        instantiate(deps.as_mut(), env.clone(), info.clone(), instantiate_msg).unwrap();
        println!("Contract instantiated");

        let job_id = "14".to_string();
        let randomness = "AQIDBA==".to_string();
        //decode to [1,2,3,4] in Byte which then convert to 67305985 in base10
        let signature = "JIk2iB4p4G94CxUyFxuv8vaUZQ0LVf8M1rWlUvNenjkam8wYtwg5JjKlcv2KxR0FrfTe2Ju2YozJ94Tc5XTDbw==".to_string();

        // Call the receive_random function
        let result = receive_random(
            deps.as_mut(),
            env.clone(),
            job_id.clone(),
            randomness.clone(),
            signature.clone(),
        )
        .unwrap();

        // Verify the attributes in the response
        // assert_eq!(
        //     result.attributes,
        //     vec![
        //         attr("action", "receive_random"),
        //         attr("job_id", job_id.clone()),
        //         attr("randomness", randomness.clone()),
        //         attr("random", "successful"),
        //         //67305985 == tail
        //         attr("coin_flip_result", "Tail"),
        //     ]
        // );

        // Query job by ID
        let res = query(
            deps.as_ref(),
            env.clone(),
            QueryMsg::GetJobById { id: job_id.clone() },
        )
        .unwrap();

        // Print the raw binary data for debugging
        println!("Raw Binary Response: {:?}", res);

        let job: JobResponse = from_binary(&res).unwrap();
        println!("JobResponse: {:?}", job);

        assert_eq!(job.id, job_id.clone());
        assert_eq!(job.randomness, randomness.clone());
        assert_eq!(job.result, "Tails");

        //get all jobs

        let mut jobs = JOBS.load(deps.as_ref().storage).unwrap();

        // Add mock jobs to the state
        let mock_jobs = vec![
            Job {
                id: "15".to_string(),
                randomness: "randomness1".to_string(),
                result: "Heads".to_string(),
            },
            Job {
                id: "job2".to_string(),
                randomness: "randomness2".to_string(),
                result: "Tails".to_string(),
            },
        ];

        jobs.push(mock_jobs[0].clone());
        jobs.push(mock_jobs[1].clone());

        JOBS.save(deps.as_mut().storage, &jobs.clone()).unwrap();

        let res = query(deps.as_ref(), env, QueryMsg::GetAllJobs {}).unwrap();
        let jobs: JobsResponse = from_binary(&res).unwrap();
        println!("All Jobs Response: {:?}", jobs.jobs);

        assert_eq!(jobs.jobs.len(), 3);
        assert_eq!(jobs.jobs[0].id, job_id.clone());
        assert_eq!(jobs.jobs[1].id, "15");
        assert_eq!(jobs.jobs[2].id, "job2");
    }

    // Additional test cases can be added here
}
