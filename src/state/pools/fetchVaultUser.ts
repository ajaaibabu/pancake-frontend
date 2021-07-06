import BigNumber from 'bignumber.js'
import { getphoenixVaultContract } from 'utils/contractHelpers'

const phoenixVaultContract = getphoenixVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await phoenixVaultContract.userInfo(account)
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares.toString()).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime.toString(),
      lastUserActionTime: userContractResponse.lastUserActionTime.toString(),
      phoenixAtLastUserAction: new BigNumber(userContractResponse.phoenixAtLastUserAction.toString()).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      phoenixAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
