import './style.scss'
import {Field} from "formik";

type InputProps = {
    placeholder: string,
    type: string,
    name: string,
    isFormikRequired:boolean,
}

export function InputField({placeholder, type, name,isFormikRequired}:InputProps) {

    return (
        !isFormikRequired ?
            <input className='login-input-field' placeholder={placeholder} type={type} name={name}/>
            :
            <Field className='login-input-field' placeholder={placeholder} type={type} name={name}/>

    )
}