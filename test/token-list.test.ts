import token_list_zeus from '../src/zeus.json'
import token_list_venus from '../src/venus.json'
import { Token, List } from '../src/List'

import { checkAddressChecksum } from 'web3-utils'

describe('token list', () => {
  test('addresses are valid and checksummed', () => {
    const t = (list: List) => {
      const tokens = list.tokens
      for (const token of tokens) {
        expect(checkAddressChecksum(token.address)).toBe(true)
      }
    }
    testOnTokenLists(t)
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
    testOnTokenLists(t)
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
    testOnTokenLists(t)
  })
})

function hasDuplicates(a: string[]): Boolean {
  const s = new Set(a)
  return a.length !== s.size
}

function testOnTokenLists(t: (list: List) => void) {
  for (const list of [token_list_zeus, token_list_venus]) {
    t(list)
  }
}
