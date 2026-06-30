import React from "react"
import Button from "../Button/Button"
import Toggle from "../Toggle/index"

export default function MenuButton({ children }) {
    return (
        <Toggle.Button>
            <Button>{children}</Button>
        </Toggle.Button>
    )
}