import { describe, expect, test } from "vitest";
import { BlackjackGameReducer, declareWinner, getInitialState } from "./blackjackGameReduce";

describe('blackjackGameReduce', () => {
  test('should correctly execute the reset game', () => {
    const initialState = getInitialState()
    const next = BlackjackGameReducer(initialState, { type: 'RESET_GAME', payload: initialState })
    
    expect(next).toStrictEqual(initialState)
  })
  
  test('should dealer turn get more naipes', () => {
    const initialState = getInitialState()
    const initialDeck = [...initialState.deck]
    const next = BlackjackGameReducer(initialState, { type: 'DEALER_TURN' })
    
    expect(initialDeck.length - 1).toBe(next.deck.length)
    expect(next.dealerHand.length).toBe(1)
    expect(next.dealerScore).not.toBe(0)
  })
  
  test('should player turn get more naipes', () => {
    const initialState = getInitialState()
    const initialDeck = [...initialState.deck]
    const next = BlackjackGameReducer(initialState, { type: 'PLAYER_TURN' })
    
    expect(initialDeck.length - 1).toBe(next.deck.length)
    expect(next.playerHand.length).toBe(1)
    expect(next.playerScore).not.toBe(0)
  })
  
  test('should correctly execute the ready player', () => {
    const initialState = getInitialState()
    const next = BlackjackGameReducer(initialState, { type: 'READY_PLAYER' })
    
    expect(next.winner).not.toBe(undefined)
    expect(next.isGameOver).toBeTruthy()
    expect(next.isReadyPlayer).toBeTruthy()
  })
  
  test("should declare the PLAYER as the winner when player's score is 21 and dealer score is higher than 21", () => {
    const playerScore = 21
    const dealerScore = 22
    const winner = declareWinner(dealerScore, playerScore)
    
    expect(winner).not.toBe(undefined)
    expect(winner).toBe('player')
  })
  
  test("should declare the PLAYER as the winner when player's score is 21 and dealer score is less than 21", () => {
    const playerScore = 21
    const dealerScore = 19
    const winner = declareWinner(dealerScore, playerScore)
    
    expect(winner).not.toBe(undefined)
    expect(winner).toBe('player')
  })
  
  test("should declare the DEALER as the winner when dealer's score is 21 and player score is higher than 21", () => {
    const dealerScore = 21
    const playerScore = 22
    const winner = declareWinner(dealerScore, playerScore)
    
    expect(winner).not.toBe(undefined)
    expect(winner).toBe('dealer')
  })
  
  test("should declare the DEALER as the winner when dealer's score is 21 and player score is less than 21", () => {
    const dealerScore = 21
    const playerScore = 19
    const winner = declareWinner(dealerScore, playerScore)
    
    expect(winner).not.toBe(undefined)
    expect(winner).toBe('dealer')
  })
  
  test("should not declare a winner when the participants' points are equal", () => {
    const dealerScore = 19
    const playerScore = 19
    const winner = declareWinner(dealerScore, playerScore)
    
    expect(winner).not.toBe(undefined)
    expect(winner).toBe('none')
  })
  
  test("should not declare a winner when the participants' points are both exceed 21", () => {
    const dealerScore = 22
    const playerScore = 22
    const winner = declareWinner(dealerScore, playerScore)
    
    expect(winner).not.toBe(undefined)
    expect(winner).toBe('none')
  })
  
  test("throws when dealerScore is less than 16", () => {
    const dealerScore = 15
    
    expect(() => declareWinner(dealerScore, 17)).toThrow()
  })
})