import { MenuEntry } from '@panphoenixswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Trade'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: 'https://exchange.panphoenixswap.finance/#/swap',
      },
      {
        label: t('Liquidity'),
        href: 'https://exchange.panphoenixswap.finance/#/pool',
      },
      {
        label: t('LP Migration'),
        href: 'https://v1exchange.panphoenixswap.finance/#/migrate',
      },
    ],
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: t('Prediction (BETA)'),
    icon: 'PredictionsIcon',
    href: '/prediction',
  },
  {
    label: t('Lottery'),
    icon: 'TicketIcon',
    href: '/lottery',
  },
  {
    label: t('Collectibles'),
    icon: 'NftIcon',
    href: '/collectibles',
  },
  {
    label: t('Team Battle'),
    icon: 'TeamBattleIcon',
    href: '/competition',
  },
  {
    label: t('Teams & Profile'),
    icon: 'GroupsIcon',
    items: [
      {
        label: t('Leaderboard'),
        href: '/teams',
      },
      {
        label: t('Task Center'),
        href: '/profile/tasks',
      },
      {
        label: t('Your Profile'),
        href: '/profile',
      },
    ],
  },
  {
    label: t('Info'),
    icon: 'InfoIcon',
    href: 'https://panphoenixswap.info',
    status: {
      text: t('New').toLocaleUpperCase(),
      color: 'success',
    },
  },
  {
    label: t('IFO'),
    icon: 'IfoIcon',
    href: '/ifo',
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.panphoenixswap.finance/contact-us',
      },
      {
        label: t('Voting'),
        href: '/voting',
      },
      {
        label: t('Github'),
        href: 'https://github.com/panphoenixswap',
      },
      {
        label: t('Docs'),
        href: 'https://docs.panphoenixswap.finance',
      },
      {
        label: t('Blog'),
        href: 'https://panphoenixswap.medium.com',
      },
      {
        label: t('Merch'),
        href: 'https://panphoenixswap.creator-spring.com/',
      },
    ],
  },
]

export default config
