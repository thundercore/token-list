export interface List {
  chainID: number
  tokens: Token[]
  tags: { [key: string]: Tag }
}

export interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI: string
  tags: string[]
}

export interface Tag {
  name: string
  description: string
}
