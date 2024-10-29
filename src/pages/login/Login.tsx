import Form from "../../components/form/Form"
import { Input } from '../../utils/types'

const inputs: Input[] = [
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
  }
]
const Login = () => {
  return (
    <div>
      <Form title="Login to Account" description="Enter email and password to continue" inputs={inputs} btn="Login" end="Create an Account" type='login' />
    </div>
  )
}

export default Login