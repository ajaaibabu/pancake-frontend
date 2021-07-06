import { useCallback, useState } from 'react'
import { ethers } from 'ethers'
import { usephoenix, useLottery } from 'hooks/useContract'

const useLotteryApprove = () => {
  const phoenixContract = usephoenix()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await phoenixContract.approve(lotteryContract.address, ethers.constants.MaxUint256)
      return tx
    } catch (e) {
      return false
    }
  }, [phoenixContract, lotteryContract])

  return { onApprove: handleApprove }
}

const useApproval = (onPresentApprove: () => void) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { onApprove } = useLotteryApprove()

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
      onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, onPresentApprove])

  return { handleApprove, requestedApproval }
}

export default useApproval
