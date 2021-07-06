import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'PanphoenixSwap',
  description:
    'The most popular AMM on BSC by user count! Earn phoenix through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PanphoenixSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://panphoenixswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('PanphoenixSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('PanphoenixSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('PanphoenixSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('PanphoenixSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('PanphoenixSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('PanphoenixSwap')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('PanphoenixSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('PanphoenixSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('PanphoenixSwap')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('PanphoenixSwap')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('PanphoenixSwap')}`,
      }
    default:
      return null
  }
}
