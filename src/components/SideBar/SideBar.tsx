import { NavLink } from "react-router-dom"
import { Item } from "../../utils/types"
import { logoutURL } from "../../api/auth"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useThemeContext } from "../../context/ThemeContext"
interface Props {
  items: Item[]
}

const SideBar = ({ items }: Props) => {
  const { themeContext } = useThemeContext()
  const navigate = useNavigate()
  const handleLogout = async () => {
    const token = localStorage.getItem('user-token');
    const userConfirmed = window.confirm("Are you sure you want to log out?");
    if (!userConfirmed) return;
    try {
      const response = await axios.post(
        logoutURL,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );
      if (response.data.msg) {
        localStorage.removeItem('user-token');
        toast.success(response.data.msg);
        navigate('/auth')
      }
    } catch (error) {

      console.log(error);
      navigate('/auth')
    }
  };

  return (
    <div className={`${themeContext == 'dark' ? 'bg-slate-700 text-white' : 'bg-white '}  w-[200px] fixed h-[100vh]`}>

      <img src='/assets/brand.png' alt="" className="ml-[50px]" />
      <div className="flex flex-col justify-between h-[90vh]">

        <div className="flex flex-col items-center justify-start ">
          {
            items.map((item, index) => {
              return (
                <NavLink key={index} to={item.path} className={"w-full"}>
                  <div className={`py-[15px] w-full   felx justify-center items-center ${themeContext == 'dark' ? 'text-white hover:bg-slate-500' : 'text-black hover:bg-slate-100'} `}>
                    <p className="ml-[50px]">{item.name}</p>
                  </div>
                </NavLink>
              )
            })
          }
        </div>
        <button className="font-semibold text-white bg-blue-500 w-[80%] mx-auto rounded-lg py-2 flex items-center justify-center gap-2" onClick={handleLogout}><img src="/assets/icons/logout.svg" alt="" className="w-[26px] filter invert" /> Logout</button>
      </div>
    </div>
  )
}

export default SideBar