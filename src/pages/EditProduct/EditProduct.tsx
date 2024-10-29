import { useEffect, useState } from "react";
import axios from "axios";
import { validateProduct } from "../../utils/formValidator";
import { addItemUrl } from "../../api/items";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Product } from "../../utils/types";
import { useThemeContext } from "../../context/ThemeContext";
const EditProduct = () => {
    const {themeContext} = useThemeContext()
    const { id } = useParams<string>();
    const [product, setProduct] = useState<Product | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const token = localStorage.getItem('user-token');

    const getProductData = async (id: string) => {
        try {
            const response = await axios.get(`${addItemUrl}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            setProduct(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch product data.");
        }
    };

    useEffect(() => {
        if (id) {
            getProductData(id);
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!product) return;

        const formData = new FormData();
        try {
            formData.append('name', product.name);
            formData.append('price', product.price);
            if (image) {
                formData.append('image', image);
            }
            formData.append('_method', 'PUT');

            const isValid: boolean = await validateProduct(formData);
            if (isValid) {
                const response = await axios.post(`${addItemUrl}/${id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                toast.success(response.data.message);
            } else {
                toast.error("Validation failed.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update product.");
        }
    };


    return (
        <div>
            <div className='p-4'>
                <h1 className={`font-semibold text-xl ${themeContext == 'dark' ? 'text-white' : 'text-black'} `}>Edit Product</h1>
            </div>
            <div>
                <form className='p-5' onSubmit={handleSubmit}>
                    <div className='flex justify-between'>
                        <div className='flex flex-col gap-7 w-[50%]'>
                            <div  className={`flex flex-col gap-1 ${themeContext == 'dark' ? 'text-white' : 'text-black'}`}>
                                <label>Product Name :</label>
                                <input 
                                    type="text" 
                                    placeholder='Enter Product Name' 
                                    className={` bg-transparent border-2  ${themeContext == 'dark' ? 'border-slate-600 text-white' : 'text-black'} rounded-lg pl-3 h-9`} 
                                    name="name" 
                                    value={product?.name} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                        setProduct((prev) => ({ ...prev!, name: e.target.value }))
                                    } 
                                />
                            </div>
                            <div  className={`flex flex-col gap-1 ${themeContext == 'dark' ? 'text-white' : 'text-black'}`}>
                                <label>Product Price :</label>
                                <input 
                                    type="text" 
                                    placeholder='Enter Product Price' 
                                    className={` bg-transparent border-2  ${themeContext == 'dark' ? 'border-slate-600 text-white' : 'text-black'} rounded-lg pl-3 h-9`}
                                    name="price" 
                                    value={product?.price} 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                        setProduct((prev) => ({ ...prev!, price: e.target.value }))
                                    } 
                                />
                            </div>
                            <button type='submit' className='bg-slate-400 text-white w-40 rounded-lg py-2'>Update</button>
                        </div>
                        <div className='flex flex-col w-[45%] justify-center rounded-xl items-center border-4 border-dotted border-blue-500'>
                            <label htmlFor="upload" className={`flex flex-col justify-center items-center cursor-pointer  ${themeContext == 'dark' ? 'text-white' : 'text-black'}`}>
                                <img src={image ? URL.createObjectURL(image) : product?.image_url} alt="Product Preview" className='w-[80px]' />
                                Upload Product Image
                            </label>
                            <input 
                                type="file" 
                                id='upload' 
                                className='hidden' 
                                name="image" 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const files = e.target.files;
                                    if (files && files.length > 0) {
                                        setImage(files[0]);
                                    }
                                }} 
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
