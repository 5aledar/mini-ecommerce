import { useThemeContext } from "../../context/ThemeContext"
const Navbar = () => {
  const { themeContext, setThemeContext } = useThemeContext()
  return (
    <div className={`${themeContext == 'dark' ? 'bg-slate-700 text-white ' : 'bg-white'}  w-full h-[50px]   flex justify-between items-center px-[20px]`}>
      <div className="relative">
        <img src="/assets/icons/search.svg" alt="" className="w-[20px] absolute top-1 left-2 " />
        <input className={`rounded-full ${themeContext == 'dark'? 'bg-slate-600 text-white': 'bg-slate-100 text-black'}  pl-[35px]  h-[30px] text-black`} type='text' placeholder='Search' />
      </div>
      <div>
        <img src="" alt="" />
        <div>
          <h1></h1>
          <p></p>
        </div>
        <img onClick={() => setThemeContext(themeContext == 'dark' ? 'light' : 'dark')} src={themeContext == 'light' ? '/assets/icons/dark.svg' : '/assets/icons/light.svg'} alt="" className={`w-[22px] ${themeContext == 'dark' ? 'filter invert' : ''} cursor-pointer`} />
      </div>
    </div>
  )
}

export default Navbar