import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [Values, setValues] = useState({
        username: "", password: ""
    });
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...Values, [name]: value });
    };

    const submit = async () => {
        try {
            if ((Values.username) === "" || Values.password === "" ) {
                alert("All fields are required");
            }
            else {
                const response = await axios.post("https://bookverse-eph3.onrender.com/api/v1/sign-in", Values);
                dispatch(authActions.login());
                dispatch(authActions.changeRole(response.data.role));
                localStorage.setItem("id",response.data.id);
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("role",response.data.role);
                console.log(response.data);
                navigate("/profile");
            }
        }
        catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div className='min-h-screen h-auto bg-yellow-100 px-12 py-8 flex items-center justify-center'>
            <div className='bg-black rounded-lg px-8 py-5 w-full lg:w-2/6 shadow-lg'>
                <p className='text-white text-2xl font-bold'>LogIn</p>
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
                    <button className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded' onClick={submit}>LogIn</button>
                </div>
                <p className='flex mt-4 items-center justify-center text-white font-semibold'>Or</p>
                <p className='flex mt-4 items-center justify-center text-white font-semibold'>
                    Don't have an account? &nbsp;
                    <Link to="/register" className='underline text-blue'>Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login