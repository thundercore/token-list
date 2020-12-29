import token_list_mainnet from '../src/thundercore.json'
import token_list_testnet from '../src/thundercore-testnet.json'
import { Token, List } from '../src/List'
import { ERC20 } from '../types/web3-v1-contracts/ERC20'
import Web3 from 'web3'

import { checkAddressChecksum } from 'web3-utils'

const ERC20ABI = require('../abis/ERC20.json')
const rpcEndpoints: Record<number, string> = {
  18: 'https://testnet-rpc.thundercore.com',
  108: 'https://mainnet-rpc.thundercore.com',
}

describe('token list', () => {
  test('addresses are valid and checksummed', () => {
    const t = (list: List) => {
      const tokens = list.tokens
      for (const token of tokens) {
        expect(checkAddressChecksum(token.address)).toBe(true)
      }
    }
    return testOnTokenLists(t)
  })

  test('no duplicate addresses/symbols/names', () => {
    const t = (list: List) => {
      const tokens = list.tokens
      const addresses = tokens.map((token) => token.address)
      expect(hasDuplicates(addresses)).toBe(false)
      const symbols = tokens.map((token) => token.symbol)
      expect(hasDuplicates(symbols)).toBe(false)
      const names = tokens.map((token) => token.name)
      expect(hasDuplicates(names)).toBe(false)
    }
    return testOnTokenLists(t)
  })

  test('valid tags', () => {
    const t = (list: List) => {
      const tags = new Set(Object.keys(list.tags))
      const tokens = list.tokens
      for (const token of tokens) {
        expect(hasDuplicates(token.tags)).toBe(false)
        for (const tag of token.tags) {
          expect(tags.has(tag)).toBe(true)
        }
      }
    }
    return testOnTokenLists(t)
  })

  test('verify contract info', () => {
    const verifyToken = (token: Token, contract: ERC20) => {
      return Promise.all([
        contract.methods.symbol().call(),
        contract.methods.name().call(),
        contract.methods.decimals().call(),
      ]).then(([s, n, d]) => {
        expect(s).toBe(token.symbol)
        expect(n).toBe(token.name)
        expect(parseInt(d)).toBe(token.decimals)
      })
    }
    const t = (list: List) => {
      const endpoint = rpcEndpoints[list.chainID]
      let web3 = new Web3(new Web3.providers.HttpProvider(endpoint))
      return Promise.all(
        list.tokens.map((token) => {
          const contract = (new web3.eth.Contract(ERC20ABI, token.address) as unknown) as ERC20
          return verifyToken(token, contract)
        }),
      )
    }
    return testOnTokenLists(t)
  })
})

function hasDuplicates(a: string[]): Boolean {
  const s = new Set(a)
  return a.length !== s.size
}

function testOnTokenLists(t: (list: List) => void) {
  return Promise.all(
    [token_list_mainnet, token_list_testnet].map((l) => {
      return t(l)
    }),
  )
}
