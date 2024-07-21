import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'
import { useSelector } from 'react-redux'

const Sidebar = ({ data }) => {
    const role = useSelector((state)=>state.auth.role);
    const dispatch=useDispatch();
    const history=useNavigate();
  return (
    <div className='bg-zinc-800 rounded flex flex-col items-center justify-center min-h-screen '>
      <div className='flex items-center flex-col justify-center'>
        <img src={data.avatar} className='h-24 w-24 rounded border-2 border-white rounded-full object-cover'  />
        <p className='mt-4 text-xl text-white font-bold'>{data.username}</p>
        <p className='mt-2 text-sm text-white'>{data.email}</p>
        <div className='w-full mt-6 h-[1px] bg-white'></div>
      </div>
      {role=="user" && (
        <div className='w-full mt-6'>
        <Link to="/profile" className="block text-white font-semibold py-2 text-center">Favorites</Link>
        <Link to="/profile/orderHistory" className="block text-white font-semibold py-2 text-center ">Orders placed</Link>
      </div>
      )}
      {role=="admin" && (
        <div className='w-full mt-6'>
        <Link to="/profile" className="block text-white font-semibold py-2 text-center">Add Books</Link>
      </div>
      )}

      <button className='block text-white font-semibold py-2 text-center'
      onClick={()=>{
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        history("/");
      }}>LogOut</button>
    </div>
  )
}

export default Sidebar;
