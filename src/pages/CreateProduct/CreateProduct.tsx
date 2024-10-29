import { useState } from "react"
import axios from "axios"
import { validateProduct } from "../../utils/formValidator"
import { addItemUrl } from "../../api/items"
import toast from "react-hot-toast"
import { useThemeContext } from "../../context/ThemeContext"
const CreateProduct = () => {
    const [image, setImage] = useState<File | false>(false)
    const [data, setData] = useState<FormData>({
        name: '',
        price: '',
    })
    const { themeContext } = useThemeContext()
    interface FormData {
        [key: string]: string;
    }
    const token = localStorage.getItem('user-token')
    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData();
        try {
            formData.append('name', data.name);
            formData.append('price', data.price);
            if (image) {
                formData.append('image', image)
            }
            const isValid: boolean = await validateProduct(formData)
            console.log(data);
            if (isValid) {
                const response = await axios.post(addItemUrl, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                })
                toast.success(response.data.message)
            }

        } catch (error) {

        }
    }


    return (
        <div>
            <div className='p-4'>
                <h1 className={`font-semibold text-xl ${themeContext == 'dark' ? 'text-white' : 'text-black'} `}>Create Product</h1>
            </div>
            <div>
                <form className='p-5' onSubmit={handleSubmit}>
                    <div className='flex  justify-between'>

                        <div className='flex flex-col gap-7 w-[50%]'>
                            <div className={`flex flex-col gap-1 ${themeContext == 'dark' ? 'text-white' : 'text-black'}`}>
                                <label>Product Name :</label>
                                <input type="text" placeholder='Enter Product Name' className={` bg-transparent border-2  ${themeContext == 'dark' ? 'border-slate-600 text-white' : 'text-black'} rounded-lg pl-3 h-9`} name="name" value={data['name']} onChange={handleOnChange} />
                            </div>
                            <div className={`flex flex-col gap-1 ${themeContext == 'dark' ? 'text-white' : 'text-black'}`}>
                                <label>Product Price :</label>
                                <input type="text" placeholder='Enter Product Price' className={` bg-transparent border-2  ${themeContext == 'dark' ? 'border-slate-600 text-white' : 'text-black'} rounded-lg pl-3 h-9`} name="price" value={data['price']} onChange={handleOnChange} />
                            </div>
                            <button type='submit' className='bg-slate-400 text-white w-40 rounded-lg py-2'>Create</button>
                        </div>
                        <div className='flex flex-col w-[45%]  justify-center rounded-xl items-center border-4 border-dotted  border-blue-500 '>
                            <label htmlFor="upload" className={`flex flex-col justify-center items-center cursor-pointer  ${themeContext == 'dark' ? 'text-white' : 'text-black'}`}><img src={image ? URL.createObjectURL(image) : "/assets/icons/upload.svg"} alt="" className='w-[80px]' />Upload Product Image</label>
                            <input type="file" id='upload' className='hidden' name="image" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const files = e.target.files;
                                if (files && files.length > 0) {
                                    setImage(files[0]);
                                }
                            }} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct