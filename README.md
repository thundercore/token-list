# How to add  your Token to ThunderCore Hub ⚡️

## Intro
This intro shows you how to list your token on to the ThunderCore Hub, a cryptocurrency wallet with a DAU (Daily Average Users) exceeding 35K. Your tokens will have a chance of achieving great success!

ThunderCore strives to create a platform full of opportunities, rich with content and have many users for developers. You can achieve your dreams here in the ThunderCore community! 

*Please note that your project must be sound and have available information, and most importantly: it must meet all the necessary conditions listed in this article.*

## Token Information
* Fulfill all the reviewing items below:
   * Token information 
      * Address 
      * Symbol 
      * Name 
      * Decimals 
      * Description (optional) 
   * Contact information of submitter (Twitter / Telegram / Email)
   * Product / Website URL 
   * Logo / Icon image (should be not larger than *256 x 256* pixel) 
   * The token contract must be verified on [Viewblock](https://viewblock.io/thundercore)

## Decline Listing Policy
- Miss any token information mentioned above
- Upon verification, if found that the smart contract is malicious, ThunderCore reserves the right to decline/revoke listing.

## Listing Fee
- 1,000 Thunder Token  (TT) per listing
- NOTE: In the case of rejected application, there will be no refund. 

## Listing steps
1. Create a pull request to change the `token-list`
2. Initiate a transaction to **0x103550d3e41F5e6986aDfDAbaBF610f750932B54**. Its data has a pull request number, and the value must be at least `1000TT`
3. Update transaction hash in the pull request

## Your logo information
- naming convention: `assets/{chain}/{token_address}/logo.png`
- location: `assets`

## Which files needs to be updated exactly? 
### If you want to add token to mainnet
- `src/thundercore.json`
- `assets/thundercore/{token_address}/logo.png`

### If you want to add token to testnet
- `src/thundercore-testnet.json`
- `assets/thundercore-testnet/{token_address}/logo.png`

## Disclaimer
- If your project has not been updated for a period of time or is found to be malicious, ThunderCore reserves the right to remove the token from the ThunderCore Hub.
- After your token is listed, it does not mean that ThunderCore has a partnership with your project directly. 
- Token listing requests are not guaranteed to be reviewed or executed. 
