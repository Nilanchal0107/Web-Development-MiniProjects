import React from "react"
import Toggle from "../Toggle/index"

export default function MenuDropdown({ children }) {
    return (
        <Toggle.On>
            <div className="menu-dropdown">
                {children}
            </div>
        </Toggle.On>
    )
}