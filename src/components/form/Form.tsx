import { useNavigate } from 'react-router-dom'
import { validateLogin } from '../../utils/formValidator.ts'
import { useState } from 'react'
import { loginURL, signupURL } from '../../api/auth.ts'
import { useAuth } from '../../context/AuthContext.tsx'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Input } from '../../utils/types.ts'


interface Props {
  title: string, description: string, inputs: Input[], btn: string, end: string,
  type: string
}

const Form = ({ title, description, inputs, btn, end, type }: Props) => {
  interface FormData {
    [key: string]: string;
  }
  const { setToken } = useAuth()
  
  const [data, setData] = useState<FormData>({});
  const [image, setImage] = useState<File | false>(false)

  const navigate = useNavigate()
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (type === 'login') {
      try {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        const isValid: boolean = await validateLogin(formData);
        if (isValid) {
          const response = await axios.post(loginURL, formData);
          if (response.status >= 200 && response.status < 300) {
            console.log(response.data);
            localStorage.setItem('user-token', response.data.token);
   
            setToken(response.data.token)
            
           

            localStorage.setItem('user-data', JSON.stringify(response.data.user))
            toast.success('Logged in successfully');
            navigate('/')
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response ? error.response.data.msg : error.message)
        }
      }
    }
    else if (type === 'signup') {
      try {
        const formData = new FormData()
        formData.append('first_name', data.firstName)
        formData.append('last_name', data.lastName)
        formData.append('user_name', data.userName)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('password_confirmation', data.confirmPassword)
        if (image) {
          formData.append('profile_image', image);
        }
        const response = await axios.post(signupURL, formData)
        if (response.status >= 200 && response.status < 300) {
          localStorage.setItem('user-token', response.data.data.token);
          localStorage.setItem('user-data', JSON.stringify(response.data.data.user))
          setToken(response.data.token)
          toast.success('account created successfully');
          navigate('/')
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response ? error.response.data : error.message)
        }
      }
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className="flex w-max flex-col h-[78vh] justify-between bg-white text-black px-[32px] py-[24px] rounded-[1.5rem] max-w-[800px]">
      <div className='flex justify-between flex-col items-center'>
        <div className='mb-[30px] flex flex-col items-center'>
          <h1 className='text-[38px]'>{title}</h1>
          <p>{description}</p>
        </div>
        <div className={` w-[100%] flex ${type == 'login' ? ' flex-col' : 'flex-row flex-wrap'}`}>
          {
            inputs.map((item, index) => {
              return (
                <div key={index} className={`${type == 'signup' && (item.type == 'email' || item.type == 'file') ? 'block w-[100%]' : type == 'signup' ? 'flex flex-col w-[25%] mx-2' : 'w-[100]'} my-[15px] w-[100%]`}>
                  <div className={`flex flex-col gap-[5px]`}>
                    <label htmlFor={`${index}`} className='text-[12px]'>
                      {item.label}
                    </label>
                    {
                      item.type === 'file' ? <img src={image ? URL.createObjectURL(image) : '/assets/profile-avatar.png'} alt="" className='w-[50px] ' /> : null
                    }
                    <input type={item.type} name={item.name} value={data[item.name!] || ''} onChange={item.type === 'file' ? (e: React.ChangeEvent<HTMLInputElement>) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        setImage(files[0]); // Set the first file
                      }
                    } : handleOnChange} id={`${index}`} placeholder={item.placeholder} className={`${item.type == 'file' ? 'hidden' : ''} px-[18px] h-[38px] w-[100%] rounded-[10px] border-none text-[12px] bg-[#dae7fc] text-gray-400`} />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <button className='bg-blue-500 text-white w-[250px] h-[37px] text-[18px] font-[600] rounded-[5px] mx-auto'>{btn}</button>
        <p className='text-gray-400 text-[12px] mt-[8px]'>{type == 'signup' ? 'Already have an account ? ' : "You don't have an account? "}<span className="cursor-pointer text-blue-500 underline " onClick={() => { type == 'login' ? navigate('/auth/signup') : navigate('/auth') }}>{end}</span></p>
      </div>
    </form>
  )
}

export default Form