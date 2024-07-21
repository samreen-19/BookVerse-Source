import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [Values,setValues]=useState({
        username:"",email:"",password:"",address:""
    });
    const change=(e)=>{
        const{name,value}=e.target;
        setValues({...Values,[name]:value});
    };

    const navigate=useNavigate();

    const submit=async()=>{
        try{
            if ((Values.username)==="" || Values.email==="" || Values.password==="" || Values.address===""){
                alert("All fields are required");
            }
            else{
                const response=await axios.post("https://bookverse-eph3.onrender.com/api/v1/sign-up",Values);
                console.log(response.data);
                navigate('/login');
            }
        }
        catch(error){
            alert(error.response.data.message);
        }
    }
    return (
        <div className='h-auto bg-yellow-100 px-12 py-8 flex items-center justify-center'>
            <div className='bg-black rounded-lg px-8 py-5 w-full lg:w-2/6 shadow-lg'>
                <p className='text-white text-2xl font-bold'>Register</p>
                <div className='mt-4'>
                    <div>
                        <label htmlFor="username" className='text-white'>Username</label>
                        <input
                            type="text"
                            className='w-full mt-2 bg-yellow-100 text-yellow-900 p-2 outline-none border border-yellow-300 rounded'
                            placeholder='username'
                            name='username'
                            required
                            value={Values.username}
                            onChange={change}>
                        </input>
                    </div>
                </div >
                <div className='mt-4'>
                    <div>
                        <label htmlFor='email' className='text-white'>Email</label>
                        <input
                            type="text"
                            className='w-full mt-2 bg-yellow-100 text-yellow-900 p-2 outline-none border border-yellow-300 rounded'
                            placeholder='xyz@gmail.com'
                            name='email'
                            required
                                 value={Values.email}
                                 onChange={change}>
                        </input>
                    </div>
                </div>
                <div className='mt-4'>
                    <div>
                        <label htmlFor="password" className='text-white'>Password</label>
                        <input
                            type="password"
                            className='w-full mt-2 bg-yellow-100 text-yellow-900 p-2 outline-none border border-yellow-300 rounded'
                            placeholder='password'
                            name='password'
                            required
                            value={Values.password}
                                 onChange={change}>
                        </input>
                    </div>
                </div >
                <div className='mt-4'>
                    <div>
                        <label htmlFor="address" className='text-white'>Address</label>
                        <input
                            type="text"
                            className='w-full mt-2 bg-yellow-100 text-yellow-900 p-2 outline-none border border-yellow-300 rounded'
                            placeholder='address'
                            name='address'
                            required
                            value={Values.address}
                                 onChange={change}>
                        </input>
                    </div>
                </div >
                <div className='mt-4'>
                    <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded" onClick={submit}>Register</button>
                </div>
                <p className='flex mt-4 items-center justify-center text-white font-semibold'>Or</p>
                <p className='flex mt-4 items-center justify-center text-white font-semibold'>
                    Already have an account? &nbsp;
                    <Link to="/login" className='underline text-blue'>LogIn</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp;
