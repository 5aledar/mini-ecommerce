import { Outlet } from "react-router-dom"
import { useThemeContext } from "../../context/ThemeContext"
const Index = () => {
  const {themeContext} = useThemeContext()
  return (
    <div className={`overflow-x-hidden ${themeContext == 'dark' ? 'bg-[#1C2433]' : 'bg-slate-100'}  h-[100vh]`}>
      
      <Outlet />
    </div>
  )
}

export default Index