import BigNumber from 'bignumber.js'
import { convertSharesTophoenix } from 'views/Pools/helpers'
import { multicallv2 } from 'utils/multicall'
import phoenixVaultAbi from 'config/abi/phoenixVault.json'
import { getphoenixVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

export const fetchPublicVaultData = async () => {
  try {
    const calls = [
      'getPricePerFullShare',
      'totalShares',
      'calculateHarvestphoenixRewards',
      'calculateTotalPendingphoenixRewards',
    ].map((method) => ({
      address: getphoenixVaultAddress(),
      name: method,
    }))

    const [[sharePrice], [shares], [estimatedphoenixBountyReward], [totalPendingphoenixHarvest]] = await multicallv2(
      phoenixVaultAbi,
      calls,
    )

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalphoenixInVaultEstimate = convertSharesTophoenix(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalphoenixInVault: totalphoenixInVaultEstimate.phoenixAsBigNumber.toJSON(),
      estimatedphoenixBountyReward: new BigNumber(estimatedphoenixBountyReward.toString()).toJSON(),
      totalPendingphoenixHarvest: new BigNumber(totalPendingphoenixHarvest.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalphoenixInVault: null,
      estimatedphoenixBountyReward: null,
      totalPendingphoenixHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const calls = ['performanceFee', 'callFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: getphoenixVaultAddress(),
      name: method,
    }))

    const [[performanceFee], [callFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(phoenixVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      callFee: callFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
