/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from 'react-hook-form';

interface FormInput {
  type: string;
  name: string;
  label: string;
  register: UseFormRegister<any>;
  errors?: FieldError | undefined;
}

const FormInput = ({ type, name, label, register, errors }: FormInput) => (
  <div className="flex flex-col">
    <label htmlFor={name}>{label}</label>
    <input type={type} {...register(name)} className={`border rounded-md ${errors?.message ? 'border-red-600' : 'border-teal-600'}`} />
    <span className="min-h-6 text-red-800">{errors?.message}</span>
  </div>
);

export default FormInput;
