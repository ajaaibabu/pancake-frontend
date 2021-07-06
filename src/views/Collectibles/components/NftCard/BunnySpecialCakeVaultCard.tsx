import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useSpecialBunnyphoenixVaultContract } from 'hooks/useContract'
import { getBunnySpecialphoenixVaultContract } from 'utils/contractHelpers'
import NftCard, { NftCardProps } from './index'

const BunnySpecialphoenixVaultCard: React.FC<NftCardProps> = ({ nft, ...props }) => {
  const [isClaimable, setIsClaimable] = useState(false)
  const { account } = useWeb3React()
  const bunnySpecialphoenixVaultContract = useSpecialBunnyphoenixVaultContract()
  const { variationId } = nft

  const handleClaim = async () => {
    const response: ethers.providers.TransactionResponse = await bunnySpecialphoenixVaultContract.mintNFT()
    await response.wait()
    setIsClaimable(false)
    return response
  }

  useEffect(() => {
    const fetchClaimStatus = async () => {
      const contract = getBunnySpecialphoenixVaultContract()
      const canClaim = await contract.canClaim(account)
      setIsClaimable(canClaim)
    }

    if (account) {
      fetchClaimStatus()
    }
  }, [account, variationId, bunnySpecialphoenixVaultContract, setIsClaimable])

  return <NftCard nft={nft} {...props} canClaim={isClaimable} onClaim={handleClaim} />
}

export default BunnySpecialphoenixVaultCard
