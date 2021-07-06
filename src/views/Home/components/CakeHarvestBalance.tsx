import React from 'react'
import { Text } from '@panphoenixswap/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { FarmWithBalance } from 'views/Home/hooks/useFarmsWithBalance'
import { usePricephoenixBusd } from 'state/hooks'
import styled from 'styled-components'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

interface phoenixHarvestBalanceProps {
  farmsWithBalance: FarmWithBalance[]
}

const phoenixHarvestBalance: React.FC<phoenixHarvestBalanceProps> = ({ farmsWithBalance }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const earningsSum = farmsWithBalance.reduce((accum, earning) => {
    const earningNumber = new BigNumber(earning.balance)
    if (earningNumber.eq(0)) {
      return accum
    }
    return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
  }, 0)
  const phoenixPriceBusd = usePricephoenixBusd()
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(phoenixPriceBusd).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={earningsSum} lineHeight="1.5" />
      {phoenixPriceBusd.gt(0) && <CardBusdValue value={earningsBusd} />}
    </Block>
  )
}

export default phoenixHarvestBalance
