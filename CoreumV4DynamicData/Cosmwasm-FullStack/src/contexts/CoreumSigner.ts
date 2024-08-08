import { createContext } from 'react';
import { SigningStargateClient } from "@cosmjs/stargate";




export const CoreumSigner = createContext(null as SigningStargateClient | null);

