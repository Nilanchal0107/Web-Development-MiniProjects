import React from "react"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"

const MenuContext = React.createContext()

// https://scrimba.com/links/learn-react-useid

export default function Menu({ children }) {
    const [open, setOpen] = React.useState(false)
    const menuId = React.useId()

    function toggle() {
        setOpen(prevOpen => !prevOpen)
    }
    


    return (
        <MenuContext.Provider value={{open, toggle, menuId}}>
            <div className="menu" role="menu">
                {children}
            </div>
        </MenuContext.Provider>
    )
}

export { MenuContext }