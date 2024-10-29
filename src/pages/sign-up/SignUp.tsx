import Form from "../../components/form/Form"
import { Input } from "../../utils/types"

const SignUp = () => {
  const inputs :Input[] = [
   {
    label: 'First Name',
    placeholder: 'First Name',
    type: 'text',
    name: 'firstName'
   }, 
   {
    label: 'Last Name',
    placeholder: 'Last Name',
    type: 'text',
    name: 'lastName'
   }, 
   {
    label: 'User Name',
    placeholder: 'User Name',
    type: 'text',
    name: 'userName'
   }, 
   {
    label: 'Email Address',
    placeholder: 'exxample@email.com',
    type: 'email',
    name: 'email'
   }, 
   {
    label: 'Password',
    placeholder: '********',
    type: 'password',
    name: 'password'
   }, 
   {
    label: 'Password Confirmation',
    placeholder: '********',
    type: 'password',
    name : 'confirmPassword'
   },
   {
    label: 'Profile Image',
    type: 'file',
    name: 'profileImage'
   } 
  ]
  return (
    <div className="flex-col flex items-center justify-center">
      <Form title="Create an Account" description="Create an account to continue" inputs={inputs} btn="Sign Up" end="Login" type="signup"  />
    </div>
  )
}

export default SignUp