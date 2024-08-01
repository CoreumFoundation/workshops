import { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";
import { useChain } from "@cosmos-kit/react";
import { chainName } from "../config/defaults";
import {
  CoinflipClient,
  CoinflipQueryClient,
} from "@/contract/ts/Coinflip.client";
import { JobsResponse, JobResponse } from "@/contract/ts/Coinflip.types";
import { Coin } from "@cosmjs/stargate";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Center } from "@react-three/drei";
import TWEEN from "@tweenjs/tween.js";

import Model from "@/components/Coin";

const wsEndpoint = "wss://full-node.mainnet-1.coreum.dev:26657/websocket";
// const CONTRACT_ADDRESS =
//   "testcore144rrjk764rc3lufqcu7ypnp0cxezvnufk2e2hlte6nrfg09zjr0qspersy";

const CONTRACT_ADDRESS =
  "core1h7wk989ss6ljuksk9r2c2sva4adf3xfw4dq27sa6lr63lqtjxzzqq2vklp";

function Home() {
  interface CoinFlipEvent {
    result: string;
    txHash: string;
    address: string;
  }
  const chainContext = useChain(chainName);
  const walletAddress = chainContext.address ?? "";
  const [jobs, setJobs] = useState<JobsResponse>();
  const [events, setEvents] = useState<CoinFlipEvent[]>([]);
  const [lastResult, setLastResult] = useState<string>();
  const [menu, setMenu] = useState("game");
  const [flipInProgress, setFlipInProgress] = useState<Boolean>(false);

  const coinRef = useRef();
  const wsRef = useRef(null);

  useEffect(() => {
    getJobs();
  }, [menu]);

  useEffect(() => {
    const ws = new WebSocket(wsEndpoint);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connection established.");
      ws.send(
        JSON.stringify({
          jsonrpc: "2.0",
          method: "subscribe",
          id: "1",
          params: {
            query: `tm.event='Tx' AND transfer.recipient='${CONTRACT_ADDRESS}'`,
          },
        })
      );
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log("WebSocket message:", data);
      handleNewBlock(data);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleNewBlock = (data: any) => {
    if (data.result && data.result.data && data.result.data.value) {
      const txs = data.result.data.value.TxResult;
      if (txs && txs.result && txs.result.events) {
        txs.result.events.forEach((event: any) => {
          if (event.type === "wasm") {
            const attributes = event.attributes;
            attributes.forEach((attr: any) => {
              //TODO: perform check to see if the sender is the wallet connected to the frontend
              //We do not want to display events from other users
              if (attr.key === "coin_flip_result") {
                //@ts-ignore
                setEvents((prevEvents) => [
                  ...prevEvents,
                  { result: attr.value, txHash: txs.tx.hash },
                ]);

                setLastResult(attr.value);
                if (flipInProgress === false) {
                  triggerFlipAnimationfromWallet(attr.value);
                }
                console.log({ events });
                console.log({ lastResult });
                const notify = () => toast.success("🪙" + attr.value);
                notify();
                setFlipInProgress(false);
              }
            });
          }
        });
      }
    }
  };

  function waitForWebSocketMessage() {
    return new Promise((resolve) => {
      const originalOnMessage = wsRef.current.onmessage;
      wsRef.current.onmessage = (message) => {
        if (originalOnMessage) {
          originalOnMessage(message);
        }
        const data = JSON.parse(message.data);
        if (data.result && data.result.data && data.result.data.value) {
          const txs = data.result.data.value.TxResult;
          if (txs && txs.result && txs.result.events) {
            txs.result.events.forEach((event) => {
              if (event.type === "wasm") {
                const attributes = event.attributes;
                attributes.forEach((attr) => {
                  if (attr.key === "coin_flip_result") {
                    resolve(attr.value);
                  }
                });
              }
            });
          }
        }
      };
    });
  }

  const getJobs = async () => {
    try {
      const queryClient = new CoinflipQueryClient(
        await chainContext.getSigningCosmWasmClient(),
        CONTRACT_ADDRESS
      );
      const result = await queryClient.getAllJobs();
      result?.jobs.reverse();
      result?.jobs.splice(5);
      console.log("Jobs:", result);
      setJobs(result);
    } catch (err) {
      console.error("Failed to query jobs:", err);
    }
  };

  const flipTheCoin = async () => {
    // Generate a random job_id
    const job_id = uuidv4();

    const executeClient = new CoinflipClient(
      await chainContext.getSigningCosmWasmClient(),
      walletAddress,
      CONTRACT_ADDRESS
    );

    const funds: Coin = {
      denom: "ucore",
      amount: "1",
    };

    const fee = {
      amount: [
        {
          denom: "ucore",
          amount: "1",
        },
      ],
      gas: "210000",
    };

    const result = await executeClient.requestRandom(
      { jobId: job_id },
      fee,
      "Flip the Coin",
      [funds] // Wrap the 'funds' object in an array
    );
    toast.success(
      <div>
        Transaction sent: <code>{result.transactionHash}</code>
      </div>
    );
    console.log("Request Randomness result:", result);
  };

  function triggerFlipAnimationfromUI() {
    setFlipInProgress(true);
    const flipsCount = 4;
    const coin = coinRef.current;

    coin.position.set(0, 0, 0);
    coin.rotation.set(0, 0, 0);

    const isMobile = window.innerWidth <= 768; // Adjust this value based on your design
    const initialPosition = { y: -5, rotationX: 0, rotationY: 0 };

    const upPosition = isMobile
      ? {
          y: 10,
          rotationX: Math.PI * flipsCount,
          rotationY: Math.PI * flipsCount * 2,
        }
      : {
          y: 4,
          rotationX: Math.PI * flipsCount,
          rotationY: Math.PI * flipsCount * 2,
        };

    let flipResult;
    const downPosition = isMobile
      ? {
          y: 0,
          rotationX: Math.PI * flipsCount,
          rotationY: Math.PI * flipsCount * 4,
        }
      : {
          y: 0,
          rotationX: Math.PI * flipsCount,
          rotationY: Math.PI * flipsCount * 4,
        };

    const tweenUp = new TWEEN.Tween(initialPosition)
      .to(upPosition, 3000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        coin.position.y = initialPosition.y;
        coin.rotation.x = initialPosition.rotationX;
        coin.rotation.y = initialPosition.rotationY;
      });

    const tweenDown = new TWEEN.Tween(upPosition)
      .to(downPosition, 1000)
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(() => {
        coin.position.y = upPosition.y;
        coin.rotation.x = upPosition.rotationX;
        coin.rotation.y = upPosition.rotationY;
      });

    const vacillationPosition1 = {
      rotationX: downPosition.rotationX + 5,
      rotationY: downPosition.rotationY + 5,
    };

    const vacillationPosition2 = {
      rotationX: downPosition.rotationX - 0.5,
      rotationY: downPosition.rotationY - 0.5,
    };

    const tweenVacillate1 = new TWEEN.Tween(downPosition)
      .to(vacillationPosition1, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .yoyo(true)
      .repeat(1)
      .onUpdate(() => {
        coin.rotation.x = downPosition.rotationX;
        coin.rotation.y = downPosition.rotationY;
      });

    const tweenVacillate2 = new TWEEN.Tween(vacillationPosition1)
      .to(vacillationPosition2, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .yoyo(true)
      .repeat(Infinity)
      .onUpdate(() => {
        coin.rotation.x = vacillationPosition1.rotationX;
        coin.rotation.y = vacillationPosition1.rotationY;
      });

    tweenUp.onComplete(() => {
      flipTheCoin().then(() => {
        tweenDown.start();
      });
    });

    tweenDown.onComplete(() => {
      tweenVacillate1.start();
    });

    tweenVacillate1.onComplete(() => {
      tweenVacillate2.start();
    });

    //On IBC message receive
    waitForWebSocketMessage().then((result) => {
      console.log("WebSocket message received:", result);
      tweenVacillate2.stop();
      flipResult = result;
      console.log({ flipResult });
    });

    tweenVacillate2.onStop(() => {
      coin.rotation.set(0, 0, 0);
      coin.position.set(0, 0, 0);
      if (flipResult == "Heads") {
        coin.position.set(0, 0, 0);
        coin.rotation.set(0, 0, 0);
      } else if (flipResult == "Tails") {
        coin.position.set(0, 0, 0);
        coin.rotation.set(0, Math.PI, 0);
      }
    });

    tweenUp.start();

    requestAnimationFrame(animate);

    function animate(time) {
      TWEEN.update(time);
      requestAnimationFrame(animate);
    }
  }

  function triggerFlipAnimationfromWallet(result: string) {
    const flipsCount = 4;
    const coin = coinRef.current;

    coin.position.set(0, 0, 0);
    coin.rotation.set(0, 0, 0);

    const isMobile = window.innerWidth <= 768; // Adjust this value based on your design
    const initialPosition = { y: -5, rotationX: 0, rotationY: 0 };

    const upPosition = isMobile
      ? {
          y: 10,
          rotationX: Math.PI * flipsCount,
          rotationY: Math.PI * flipsCount * 2,
        }
      : {
          y: 4,
          rotationX: Math.PI * flipsCount,
          rotationY: Math.PI * flipsCount * 2,
        };

    const flipResult = result;
    const downPosition = isMobile
      ? {
          y: 0,
          rotationX: Math.PI * flipsCount,
          rotationY: Math.PI * flipsCount * 4,
        }
      : {
          y: 0,
          rotationX: Math.PI * flipsCount,
          rotationY: Math.PI * flipsCount * 4,
        };

    const tweenUp = new TWEEN.Tween(initialPosition)
      .to(upPosition, 3000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        coin.position.y = initialPosition.y;
        coin.rotation.x = initialPosition.rotationX;
        coin.rotation.y = initialPosition.rotationY;
      });

    const tweenDown = new TWEEN.Tween(upPosition)
      .to(downPosition, 1000)
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(() => {
        coin.position.y = upPosition.y;
        coin.rotation.x = upPosition.rotationX;
        coin.rotation.y = upPosition.rotationY;
      });

    const vacillationPosition1 = {
      rotationX: downPosition.rotationX + 5,
      rotationY: downPosition.rotationY + 5,
    };

    const vacillationPosition2 = {
      rotationX: downPosition.rotationX - 0.5,
      rotationY: downPosition.rotationY - 0.5,
    };

    const tweenVacillate1 = new TWEEN.Tween(downPosition)
      .to(vacillationPosition1, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .yoyo(true)
      .repeat(1)
      .onUpdate(() => {
        coin.rotation.x = downPosition.rotationX;
        coin.rotation.y = downPosition.rotationY;
      });

    const tweenVacillate2 = new TWEEN.Tween(vacillationPosition1)
      .to(vacillationPosition2, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .yoyo(true)
      .repeat(2)
      .onUpdate(() => {
        coin.rotation.x = vacillationPosition1.rotationX;
        coin.rotation.y = vacillationPosition1.rotationY;
      });

    tweenUp.onComplete(() => {
      tweenDown.start();
    });

    tweenDown.onComplete(() => {
      tweenVacillate1.start();
    });

    tweenVacillate1.onComplete(() => {
      tweenVacillate2.start();
    });

    tweenVacillate2.onComplete(() => {
      coin.rotation.set(0, 0, 0);
      coin.position.set(0, 0, 0);
      if (flipResult == "Heads") {
        coin.position.set(0, 0, 0);
        coin.rotation.set(0, 0, 0);
      } else if (flipResult == "Tails") {
        coin.rotation.set(0, 0, 0);
        coin.position.set(0, 0, 0);
        coin.rotation.set(0, Math.PI, 0);
      }
    });

    tweenUp.start();

    requestAnimationFrame(animate);

    function animate(time) {
      TWEEN.update(time);
      requestAnimationFrame(animate);
    }
  }

  return (
    <>
      <div className="flex  grid grid-cols-3  min-h-screen relative">
        <div className="col-span-3 z-10 relative">
          <Header />
          <ToastContainer />
        </div>
        <div className="text-sm font-medium text-center text-gray-500 place-self-center z-10">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <a
                onClick={() => setMenu("game")}
                href="#"
                className={`${
                  menu == "game" ? "border-2 border-[#25D695] text-white" : ""
                }  m-1 inline-block p-4 rounded-md hover:text-gray-600 hover:border-gray-300`}
              >
                Game
              </a>
            </li>
          </ul>
        </div>

        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between">
          <div className="flex flex-1 justify-center items-start">
            <div className="w-full h-full">
              {menu === "game" && (
                <>
                  <Canvas camera={{ fov: 35, zoom: 0.3, near: 1, far: 1000 }}>
                    <group>
                      <Stage
                        adjustCamera
                        intensity={0.5}
                        shadows="contact"
                        environment="city"
                      >
                        <Suspense fallback={null}>
                          <Model ref={coinRef} />
                          <pointLight position={[0, 20, 10]} intensity={2} />
                          <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            enableRotate={false}
                          />
                        </Suspense>
                      </Stage>
                    </group>
                  </Canvas>
                </>
              )}
            </div>
          </div>
        </div>
        {menu === "results" && (
          <div className=" container flex flex-col items-center  mt-10 ">
            <ul className="flex flex-col">
              {jobs?.jobs.map((job) => (
                <li key={job.id} className="flex flex-row mb-2 border-gray-400">
                  <div
                    className={`transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer ${
                      job.result == "Heads"
                        ? "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900"
                        : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-200 via-violet-500 to-sky-900"
                    } rounded-md flex flex-1 items-center p-4`}
                  >
                    <div className="flex flex-col items-center justify-center w-10 h-10 mr-4"></div>
                    <div className="flex-1 pl-1 md:mr-16">
                      <div className="font-medium dark:text-white">
                        {job.result}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-200">
                        {job.id}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-200"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="text-sm font-medium text-center text-gray-500 place-self-center col-start-3 z-10">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <a
                onClick={() => setMenu("results")}
                href="#"
                className={`${
                  menu == "results"
                    ? "border-2 border-[#25D695] text-white"
                    : ""
                }  m-1 inline-block p-4 rounded-md hover:text-gray-600 hover:border-gray-300`}
                aria-current="page"
              >
                Results
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-3 place-self-center">
          <button
            className="border-[#25D695] border-2 hover:border-0 hover:bg-gradient-to-r from-[#25D695] via-green-300 to-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none"
            onClick={() => triggerFlipAnimationfromUI()}
          >
            Flip the Coin
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
