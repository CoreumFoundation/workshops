// #[cfg(test)]
// mod tests {
//     use std::fmt::Binary;

//     use crate::contract::{execute, instantiate, query};
//     use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
//     use crate::state::CLASS_ID;
    
//     use base64::decode;



//     use super::*;
//     use coreum_wasm_sdk::assetnft::ClassResponse;
//     use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
//     use cosmwasm_std::{from_binary, Addr, CosmosMsg, OwnedDeps};

//     #[test]
//     #[test]
//     fn proper_initialization() {
//         let mut deps = mock_dependencies();
//         let msg = InstantiateMsg {
//             name: "TestClass".to_string(),
//             symbol: "TEST".to_string(),
//             description: Some("A test class".to_string()),
//             uri: None,
//             uri_hash: None,
//             data: None,
//             features: vec![].into(),
//             royalty_rate: None,
//         };
//         let info = mock_info("creator", &[]);
//         let env = mock_env();

//         let res = instantiate(deps.as_mut(), env, info, msg).unwrap();
//         assert_eq!(0, res.messages.len());

//         let class_id = CLASS_ID.load(&deps.storage).unwrap();
//         assert_eq!(class_id, "test-addr0000");
//     }

//     #[test]
//     fn mint_immutable_nft() {
//         let mut deps = mock_dependencies();
//         let msg = InstantiateMsg {
//             name: "TestClass".to_string(),
//             symbol: "TEST".to_string(),
//             description: Some("A test class".to_string()),
//             uri: None,
//             uri_hash: None,
//             data: None,
//             features: vec![].into(),
//             royalty_rate: None,
//         };
//         let info = mock_info("creator", &[]);
//         let env = mock_env();

//         instantiate(deps.as_mut(), env.clone(), info.clone(), msg).unwrap();

//         let mint_msg = ExecuteMsg::MintImmutable {
//             id: "1".to_string(),
//             uri: None,
//             uri_hash: None,
//             data: None,
//             recipient: Some("recipient".to_string()),
//         };

//         let res = execute(deps.as_mut(), env.clone(), info.clone(), mint_msg).unwrap();
//         assert_eq!(res.messages.len(), 1);

//         let mint_msg = &res.messages[0];
//         match &mint_msg.msg {
//             CosmosMsg::Stargate { type_url, value } => {
//                 assert_eq!(type_url, &"/coreum.assetnft.v1.MsgMint".to_string());
//             }
//             _ => panic!("Unexpected message: {:?}", mint_msg),
//         }
//     }

// //     #[test]
// // fn modify_nft_data() {
// //     let mut deps = mock_dependencies();
// //     let msg = InstantiateMsg {
// //         name: "TestClass".to_string(),
// //         symbol: "TEST".to_string(),
// //         description: Some("A test class".to_string()),
// //         uri: None,
// //         uri_hash: None,
// //         data: None,
// //         features: vec![].into(),
// //         royalty_rate: None,
// //     };
// //     let info = mock_info("creator", &[]);
// //     let env = mock_env();

// //     instantiate(deps.as_mut(), env.clone(), info.clone(), msg).unwrap();

// //     let mint_msg = ExecuteMsg::MintMutable {
// //         id: "1".to_string(),
// //         uri: None,
// //         uri_hash: None,
// //         data: None,
// //         recipient: Some("recipient".to_string()),
// //     };

// //     execute(deps.as_mut(), env.clone(), info.clone(), mint_msg).unwrap();

// //     let data = <dyn Binary>::from(decode("dGVzdGRhdGE=").unwrap());
// //     let modify_msg = ExecuteMsg::ModifyData {
// //         id: "1".to_string(),
// //         data,
// //     };
// //     let res = execute(deps.as_mut(), env, info, modify_msg).unwrap();
// //     assert_eq!(res.messages.len(), 1);

// //     let modify_msg = &res.messages[0];
// //     match &modify_msg.msg {
// //         CosmosMsg::Stargate { type_url, value } => {
// //             assert_eq!(type_url, &"/coreum.assetnft.v1.MsgUpdateData".to_string());
// //         }
// //         _ => panic!("Unexpected message: {:?}", modify_msg),
// //     }
// // }

//     #[test]
//     fn query_nft_class() {
//         let mut deps = mock_dependencies();
//         let msg = InstantiateMsg {
//             name: "TestClass".to_string(),
//             symbol: "TEST".to_string(),
//             description: Some("A test class".to_string()),
//             uri: None,
//             uri_hash: None,
//             data: None,
//             features: vec![].into(),
//             royalty_rate: None,
//         };
//         let info = mock_info("creator", &[]);
//         let env = mock_env();

//         instantiate(deps.as_mut(), env.clone(), info.clone(), msg).unwrap();

//         let query_msg = QueryMsg::Class {};
//         let res = query(deps, env, query_msg).unwrap();
//         let value: ClassResponse = from_binary(&res).unwrap();

//         assert_eq!(value.class.id, "test-addr0000");
//         assert_eq!(value.class.name, "TestClass");
//     }
// }
