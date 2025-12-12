import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { WinnerAnnouncement } from "./WinnerAnnouncement";

describe('WinnerAnnouncement', () => {
  test('should correctly render the WinnerAnnouncement with the value "none"', () => {
    render(<WinnerAnnouncement winner="none" />)
    expect(screen.getByText('NO WINNER')).toBeDefined()
  })
  test('should correctly render the WinnerAnnouncement with the value "dealer"', () => {
    render(<WinnerAnnouncement winner="dealer" />)
    expect(screen.getByText('WIN DEALER')).toBeDefined()
  })
  test('should correctly render the WinnerAnnouncement with the value "player"', () => {
    render(<WinnerAnnouncement winner="player" />)
    expect(screen.getByText('WIN PLAYER')).toBeDefined()
  })
})