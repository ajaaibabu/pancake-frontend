import React from 'react'
import { Flex, Text } from '@panphoenixswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { usephoenixVault, usePricephoenixBusd } from 'state/hooks'
import { getphoenixVaultEarnings } from 'views/Pools/helpers'
import RecentphoenixProfitBalance from './RecentphoenixProfitBalance'

const RecentphoenixProfitCountdownRow = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    pricePerFullShare,
    userData: { phoenixAtLastUserAction, userShares, lastUserActionTime },
  } = usephoenixVault()
  const phoenixPriceBusd = usePricephoenixBusd()
  const { hasAutoEarnings, autophoenixToDisplay, autoUsdToDisplay } = getphoenixVaultEarnings(
    account,
    phoenixAtLastUserAction,
    userShares,
    pricePerFullShare,
    phoenixPriceBusd.toNumber(),
  )

  const lastActionInMs = lastUserActionTime && parseInt(lastUserActionTime) * 1000
  const dateTimeLastAction = new Date(lastActionInMs)
  const dateStringToDisplay = dateTimeLastAction.toLocaleString()

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{`${t('Recent phoenix profit')}:`}</Text>
      {hasAutoEarnings && (
        <RecentphoenixProfitBalance
          phoenixToDisplay={autophoenixToDisplay}
          dollarValueToDisplay={autoUsdToDisplay}
          dateStringToDisplay={dateStringToDisplay}
        />
      )}
    </Flex>
  )
}

export default RecentphoenixProfitCountdownRow
