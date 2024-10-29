import { Product } from "../../utils/types";
import axios from "axios";
import { addItemUrl } from "../../api/items";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
const ProductCard = ({ name, price, image_url, id }: Product) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('user-token');
    const { themeContext } = useThemeContext()
    const handleDelete = async (id: number) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (!userConfirmed) return;
        try {
            const response = await axios.delete(`${addItemUrl}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete item.");
        }
    };
    return (
        <div className={`w-[180px] flex flex-col justify-between items-center h-[230px] px-[20px] ${themeContext == 'dark' ? 'bg-[#273044] text-white' : 'bg-white text-black'}  rounded-lg shadow-md`}>
            <img src={image_url} alt="product preview" className="w-[100px] h-[100px] object-contain" />
            <div className="flex flex-col mt-4 w-full justify-start h-[30%] items-start">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-blue-500 text-[14px] font-semibold">${price}</p>
            </div>
            <div className="flex justify-between w-full mb-2 items-center">
                <button className="border-none bg-blue-500 text-[12px] px-4 rounded-full text-white" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
                <button onClick={() => handleDelete(id)}>
                    <img src="/assets/icons/delete.svg" alt="delete" className={`w-[22px] h-[28px] ${themeContext == 'dark' ? 'filter invert' : ''}`} />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
