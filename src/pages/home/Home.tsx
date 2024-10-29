import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import SideBar from "../../components/SideBar/SideBar"
import { Item } from "../../utils/types"
const Home = () => {
  const items : Item[] =[
    {
      name: 'Products',
      path: '/products'
    },
    {
      name: 'Favorite',
      path: '/favorite'
    },
    {
      name: 'Order Lists',
      path: '/orderlists'
    },
    
  ]
  return (
    <div className="">
      <SideBar items ={items} />
      <div className="ml-[200px] ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Home