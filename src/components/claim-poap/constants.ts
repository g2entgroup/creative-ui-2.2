// URLS
export const API_BASE_URL = 'https://api.poap.tech'
export const APP_BASE_URL = 'https://app.poap.xyz'

// STATES
export const NO_POAP = 'NO_POAP'
export const NOT_VOTED = 'NOT_VOTED'
export const LOADING = 'LOADING'
export const UNCLAIMED = 'UNCLAIMED'
export const CLAIMED = 'CLAIMED'

type State =
  | typeof NO_POAP
  | typeof NOT_VOTED
  | typeof LOADING
  | typeof UNCLAIMED
  | typeof CLAIMED
type States = { [S in State]: Record<string, any> }
export const STATES: States = {
  NO_POAP: {
    header: "A POAP hasn't been setup for this proposal yet :'(",
    headerImage: 'https://snapshotsplugin.s3.us-west-2.amazonaws.com/empty.svg',
    mainImage:
      'https://snapshotsplugin.s3.us-west-2.amazonaws.com/placeholder.png',
  },
  NOT_VOTED: {
    headerImage: 'https://snapshotsplugin.s3.us-west-2.amazonaws.com/vote.svg',
    header: 'Vote to get this POAP',
    buttonText: 'Mint',
  },
  UNCLAIMED: {
    headerImage: 'https://snapshotsplugin.s3.us-west-2.amazonaws.com/claim.svg',
    header: 'Mint your I voted POAP',
    buttonText: 'Mint',
  },
  CLAIMED: {
    headerImage:
      'https://snapshotsplugin.s3.us-west-2.amazonaws.com/succes.svg',
    header: 'Congratulations! The POAP has been minted to your collection',
    buttonText: 'Browse collection',
  },
  LOADING: {
    headerImage:
      'https://snapshotsplugin.s3.us-west-2.amazonaws.com/succes.svg',
    header: 'The POAP is being minted to your collection',
    buttonText: '',
  },
}
