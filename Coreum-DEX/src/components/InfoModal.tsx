"use client";

import { Cross1Icon } from "@radix-ui/react-icons";

const InfoModal = ({
  isOpen,
  onClose,
  isExampleExpanded = false,
  setIsExampleExpanded = () => {},
}: {
  isOpen: boolean;
  onClose: () => void;
  isExampleExpanded?: boolean;
  setIsExampleExpanded?: (expanded: boolean) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="flex flex-col items-center p-1 sm:p-10 md:p-20 w-full h-screen max-w-full absolute left-0 right-0 top-0 bottom-0 bg-[#1e1a78]/75 backdrop-blur-[2px] z-50 items-center justify-center">
      <div className="flex flex-col w-[640px] max-w-full max-h-full overflow-y-auto p-8 bg-indigo-900/70 border-primary/60 border rounded-2xl backdrop-blur-sm gap-8">
        <div className="flex justify-between w-full text-lg font-space-grotesk text-white font-medium">
          <h2>No Loss Draft</h2>
          <div
            className="flex flex-col items-center justify-center !cursor-pointer text-white hover:text-white/80 transition-colors"
            onClick={onClose}
          >
            <Cross1Icon className="w-4 h-4" color="#F79D84" />
          </div>
        </div>
        <div className="flex flex-col w-full text-white">
          <div className="flex flex-col gap-6">
            <p className="text-sm md:text-base text-white/80">
              Coreum.fun is a no Loss Draft where participants can win without
              risking their principal investment.
            </p>

            <div className="space-y-3">
              <h3 className="font-bold text-lg">How It Works:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-white/80">
                <li>
                  500 tickets are available at a price of 200 $COREUM each
                </li>
                <li>
                  If you miss the initial buy-in, you can still purchase tickets
                  on the DEX (if someone is willing to sell)
                </li>
                <li>Maximum 5 tickets per wallet</li>
                <li>
                  For each ticket bought, you receive an equal amount of $TICKET
                  tokens (e.g., 2 tickets = 2 $TICKET)
                </li>
                <li>
                  Your $COREUM is automatically staked to the $Coreum Labs
                  validator
                </li>
                <li>Staking rewards are pooled together as the Draft prize</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-lg">$TICKET Tokens:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-white/80">
                <li>
                  $TICKET tokens can be traded on the Coreum Native Orderbook
                  DEX at your desired price
                </li>
                <li>
                  At the end of the draft, you can burn your $TICKET to reclaim
                  your COREUM (7-day undelegation process)
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-lg">Important Notes:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-white/80">
                <li>
                  This is a no-loss draft - you can always reclaim your
                  principal investment
                </li>
                <li>
                  The exact date of the draw will be announced on the Coreum
                  Labs X account
                </li>
                <li>
                  The prize pool consists of staking rewards plus bonus
                  contributions
                </li>
              </ul>
            </div>

            {/* Add Medium Article Link */}
            <div className="mt-4">
              <a
                href="https://medium.com/@coreumlabs/introducing-coreum-fun-ac28118771a9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <span>Read more on Medium</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            {/* Example Section */}
            <div className="mt-4">
              <button
                onClick={() => setIsExampleExpanded(!isExampleExpanded)}
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <span>{isExampleExpanded ? "Hide" : "Show"} Example</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isExampleExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isExampleExpanded && (
                <div className="mt-4 p-4 bg-indigo-800/50 rounded-lg">
                  <h3 className="font-bold mb-4 text-lg">
                    No Loss Draft Example:
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-indigo-900/50 rounded-lg">
                      You purchase 2 tickets for 400 COREUM total
                    </div>
                    <div className="p-3 bg-indigo-900/50 rounded-lg">
                      You receive 2 $TICKET tokens
                    </div>
                    <div className="p-3 bg-indigo-900/50 rounded-lg">
                      Your 400 COREUM is staked to the Coreum Labs validator
                    </div>
                    <div className="p-3 bg-indigo-900/50 rounded-lg">
                      Options after purchase:
                    </div>
                    <ul className="space-y-2 pl-4 text-white/80">
                      <li>
                        • Wait for the draft and potentially win the prize pool
                      </li>
                      <li>• Trade your $TICKET tokens on the DEX</li>
                      <li>
                        • After the draft, burn your $TICKET tokens to reclaim
                        your 400 COREUM
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/80 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
