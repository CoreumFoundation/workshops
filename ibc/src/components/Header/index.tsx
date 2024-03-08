import React from 'react';
import Link from 'next/link';
import { chainName } from '../../config/defaults';
import { useChain } from '@cosmos-kit/react';
import { Dropdown } from '../Dropdown';
import Image from 'next/image';

export const Header = () => {
    const chainContext = useChain(chainName);

    const handleConnect = React.useCallback(async () => {
        if (chainContext.isWalletConnected === false) {
            chainContext.connect();
        }
    }, [chainContext.isWalletConnected, chainContext]);

    const handleCopyAddress = React.useCallback(() => {
        // Create a temporary textarea element
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = chainContext.address as string;

        document.body.appendChild(tempTextArea);

        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999); // For mobile devices

        // Execute the copy command
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        alert('Address is copied');
    }, [chainContext.address]);

    const handleDisconnectWallet = React.useCallback(() => {
        if (chainContext.isWalletConnected) {
            chainContext.disconnect();
        }
    }, [chainContext]);

    const dropdownItems = React.useMemo(() => [
        {
            label: 'Copy Address',
            callback: handleCopyAddress,
            icon: 'copy',
        },
        {
            label: 'Disconnect',
            callback: handleDisconnectWallet,
            icon: 'disconnect',
        },
        {
            label: 'View on Explorer',
            icon: 'explorer',
            type: 'link',
            link: `https://explorer.coreum.com/coreum/accounts/${chainContext.address}`,
        },
    ], [handleCopyAddress, handleDisconnectWallet, chainContext.address]);

    const renderConnectWallet = React.useMemo(() => {
        return (
            <div
                onClick={handleConnect}
                className="flex items-center justify-center font-semibold bg-gradient-teal py-2 px-2 sm:px-5 rounded text-sm cursor-pointer"
            >
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.80957 6.16666C0.80957 4.15477 2.44053 2.5238 4.45243 2.5238L8.09528 2.5238C9.60411 2.5238 10.8719 3.55576 11.2314 4.95238H12.9524C14.7408 4.95238 16.1905 6.40212 16.1905 8.19047V12.2381C16.1905 14.0264 14.7408 15.4762 12.9524 15.4762L4.04766 15.4762C2.25931 15.4762 0.80957 14.0264 0.80957 12.2381L0.80957 8.59523L0.80957 8.19047L0.80957 6.16666ZM8.09528 3.33333C9.1527 3.33333 10.0523 4.00912 10.3857 4.95238L4.04766 4.95238C3.08191 4.95238 2.2149 5.37516 1.62163 6.04575C1.68497 4.53703 2.92813 3.33333 4.45243 3.33333L8.09528 3.33333ZM1.61909 8.59523L1.61909 8.19047C1.61909 6.84921 2.7064 5.7619 4.04766 5.7619L12.9524 5.7619C14.2937 5.7619 15.381 6.84921 15.381 8.19047V12.2381C15.381 13.5794 14.2937 14.6667 12.9524 14.6667L4.04766 14.6667C2.7064 14.6667 1.61909 13.5794 1.61909 12.2381L1.61909 8.59523ZM11.3334 7.78571C11.1098 7.78571 10.9286 7.96693 10.9286 8.19047C10.9286 8.41401 11.1098 8.59523 11.3334 8.59523H12.9524C13.176 8.59523 13.3572 8.41401 13.3572 8.19047C13.3572 7.96693 13.176 7.78571 12.9524 7.78571H11.3334Z" fill="#17191E"/>
                    <path d="M11.2314 4.95238L10.9893 5.01469L11.0376 5.20238H11.2314V4.95238ZM10.3857 4.95238V5.20238H10.7392L10.6214 4.86906L10.3857 4.95238ZM1.62163 6.04575L1.37185 6.03526L1.34231 6.73875L1.80887 6.2114L1.62163 6.04575ZM1.61909 8.19047H1.36909H1.61909ZM1.61909 8.59523H1.86909H1.86909H1.61909ZM1.61909 12.2381H1.36909H1.61909ZM4.45243 2.2738C2.30246 2.2738 0.55957 4.0167 0.55957 6.16666H1.05957C1.05957 4.29284 2.5786 2.7738 4.45243 2.7738V2.2738ZM8.09528 2.2738L4.45243 2.2738V2.7738L8.09528 2.7738V2.2738ZM11.4735 4.89006C11.0863 3.38568 9.72094 2.2738 8.09528 2.2738V2.7738C9.48727 2.7738 10.6575 3.72585 10.9893 5.01469L11.4735 4.89006ZM12.9524 4.70238H11.2314V5.20238H12.9524V4.70238ZM16.4405 8.19047C16.4405 6.26405 14.8788 4.70238 12.9524 4.70238V5.20238C14.6027 5.20238 15.9405 6.54019 15.9405 8.19047H16.4405ZM16.4405 12.2381V8.19047H15.9405V12.2381H16.4405ZM12.9524 15.7262C14.8788 15.7262 16.4405 14.1645 16.4405 12.2381H15.9405C15.9405 13.8884 14.6027 15.2262 12.9524 15.2262V15.7262ZM4.04766 15.7262L12.9524 15.7262V15.2262L4.04766 15.2262V15.7262ZM0.55957 12.2381C0.55957 14.1645 2.12124 15.7262 4.04766 15.7262V15.2262C2.39739 15.2262 1.05957 13.8884 1.05957 12.2381H0.55957ZM0.55957 8.59523L0.55957 12.2381H1.05957L1.05957 8.59523H0.55957ZM0.55957 8.19047L0.55957 8.59523H1.05957V8.19047H0.55957ZM0.55957 6.16666L0.55957 8.19047H1.05957L1.05957 6.16666H0.55957ZM10.6214 4.86906C10.2538 3.82905 9.26194 3.08333 8.09528 3.08333V3.58333C9.04346 3.58333 9.85076 4.1892 10.15 5.03569L10.6214 4.86906ZM4.04766 5.20238L10.3857 5.20238V4.70238L4.04766 4.70238V5.20238ZM1.80887 6.2114C2.3567 5.59218 3.1565 5.20238 4.04766 5.20238V4.70238C3.00731 4.70238 2.0731 5.15815 1.43439 5.88009L1.80887 6.2114ZM4.45243 3.08333C2.79357 3.08333 1.44079 4.39323 1.37185 6.03526L1.87141 6.05623C1.92915 4.68082 3.06269 3.58333 4.45243 3.58333V3.08333ZM8.09528 3.08333L4.45243 3.08333V3.58333H8.09528V3.08333ZM1.36909 8.19047L1.36909 8.59523H1.86909V8.19047H1.36909ZM4.04766 5.5119C2.56833 5.5119 1.36909 6.71114 1.36909 8.19047H1.86909C1.86909 6.98728 2.84447 6.0119 4.04766 6.0119V5.5119ZM12.9524 5.5119L4.04766 5.5119V6.0119L12.9524 6.0119V5.5119ZM15.631 8.19047C15.631 6.71114 14.4318 5.5119 12.9524 5.5119V6.0119C14.1556 6.0119 15.131 6.98728 15.131 8.19047H15.631ZM15.631 12.2381V8.19047H15.131V12.2381H15.631ZM12.9524 14.9167C14.4318 14.9167 15.631 13.7174 15.631 12.2381H15.131C15.131 13.4413 14.1556 14.4167 12.9524 14.4167V14.9167ZM4.04766 14.9167L12.9524 14.9167V14.4167L4.04766 14.4167V14.9167ZM1.36909 12.2381C1.36909 13.7174 2.56833 14.9167 4.04766 14.9167V14.4167C2.84447 14.4167 1.86909 13.4413 1.86909 12.2381H1.36909ZM1.36909 8.59523L1.36909 12.2381H1.86909L1.86909 8.59523H1.36909ZM11.1786 8.19047C11.1786 8.105 11.2479 8.03571 11.3334 8.03571V7.53571C10.9718 7.53571 10.6786 7.82886 10.6786 8.19047H11.1786ZM11.3334 8.34523C11.2479 8.34523 11.1786 8.27594 11.1786 8.19047H10.6786C10.6786 8.55209 10.9718 8.84523 11.3334 8.84523V8.34523ZM12.9524 8.34523H11.3334V8.84523H12.9524V8.34523ZM13.1072 8.19047C13.1072 8.27594 13.0379 8.34523 12.9524 8.34523V8.84523C13.314 8.84523 13.6072 8.55208 13.6072 8.19047H13.1072ZM12.9524 8.03571C13.0379 8.03571 13.1072 8.105 13.1072 8.19047H13.6072C13.6072 7.82886 13.314 7.53571 12.9524 7.53571V8.03571ZM11.3334 8.03571H12.9524V7.53571H11.3334V8.03571Z" fill="#17191E"/>
                </svg>
                <span className="xs:ml-2 text-[#1D222C]">Connect Wallet</span>
            </div>
        );
    }, [chainContext]);

    const renderWallet = React.useMemo(() => {
        if (!chainContext.address) {
            return;
        }

        return (
            <Dropdown title={chainContext?.address} dropdownItems={dropdownItems} />
        );
    }, [chainContext]);

    return (
        <div className="flex flex-col w-full">
            {/* Animated Banner */}
            <div className="text-white text-center py-2 overflow-hidden relative" style={{ 
  background: 'linear-gradient(145deg, #2ECC71, #A2D9CE)' 
}}>
  <div className="whitespace-nowrap animate-marquee" style={{
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' // Adds shadow for depth
  }}>
    <span className="font-bold text-lg md:text-xl lg:text-2xl" // Adjusts font size responsively
    >
      #BuildOnCoreum — The Future of Blockchain Technology — #BuildOnCoreum
    </span>
  </div>
</div>









            

            {/* Header Content */}
            <div className="flex justify-between items-center py-4 md:py-10 px-4 md:px-16 lg:px-32">
                <Link href="/" passHref>
                        <Image
                            src="/coreum-logo.png"
                            width={180}
                            height={36}
                            loading="lazy"
                            alt="Coreum Logo"
                        />
                    
                </Link>
                {chainContext?.address ? renderWallet : renderConnectWallet}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translate3d(100%, 0, 0); }
                    100% { transform: translate3d(-100%, 0, 0); }
                }
                .animate-marquee {
                    animation: marquee 15s linear infinite; /* Reduced from 20s to 15s for faster speed */
                }
            `}</style>
        </div>
    );
};
