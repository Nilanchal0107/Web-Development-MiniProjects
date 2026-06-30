import type {JSX} from 'react'

type AriaLiveStatusProps = {
    currentWord:string,
    lastGuessedLetter:string,
    guessedLetters:string[],
    numGuessesLeft:number
}

export default function AriaLiveStatus({
                                           currentWord,
                                           lastGuessedLetter,
                                           guessedLetters,
                                           numGuessesLeft
                                       }:AriaLiveStatusProps):JSX.Element {
    return (
        <section
            className="sr-only"
            aria-live="polite"
            role="status"
        >
            <p>
                {currentWord.includes(lastGuessedLetter) ?
                    `Correct! The letter ${lastGuessedLetter} is in the word.` :
                    `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                }
                You have {numGuessesLeft} attempts left.
            </p>
            <p>
                Current word: {currentWord.split("").map((letter:string):string =>
                guessedLetters.includes(letter) ? letter + "." : "blank."
            ).join(" ")}
            </p>
        </section>
    )
}