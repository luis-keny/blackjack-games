import { HeaderCustom } from "./shared/components/HeaderCustom"
import { WinnerAnnouncement } from "./shared/components/WinnerAnnouncement"
import { Desktop } from "./blackjack-game/components/Desktop.tsx"

const dealerHandInit = [
  '/img/grey_back.png',
  '/img/grey_back.png',
]

export const App = () => {
  return (
    <>
      <HeaderCustom title="BlackJack" hasActions/>
      <WinnerAnnouncement />

      <main className="max-w-[800px] mx-auto space-y-4">
        <Desktop playerName="Device" playerHand={dealerHandInit}/>
        <Desktop playerName="Player" hasActions score={0} playerHand={[]}/>
      </main>
    </>
  )
}
