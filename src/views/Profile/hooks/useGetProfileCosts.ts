import { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { multicallv2 } from 'utils/multicall'
import profileABI from 'config/abi/panphoenixProfile.json'
import { getPanphoenixProfileAddress } from 'utils/addressHelpers'
import useToast from '../../../hooks/useToast'

const useGetProfileCosts = () => {
  const { t } = useTranslation()
  const [costs, setCosts] = useState({
    numberphoenixToReactivate: BIG_ZERO,
    numberphoenixToRegister: BIG_ZERO,
    numberphoenixToUpdate: BIG_ZERO,
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const calls = ['numberphoenixToReactivate', 'numberphoenixToRegister', 'numberphoenixToUpdate'].map((method) => ({
          address: getPanphoenixProfileAddress(),
          name: method,
        }))
        const [[numberphoenixToReactivate], [numberphoenixToRegister], [numberphoenixToUpdate]] = await multicallv2(
          profileABI,
          calls,
        )

        setCosts({
          numberphoenixToReactivate: new BigNumber(numberphoenixToReactivate.toString()),
          numberphoenixToRegister: new BigNumber(numberphoenixToRegister.toString()),
          numberphoenixToUpdate: new BigNumber(numberphoenixToUpdate.toString()),
        })
      } catch (error) {
        toastError(t('Error'), t('Could not retrieve phoenix costs for profile'))
      }
    }

    fetchCosts()
  }, [setCosts, toastError, t])

  return costs
}

export default useGetProfileCosts
