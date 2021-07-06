import React from 'react'
import { Text, TooltipText, useTooltip } from '@panphoenixswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'

interface RecentphoenixProfitBalanceProps {
  phoenixToDisplay: number
  dollarValueToDisplay: number
  dateStringToDisplay: string
}

const RecentphoenixProfitBalance: React.FC<RecentphoenixProfitBalanceProps> = ({
  phoenixToDisplay,
  dollarValueToDisplay,
  dateStringToDisplay,
}) => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Balance fontSize="16px" value={phoenixToDisplay} decimals={3} bold unit=" phoenix" />
      <Balance fontSize="16px" value={dollarValueToDisplay} decimals={2} bold prefix="~$" />
      {t('Earned since your last action')}
      <Text>{dateStringToDisplay}</Text>
    </>,
    {
      placement: 'bottom-end',
    },
  )

  return (
    <>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        <Balance fontSize="14px" value={phoenixToDisplay} />
      </TooltipText>
    </>
  )
}

export default RecentphoenixProfitBalance
