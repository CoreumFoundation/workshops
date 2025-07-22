"use client";
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { swapTokenPair } from "../features/dex";

const TokenSelector = () => {
  const dispatch = useDispatch();
  const { base, quote } = useSelector(
    (state: RootState) => state.dex.tokenPair
  );

  const handleClick = () => {
    dispatch(swapTokenPair());
  };

  return (
    <div className="flex items-center justify-between bg-indigo-900/50 p-4 rounded-lg">
      <div className="relative flex justify-start w-20">
        <div className="relative w-11 h-11 z-10">
          <Image src={base.logo} alt={`${base.symbol} Logo`} fill />
        </div>
        <div className="relative w-11 h-11 -ml-4 z-0">
          <Image src={quote.logo} alt={`${quote.symbol} Logo`} fill />
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <span className="text-white text-xl font-semibold">
          {`${base.symbol} / ${quote.symbol}`}
        </span>
      </div>
      <div className="flex justify-end w-20">
        <button className="text-white" onClick={handleClick}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.0213923 17.5251C0.0632244 17.734 0.166526 17.9263 0.318865 18.0775L5.9525 23.6722C6.05235 23.7739 6.17165 23.8555 6.30366 23.9117C6.43709 23.9686 6.58075 23.9986 6.7262 24C6.87165 24.0013 7.01583 23.9736 7.15027 23.9191C7.28469 23.8644 7.40659 23.784 7.50892 23.6822C7.61123 23.5807 7.69196 23.4601 7.74656 23.3276C7.80114 23.1952 7.82858 23.0534 7.82733 22.9104C7.82608 22.7676 7.7962 22.6263 7.7393 22.4947C7.68291 22.3644 7.60107 22.246 7.49829 22.1467L7.49275 22.1413L3.72071 18.3954H22.9084C23.1992 18.3954 23.4771 18.2805 23.6815 18.0776C23.8859 17.8747 24 17.6003 24 17.3151C24 17.0299 23.8859 16.7555 23.6815 16.5526C23.4771 16.3495 23.1992 16.2349 22.9084 16.2349H1.09156C0.87491 16.2351 0.663453 16.2989 0.483935 16.418C0.304473 16.5373 0.165163 16.7062 0.0830668 16.9031C0.000970437 17.1001 -0.0204399 17.3164 0.0213923 17.5251ZM16.501 1.82992L20.2793 5.58226H1.09159C0.800896 5.58226 0.522855 5.69696 0.318417 5.89996C0.11411 6.10283 0 6.37722 0 6.66252C0 6.94782 0.11411 7.22218 0.318417 7.42505C0.522818 7.62801 0.800803 7.7427 1.09144 7.74274L22.9086 7.74261C23.1251 7.74252 23.3366 7.67864 23.516 7.55951C23.6955 7.44039 23.8348 7.27148 23.9169 7.07462C23.9991 6.87778 24.0205 6.6614 23.9789 6.45267C23.9371 6.24414 23.8337 6.05165 23.6815 5.90026L18.0521 0.309746L18.0491 0.306778C17.8435 0.108594 17.5671 -0.00202526 17.2791 2.80842e-05C16.9912 0.00210008 16.7163 0.11662 16.5137 0.317698C16.3114 0.518663 16.1975 0.789872 16.1955 1.07249C16.1934 1.35377 16.3034 1.62648 16.501 1.82992Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TokenSelector;
