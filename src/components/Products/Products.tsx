import axios from "axios"
import ProductCard from "../ProductCard/ProductCard"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addItemUrl } from "../../api/items"
import { Product } from "../../utils/types"
import { useThemeContext } from "../../context/ThemeContext"
const Products = () => {
  const {themeContext} = useThemeContext()
  const navigate = useNavigate()
  const [deleted, setDeleted] = useState<boolean>(false)
  const token = localStorage.getItem('user-token')
  const [products, setProducts] = useState<Product[]>([])
  const getProducts = async () => {
    try {
      const response = await axios.get(addItemUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      setProducts(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts()
  }, [deleted])
  return (
    <div className="h-[100vh]">
      <div className="w-full flex items-center justify-between py-2 px-5 font-semibold">
        <h1 className={`${themeContext == 'dark' ? 'text-white': 'text-black'} text-[22px]`}>All Products</h1>
        <button className="bg-blue-500 flex text-white  items-center gap-1 px-4 py-2 rounded-lg" onClick={() => navigate('/create')}><img src="/assets/icons/add.svg" className="w-[20px] filter invert" alt="" />create product</button>
      </div>
      <div className="ml-5 pt-2 flex flex-wrap justify-start items-center gap-5">
        {
          products.length > 0 ?
            products?.map((product) => {
              return (
                <ProductCard key={product.id} name={product.name} price={product.price} image_url={product.image_url} id={product.id} setDeleted={setDeleted} />
              )
            })
            :
            <h1 className={`m-auto pt-[25%] text-[32px] font-bold ${themeContext == 'dark' ? 'text-white' : 'text-black'}`}>There is no Products</h1>
        }
      </div>
    </div>
  )
}

export default Products