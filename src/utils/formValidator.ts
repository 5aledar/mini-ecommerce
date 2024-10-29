import * as Yup from 'yup'


export const validateLogin = async (formData: FormData) => {

    const loginData = Object.fromEntries(formData.entries());

    let loginSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required().min(8, 'Password must be at least 8 characters')
    })

    let isValid: boolean = await loginSchema.isValid(loginData)
    if (isValid) {
        return true
    } else {
        return false
    }
}
export const validateSignUp = async (formData: FormData) => {
    const signupData = Object.fromEntries(formData.entries());
    let signUpSchema = Yup.object({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        userName: Yup.string()
            .test('no-spaces', 'Username cannot contain spaces', (value) => {
                return !value!.includes(' ');
            })
            .test('no-start-with-number', 'Username cannot start with a number', (value) => {
                return !/^\d/.test(value!);
            }),
        password: Yup.string().required().min(8, 'Password must be at least 8 characters')
    })

    let isValid: boolean = await signUpSchema.isValid(signupData)
    if (isValid) {
        return true
    } else {
        return false
    }
}

export const validateProduct = async (formData: FormData) => {
    const productData = Object.fromEntries(formData.entries());
    let productSchema = Yup.object({
        name: Yup.string().required(),
        price: Yup.string()
            .matches(/^\d+$/, 'Only numbers are allowed') // Ensures the field contains only digits
            .required('This field is required'),
    })

    let isValid: boolean = await productSchema.isValid(productData)
    if(isValid){
        return true
    }else{
        return false
    }
}