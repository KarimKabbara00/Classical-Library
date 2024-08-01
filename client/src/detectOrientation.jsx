import { useState, useEffect } from "react"

function IsPortrait() {
    const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
    useEffect(() => {
        const orientation = window.matchMedia("(orientation: portrait)");
        const handleChange = (event) => {
            setIsPortrait(event.matches)
        }
        orientation.addEventListener("change", handleChange);
        return () => { orientation.removeEventListener("change", handleChange) }

    }, [])
    return isPortrait;
}

export default IsPortrait;