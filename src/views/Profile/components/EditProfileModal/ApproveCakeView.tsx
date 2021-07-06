import React, { useState } from 'react'
import { AutoRenewIcon, Button, Flex, InjectedModalProps, Text } from '@panphoenixswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { usephoenix } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useProfile } from 'state/hooks'
import { getPanphoenixProfileAddress } from 'utils/addressHelpers'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useGetProfileCosts from 'views/Profile/hooks/useGetProfileCosts'
import { UseEditProfileResponse } from './reducer'

interface ApprovephoenixPageProps extends InjectedModalProps {
  goToChange: UseEditProfileResponse['goToChange']
}

const ApprovephoenixPage: React.FC<ApprovephoenixPageProps> = ({ goToChange, onDismiss }) => {
  const [isApproving, setIsApproving] = useState(false)
  const { profile } = useProfile()
  const { t } = useTranslation()
  const { numberphoenixToUpdate, numberphoenixToReactivate } = useGetProfileCosts()
  const phoenixContract = usephoenix()
  const { toastError } = useToast()
  const cost = profile.isActive ? numberphoenixToUpdate : numberphoenixToReactivate

  const handleApprove = async () => {
    const tx = await phoenixContract.approve(getPanphoenixProfileAddress(), cost.times(2).toJSON())
    setIsApproving(true)
    const receipt = await tx.wait()
    if (receipt.status) {
      goToChange()
    } else {
      toastError(t('Error'))
      setIsApproving(false)
    }
  }

  if (!profile) {
    return null
  }

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text>{profile.isActive ? t('Cost to update:') : t('Cost to reactivate:')}</Text>
        <Text>{getFullDisplayBalance(cost)} phoenix</Text>
      </Flex>
      <Button
        disabled={isApproving}
        isLoading={isApproving}
        endIcon={isApproving ? <AutoRenewIcon spin color="currentColor" /> : null}
        width="100%"
        mb="8px"
        onClick={handleApprove}
      >
        {t('Approve')}
      </Button>
      <Button variant="text" width="100%" onClick={onDismiss} disabled={isApproving}>
        {t('Close Window')}
      </Button>
    </Flex>
  )
}

export default ApprovephoenixPage
