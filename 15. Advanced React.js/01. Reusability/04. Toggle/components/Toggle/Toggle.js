import React from "react"

const ToggleContext = React.createContext()

export default function Toggle({ children, onToggle }) {
    const [on, setOn] = React.useState(false)
    const firstRender = React.useRef(true)
    

    function toggle() {
        setOn(prevOn => !prevOn)
    }

    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
        } else {
            onToggle()
        }
    }, [on])

    return (
        <ToggleContext.Provider value={{ on, toggle }}>
            {children}
        </ToggleContext.Provider>
    )
}

export { ToggleContext }