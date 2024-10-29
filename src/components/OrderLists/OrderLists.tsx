import { useThemeContext } from "../../context/ThemeContext"
const OrderLists = () => {
  const { themeContext } = useThemeContext()
  return (
    <div className={`${themeContext == 'dark' ? 'text-white' : 'text-black'} p-5`}>
      <h1 className="text-[22px] font-semibold">Order Lists</h1>
    </div>
  )
}

export default OrderLists