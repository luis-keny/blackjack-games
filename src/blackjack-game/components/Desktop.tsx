interface DesktopProps {
  playerName: string
  score?: number
  hasActions?: boolean
  isDisabledActions?: boolean
  onAdd?: () => void
  onReady?: () => void
  playerHand: string[]
}

export const Desktop = ({ 
  playerName,
  score,
  hasActions = false,
  isDisabledActions = false,
  onAdd,
  onReady,
  playerHand = []
}: DesktopProps) => {
  return (
    <article>
      <header className="flex justify-between items-center">
        <h2 className="text-3xl mb-2 space-x-2">
          <span>{ playerName }</span> 
          <span className="player-score text-sm bg-indigo-300/20 border border-indigo-100 px-2 py-1 rounded-md font-bold">
            <strong>score: </strong>
            <span>{ score ? score : '?' }</span>
          </span>
        </h2>
        {hasActions && (<div className="space-x-2">
          <button
            disabled={isDisabledActions} 
            onClick={onAdd}
            className="btn-player-add-card bg-cyan-500 px-4 py-1 rounded-md h-fit cursor-pointer ring-cyan-500/50 hover:ring-4 active:scale-95 disabled:opacity-50"
          >Add</button>
          <button 
            disabled={isDisabledActions}
            onClick={onReady}
            className="btn-player-ready bg-blue-600 px-4 py-1 rounded-md h-fit cursor-pointer ring-blue-500/50 hover:ring-4 active:scale-95 disabled:opacity-50">
          Ready</button>
        </div>)}
      </header>
      <section className="player-desktop flex px-6 pl-38 py-4 bg-slate-800 rounded-md h-[352px] overflow-x-auto overflow-y-hidden">
        {playerHand.length > 0 && playerHand.map(card => (
          <img key={`card-player-${playerName}-${card}`} src={card} className="rounded-lg h-80 w-52 -ml-32" alt={card}></img>
        ))}
      </section>
    </article>
  )
}
