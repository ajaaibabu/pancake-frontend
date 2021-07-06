import BigNumber from 'bignumber.js'
import { getphoenixAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's phoenix balance is at least the amount passed in
 */
const useHasphoenixBalance = (minimumBalance: BigNumber) => {
  const { balance: phoenixBalance } = useTokenBalance(getphoenixAddress())
  return phoenixBalance.gte(minimumBalance)
}

export default useHasphoenixBalance
