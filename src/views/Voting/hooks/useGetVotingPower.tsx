import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { BIG_ZERO } from 'utils/bigNumber'
import { getActivePools } from 'utils/calls'
import { getAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'
import { getVotingPower } from '../helpers'

interface State {
  verificationHash: string
  phoenixBalance: BigNumber
  phoenixVaultBalance: BigNumber
  phoenixPoolBalance: BigNumber
  poolsBalance: BigNumber
  phoenixBnbLpBalance: BigNumber
  total: BigNumber
}

const initialState: State = {
  verificationHash: null,
  phoenixBalance: BIG_ZERO,
  phoenixVaultBalance: BIG_ZERO,
  phoenixPoolBalance: BIG_ZERO,
  poolsBalance: BIG_ZERO,
  phoenixBnbLpBalance: BIG_ZERO,
  total: BIG_ZERO,
}

const useGetVotingPower = (block?: number, isActive = true): State & { isLoading: boolean } => {
  const { account } = useWeb3React()
  const [votingPower, setVotingPower] = useState(initialState)
  const [isLoading, setIsLoading] = useState(!!account)

  useEffect(() => {
    const fetchVotingPower = async () => {
      setIsLoading(true)

      try {
        const blockNumber = block || (await simpleRpcProvider.getBlockNumber())
        const eligiblePools = await getActivePools(blockNumber)
        const poolAddresses = eligiblePools.map(({ contractAddress }) => getAddress(contractAddress))
        const {
          phoenixBalance,
          phoenixBnbLpBalance,
          phoenixPoolBalance,
          total,
          poolsBalance,
          phoenixVaultBalance,
          verificationHash,
        } = await getVotingPower(account, poolAddresses, blockNumber)

        if (isActive) {
          setVotingPower((prevVotingPower) => ({
            ...prevVotingPower,
            verificationHash,
            phoenixBalance: new BigNumber(phoenixBalance),
            phoenixBnbLpBalance: new BigNumber(phoenixBnbLpBalance),
            phoenixPoolBalance: new BigNumber(phoenixPoolBalance),
            poolsBalance: new BigNumber(poolsBalance),
            phoenixVaultBalance: new BigNumber(phoenixVaultBalance),
            total: new BigNumber(total),
          }))
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (account && isActive) {
      fetchVotingPower()
    }
  }, [account, block, setVotingPower, isActive, setIsLoading])

  return { ...votingPower, isLoading }
}

export default useGetVotingPower
