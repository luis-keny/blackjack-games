import { HeaderCustom } from "./shared/components/HeaderCustom"
import { WinnerAnnouncement } from "./shared/components/WinnerAnnouncement"
import { Desktop } from "./blackjack-game/components/Desktop.tsx"
import { useGame } from "./blackjack-game/hooks/useGame.tsx"

const dealerHiddenHand = [
  '/img/red_back.png',
  '/img/grey_back.png',
]

export const App = () => {
  const {
    dealerHand,
    playerHand,
    winner,
    dealerScore,
    playerScore,
    isReadyPlayer,
    handlePlayPlayer,
    handleReadyPlayer,
    handleResetGame,
  } = useGame()

  return (
    <>
      <HeaderCustom title="BlackJack" hasActions onNewGame={handleResetGame}/>
      <WinnerAnnouncement winner={winner} />

      <main className="max-w-[800px] mx-auto space-y-4">
        <Desktop playerName="Dealer" score={dealerScore} playerHand={isReadyPlayer ? dealerHand : dealerHiddenHand}/>
        <Desktop 
          playerName="Player" 
          hasActions 
          score={playerScore} 
          playerHand={playerHand} 
          onAdd={handlePlayPlayer} 
          onReady={handleReadyPlayer}
          isDisabledActions={isReadyPlayer}
        />
      </main>
    </>
  )
}
