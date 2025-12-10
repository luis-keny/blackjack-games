import { useEffect, useReducer } from "react"
import { BlackjackGameReducer, getInitialState } from "../reducer/blackjackGameReduce"
import { WIN_SCORE } from "../utils/const"

export const useGame = () => {
  const [state, dispatch] = useReducer(BlackjackGameReducer, getInitialState())
  const { 
    deck,
    dealerHand,
    playerHand,
    winner,
    dealerScore,
    playerScore,
    isReadyPlayer,
  } = state

  useEffect(() => {
    if (playerScore < WIN_SCORE) return

    dispatch({ type: "READY_PLAYER" })
  }, [playerScore])
  
  
  const handlePlayPlayer = () => {
    dispatch({ type: "PLAYER_TURN" })
  }
  
  const handlePlayDealer = () => {
    dispatch({ type: "DEALER_TURN" })
  }

  const handleResetGame = () => {
    dispatch({ type: 'RESET_GAME', payload: getInitialState() })
  }

  const handleReadyPlayer = () => {
    dispatch({ type: "READY_PLAYER" })
  }

  return {
    // Values
    dealerHand,
    playerHand,
    deck,
    winner,
    dealerScore,
    playerScore,
    isReadyPlayer,

    // Actions
    handlePlayPlayer,
    handleReadyPlayer,
    handlePlayDealer,
    handleResetGame,
  }
}