export interface Token {
  denom: string;
  issuer?: string;
  symbol: string;
  subunit?: string;
  precision?: number;
  amount?: string;
  logo: string;
}
export interface TokenPair {
  base: Token;
  quote: Token;
}

