import React from "react"
import { ToggleContext } from "./Toggle"

export default function ToggleDisplay({ children }) {
    const { on } = React.useContext(ToggleContext)
    return children(on)
}