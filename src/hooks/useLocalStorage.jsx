import {useEffect, useState} from "react";

const useLocalStorage = (key, initialValue) => {

    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (e) {
            console.error(e)
            return initialValue
        }
    })

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
}

export default useLocalStorage;