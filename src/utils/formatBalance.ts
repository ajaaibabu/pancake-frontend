import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { BIG_TEN } from './bigNumber'

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18, displayDecimals?: number) => {
  return getBalanceAmount(balance, decimals).toFixed(displayDecimals)
}

export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  }
  return number.toLocaleString(undefined, options)
}

/**
 * Method to format the display of wei given an ethers.BigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (number: ethers.BigNumber, displayDecimals = 18, decimals = 18) => {
  const balance = formatUnits(number, decimals)
  const [leftSide, rightSide] = balance.split('.')

  let charCount = displayDecimals

  if (leftSide.length > 0) {
    charCount += leftSide.length
  }

  // Add 1 for the decimal point
  if (rightSide.length > 0) {
    charCount += 1
  }

  return balance.substr(0, charCount <= balance.length ? charCount : balance.length)
}
