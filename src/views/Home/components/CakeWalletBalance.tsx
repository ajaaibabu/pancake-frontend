import React from 'react'
import { Text } from '@panphoenixswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getphoenixAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePricephoenixBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const phoenixWalletBalance = () => {
  const { t } = useTranslation()
  const { balance: phoenixBalance } = useTokenBalance(getphoenixAddress())
  const phoenixPriceBusd = usePricephoenixBusd()
  const busdBalance = new BigNumber(getBalanceNumber(phoenixBalance)).multipliedBy(phoenixPriceBusd).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(phoenixBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {phoenixPriceBusd.gt(0) ? <CardBusdValue value={busdBalance} /> : <br />}
    </>
  )
}

export default phoenixWalletBalance
