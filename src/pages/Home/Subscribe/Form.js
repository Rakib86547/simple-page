import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SmallSpinner from '../../Spinner/Spinner';

const Form = ({ data }) => {
    const {sectors} = data;
    const [isClick, setIsClick] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleSubmitForm = (data) => {
        setUpdate(false)
        setLoading(true)
        const name = data.name;
        const email = data.email;
        const phone = data.phone;
        const select = data.select;
        const user = {
            name,
            email,
            phone,
            select
        }
        fetch(`https://simple-page-server.vercel.app/users/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged) {
                toast.success('submission successfully');
                setUpdate(true);
                setLoading(false)
            }
        } )
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
    }
    

    return (
        <>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="mb-1 sm:mb-2">
                <label
                    htmlFor="firstName"
                    className="inline-block mb-1 font-medium"
                >
                    Name
                </label>
                <input
                    placeholder="John"
                    {...register("name", { required: true })}
                    type="text"
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="firstName"
                    name="name"
                />
                 {errors.name && <span className='text-red-500'>This field is required</span>}
            </div>
            <div className="mb-1 sm:mb-2">
                <label
                    htmlFor="lastName"
                    className="inline-block mb-1 font-medium"
                >
                    Phone
                </label>
                <input
                    placeholder="01xxxxxxx"
                    {...register("phone", { required: true })}
                    type="text"
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="lastName"
                    name="phone"
                />
                 {errors.phone && <span className='text-red-500'>This field is required</span>}
            </div>

            <div className="mb-1 sm:mb-2">
                <label
                    htmlFor="email"
                    className="inline-block mb-1 font-medium"
                >
                    E-mail
                </label>
                <input
                   
                    placeholder="john.doe@example.org"
                    {...register("email", { required: true })}
                    type="email"
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                />
                {errors.email && <span className='text-red-500'>This field is required</span>}
            </div>

            <div>
                <label htmlFor=""
                    className="inline-block mb-1 font-medium"
                >Your District</label>
                <select 
                {...register("select", { required: true })}
                className="select w-full border border-gray-300">
                <option key={data._id} disabled selected>Select</option>
                    {
                        sectors.map((sector, i) => <>
                        
                        <option key={i}>{sector}</option>
                        </>)
                    }
                </select>
                {errors.select && <span className='text-red-500'>This field is required</span>}
            </div>

            <div className="form-control mt-3">
                <label className="flex py-2">
                    <input type="checkbox" onClick={() => setIsClick(!isClick)} className="checkbox checkbox-primary cursor-pointer" />
                    <span className="label-text ml-2 font-semibold">Agree terms</span>
                </label>
            </div>

            <div className="mt-4 mb-2 sm:mb-4">
                <button
                    disabled={!isClick}
                    className='btn btn-primary w-full'
                >
                    {loading ? <SmallSpinner /> : 'Submit'}
                </button>
            </div>

           
        </form>
        <div className='text-center'>
              {
                update &&   <button 

                className='btn btn-secondary btn-xs text-white'>Update</button>
              }
            </div>
        </>
    );
};

export default Form;