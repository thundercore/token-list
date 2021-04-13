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
  description?: string
  website: string
  socials: Social[]
  ttswap_exchange: string
  tags: string[]
}

export interface Social {
  name: string
  url: string
}

export interface Tag {
  name: string
  description: string
}
