import Image from "next/image";

export default function Workshop() {
  return (
    <main className=" col-span-2 flex items-center justify-center min-h-[500px]">
      <div className="bg-white/10 rounded-xl p-8 col-span-2 h-full min-h-[400px] border-white/10 border w-full max-w-xl flex flex-col items-center justify-center shadow-lg">
        <div className="flex flex-col gap-4 items-center text-center w-full">
          <Image
            src="/dollar_sign.gif"
            alt="Dollar Sign"
            width={80}
            height={80}
            className="mb-2"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
            The 'No-Loss' Crypto Draft
          </h1>
          <ul className="text-left text-white/90 text-base flex flex-col gap-3 mt-4 w-full max-w-md mx-auto">
            <li>
              <span role="img" aria-label="deposit">
                🏠
              </span>{" "}
              500 tickets are for sale at the price of 200 $COREUM
            </li>
            <li>
              <span role="img" aria-label="yield">
                ☑️
              </span>{" "}
              The yield accrues on all deposits
            </li>
            <li>
              <span role="img" aria-label="countdown">
                ⏱️
              </span>{" "}
              When the 500 tickets are bought up, the countdown starts
            </li>
            <li>
              <span role="img" aria-label="trade">
                🔁
              </span>{" "}
              Users can trade their{" "}
              <span className="font-semibold text-blue-200">$TICKET</span> on
              the Coreum DEX
            </li>
            <li>
              <span role="img" aria-label="prize">
                🏆
              </span>{" "}
              The yield is randomly awarded as prizes to a user holding a{" "}
              <span className="font-semibold text-blue-200">$TICKET</span>
            </li>
            <li>
              <span role="img" aria-label="withdraw">
                ✅
              </span>{" "}
              Users withdraw their collateral (the 200 $COREUM they used to buy
              the ticket)
            </li>
          </ul>
          <p className="mt-6 text-sm text-white/80">
            Join the{" "}
            <a
              href="https://t.me/coreum_labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:opacity-80 transition-opacity"
            >
              Coreum Labs telegram
            </a>{" "}
            for more information
          </p>
        </div>
      </div>
    </main>
  );
}
