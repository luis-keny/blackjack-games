interface HeaderCustomProps {
  title: string
  hasActions?: boolean
  onNewGame?: () => void
}

export const HeaderCustom = ({ title = 'Game', onNewGame, hasActions = false }: HeaderCustomProps) => {
  return (
    <header className="flex justify-center items-end gap-2 mb-4">
      <h1 className="text-5xl font-bold text-center">
        {title}
      </h1>
      {hasActions && (
        <button
          onClick={onNewGame} 
          className="btn-new-game bg-amber-500 text-xl font-bold px-4 py-1 rounded-md h-fit cursor-pointer ring-amber-500/50 hover:ring-4 active:scale-95"
        >
          New Game
        </button>
      )}
    </header>
  )
}
