import React from 'react'
import { Card, CardBody, Heading, Text } from '@panphoenixswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getphoenixAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledphoenixStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const phoenixStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getphoenixAddress()))
  const phoenixSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledphoenixStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('phoenix Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Total phoenix Supply')}</Text>
          {phoenixSupply && <CardValue fontSize="14px" value={phoenixSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total phoenix Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('New phoenix/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={20} />
        </Row>
      </CardBody>
    </StyledphoenixStats>
  )
}

export default phoenixStats
