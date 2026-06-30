/*
CHALLENGE 1: Explictly type the WordLetter's component's return value
CHALLENGE 2: Type the component's props using a custom Type
CHALLENGE 3: Explictly type any variables in the component
*/

import { clsx } from "clsx"
import type {JSX} from 'react'

type WordLettersProps = {
    currentWord: string,
    guessedLetters: string[],
    isGameLost: boolean
}

export default function WordLetters({ currentWord, guessedLetters, isGameLost }:WordLettersProps):JSX.Element {
    return (
        <section className="word">
            {currentWord.split("").map((letter:string, index:number):JSX.Element => {
                const shouldRevealLetter:boolean = isGameLost || guessedLetters.includes(letter)
                const letterClassName:string = clsx(
                    isGameLost && !guessedLetters.includes(letter) && "missed-letter"
                )
                return (
                    <span key={index} className={letterClassName}>
                        {shouldRevealLetter ? letter.toUpperCase() : ""}
                    </span>
                )
            })}
        </section>
    )
}