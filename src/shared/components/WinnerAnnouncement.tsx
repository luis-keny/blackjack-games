export type WinnerType = 'dealer' | 'player' | 'none'

interface WinnerAnnouncementProps {
  winner?: WinnerType
}

const textColorWinner: Record<WinnerType, string> = {
  dealer: 'text-pink-500',
  player: 'text-emerald-500',
  none: 'text-blue-300'
}

export const WinnerAnnouncement = ({ winner }: WinnerAnnouncementProps) => {
  
  return (
    <>
      { winner && (
        <p className={`winner text-5xl text-center font-bold ${textColorWinner[winner]}`}>
          {winner === 'none' ? 'NO WINNER' : `WIN ${winner.toUpperCase()}`}
        </p>
      )}
    </>
  )
}
