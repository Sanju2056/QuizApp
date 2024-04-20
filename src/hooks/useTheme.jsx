import {useState,useEffect} from "react";
import { dark_theme, light_theme } from "../../Constants/colors";

const useTheme = ()=>{
    const [currentTheme, setCurrentTheme] = useState('light')
    const [theme, setTheme] = useState(currentTheme === 'light' ? light_theme:dark_theme)

    useEffect(() => {
        // window.alert(currentTheme)
        if(currentTheme === 'light'){
            setTheme(light_theme)
        }else {
            setTheme(dark_theme)
        }
      
    }, [currentTheme])
 
    return {
        theme,
        setCurrentTheme
    }
}

export default useTheme;