import type {JSX} from 'react'

type NewGameButtonProps = {
    isGameOver: boolean,
    startNewGame: () => void
}

export default function NewGameButton({ isGameOver, startNewGame }:NewGameButtonProps):JSX.Element | null {
    if (!isGameOver) {
        return null
    } else {
        return (
            <button className="new-game" onClick={startNewGame}>
                New Game
            </button>
        )
    }
}