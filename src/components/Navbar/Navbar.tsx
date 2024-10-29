import { useThemeContext } from "../../context/ThemeContext"
const Navbar = () => {
  const { themeContext, setThemeContext } = useThemeContext()
  const userData = JSON.parse(localStorage.getItem('user-data')!)
  return (
    <div className={`${themeContext == 'dark' ? 'bg-slate-700 text-white ' : 'bg-white'}  w-full h-[50px]   flex justify-between items-center px-[20px]`}>
      <div className="relative">
        <img src="/assets/icons/search.svg" alt="" className="w-[20px] absolute top-1 left-2 " />
        <input className={`rounded-full ${themeContext == 'dark'? 'bg-slate-600 text-white': 'bg-slate-100 text-black'}  pl-[35px]  h-[30px] text-black`} type='text' placeholder='Search' />
      </div>
      <div className="flex justify-center gap-4 items-center w-[250px]">
        <img src={userData? userData.profile_image_url : ''} className="w-[30px] h-[30px] rounded-full" alt="" />
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-[14px]">{userData? userData.first_name : 'first'} {userData? userData.last_name: 'last'}</h1>
          <p className="text-slate-400 text-[10px]">{userData? userData.user_name : 'username'}</p>
        </div>
        <span>|</span>
        <img onClick={() => setThemeContext(themeContext == 'dark' ? 'light' : 'dark')} src={themeContext == 'light' ? '/assets/icons/dark.svg' : '/assets/icons/light.svg'} alt="" className={`w-[22px] ${themeContext == 'dark' ? 'filter invert' : ''} cursor-pointer`} />
      </div>
    </div>
  )
}

export default Navbar