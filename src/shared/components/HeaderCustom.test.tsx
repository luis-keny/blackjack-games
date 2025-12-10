import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { HeaderCustom } from './HeaderCustom'

describe('HeaderCustom', () => {
  test('should correctly render the HeaderCustom', () => {
    const title = 'title-testing'
    render(<HeaderCustom title={title}/>)
    expect(screen.getByText(title)).toBeDefined()
  })

  test('should correctly render the HeaderCustom with the button', () => {
    const title = 'title-testing'
    render(<HeaderCustom title={title} hasActions/>)
    expect(screen.getByRole('button')).toBeDefined()
    expect(screen.getByRole('button').innerHTML).toBe('New Game')
  })
  
  test('should execute the custom function when the button is clicked', () => {
    const title = 'title-testing'
    const spyNewGame = vi.fn()
    render(<HeaderCustom title={title} hasActions onNewGame={spyNewGame}/>)
    fireEvent.click(screen.getByRole('button'))
    expect(spyNewGame).toHaveBeenCalled()
  })
})