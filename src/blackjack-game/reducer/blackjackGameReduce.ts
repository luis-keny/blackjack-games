import { MIN_SCORE_DEALER, RANKS_NAIPES, SUITS_NAIPES, WIN_SCORE } from "../utils/const"
import type { WinnerType as WinnerAnnouncementType } from '../../shared/components/WinnerAnnouncement'

type WinnerType = WinnerAnnouncementType | undefined

interface BlackjackGameState {
  deck: string[]
  winner: WinnerType
  isGameOver: boolean
  isReadyPlayer: boolean
  playerHand: string[]
  playerScore: number
  dealerHand: string[]
  dealerScore: number
}

const naipeValue = {
  'A' : 1,
  'J' : 11,
  'Q' : 12,
  'K' : 13,
}

const buildDeck = () => {
  const deck: string[] = []
  for (const suit of SUITS_NAIPES) {
    for (const rank of RANKS_NAIPES) {
      deck.push(`/img/${rank}${suit}.png`)
    }
  }
  return deck
}

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const getNaipeScore = (naipeUrl: string): number => {
  const naipeParts = naipeUrl.split('/')
  
  if(naipeParts.length == 0) return 0
  
  const naipe = naipeParts.at(-1)!.split('.')[0]
  const length = naipe.length
  const naipeString = naipe.slice(0, length - 1)

  const NaipeKey = Object.getOwnPropertyNames(naipeValue).find(naipe => naipe === naipeString)

  if (NaipeKey !== undefined) {
    return naipeValue[NaipeKey as keyof typeof naipeValue]
  }
  return parseInt(naipeString)
}

const declareWinner = (dealerScore: number, playerScore: number): NonNullable<WinnerType> => {
  if ((dealerScore > WIN_SCORE && playerScore > WIN_SCORE) || playerScore === dealerScore) {
    return 'none'
  }

  if (
      (playerScore > WIN_SCORE && dealerScore <= WIN_SCORE) || 
      !(dealerScore > WIN_SCORE) && (WIN_SCORE - dealerScore) < (WIN_SCORE - playerScore) 
    ) {
    return 'dealer'
  }
  
  return 'player'
}

export const getInitialState = (): BlackjackGameState => ({
  deck: shuffleArray(buildDeck()),
  dealerHand: [],
  playerHand: [],
  winner: undefined,
  dealerScore: 0,
  playerScore: 0,
  isGameOver: false,
  isReadyPlayer: false,
})

type BlackjackGameAction =
| { type: 'RESET_GAME', payload: BlackjackGameState }
| { type: 'PLAYER_TURN' }
| { type: 'DEALER_TURN' }
| { type: 'READY_PLAYER' }

export const BlackjackGameReducer = (state: BlackjackGameState, action: BlackjackGameAction): BlackjackGameState => {

  switch(action.type) {
    
    case 'RESET_GAME':
      return action.payload
    
    case 'DEALER_TURN': {
      const deck = [...state.deck]
      const dealerHand = [...state.dealerHand]
      let dealerScore = state.dealerScore

      if (dealerScore >= WIN_SCORE) return {...state}

      dealerHand.push(deck[0])
      dealerScore += getNaipeScore(deck[0])
      deck.shift()

      return {
        ...state,
        dealerHand,
        dealerScore,
        deck,
      }
    }
    
    case 'PLAYER_TURN': {
      const deck = [...state.deck]
      const playerHand = [...state.playerHand]
      let playerScore = state.playerScore

      if (playerScore >= WIN_SCORE) return {...state, isReadyPlayer: true}

      playerHand.push(deck[0])
      playerScore += getNaipeScore(deck[0])
      deck.shift()

      return {
        ...state,
        playerHand,
        playerScore,
        deck,
        isReadyPlayer: playerScore >= WIN_SCORE,
      }
    }

    case 'READY_PLAYER': {
      let dealerScore = state.dealerScore
      
      const deck = [...state.deck]
      const dealerHand = [...state.dealerHand]
      
      do {
        dealerHand.push(deck[0])
        dealerScore += getNaipeScore(deck[0])
        deck.shift()
      } while (
        dealerScore < MIN_SCORE_DEALER || 
        (state.playerScore <= WIN_SCORE && state.playerScore > dealerScore && dealerScore < WIN_SCORE)
      )

      const winner = declareWinner(dealerScore, state.playerScore)

      return {
        ...state,
        dealerScore,
        dealerHand,
        deck,
        isGameOver: true,
        isReadyPlayer: true,
        winner
      }
    }

    default:
      return state
  }
}