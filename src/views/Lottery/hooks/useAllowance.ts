import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getLotteryAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { usephoenix } from '../../../hooks/useContract'
import useRefresh from '../../../hooks/useRefresh'

// Retrieve lottery allowance
const useAllowance = () => {
  const [allowance, setAllowance] = useState(BIG_ZERO)
  const { account } = useWeb3React()
  const phoenixContract = usephoenix()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await phoenixContract.allowance(account, getLotteryAddress())
      setAllowance(new BigNumber(res.toString()))
    }

    if (account) {
      fetchAllowance()
    }
  }, [account, phoenixContract, fastRefresh])

  return allowance
}

export default useAllowance
