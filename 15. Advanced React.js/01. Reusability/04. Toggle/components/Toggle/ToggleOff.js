import React from "react"
import { ToggleContext } from "./Toggle"

export default function ToggleOff({ children }) {
    const { on } = React.useContext(ToggleContext)
    
    return on ? null : children
}