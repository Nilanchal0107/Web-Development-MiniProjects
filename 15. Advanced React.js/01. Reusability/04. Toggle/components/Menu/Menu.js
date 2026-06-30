import React from "react"
import Toggle from "../Toggle/index"

export default function Menu({ children, onOpen }) {
    /**
     * Challenge:
     * 3. In index.js, pass an onOpen prop to the Menu
     *    component whose value is a function. 
     *    Just use console.log() for now.
     */
    return (
        <Toggle onToggle={onOpen}>
            <div className="menu">
                {children}
            </div>
        </Toggle>
    )
}
