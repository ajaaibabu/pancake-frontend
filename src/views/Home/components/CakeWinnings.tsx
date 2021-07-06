import React from 'react'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePricephoenixBusd } from 'state/hooks'
import { Text } from '@panphoenixswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

interface phoenixWinningsProps {
  claimAmount: BigNumber
}

const phoenixWinnings: React.FC<phoenixWinningsProps> = ({ claimAmount }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const phoenixAmount = getBalanceNumber(claimAmount)
  const phoenixPriceBusd = usePricephoenixBusd()
  const claimAmountBusd = new BigNumber(phoenixAmount).multipliedBy(phoenixPriceBusd).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={phoenixAmount} lineHeight="1.5" />
      {phoenixPriceBusd.gt(0) && <CardBusdValue value={claimAmountBusd} decimals={2} />}
    </Block>
  )
}

export default phoenixWinnings
