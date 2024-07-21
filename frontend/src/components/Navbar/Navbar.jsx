import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },

        {
            title: "Admin Profile",
            link: "/profile",
        },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state)=>state.auth.role);
    console.log(isLoggedIn);
    if (isLoggedIn == false) {
        links.splice(2, 3);
    }
    if (isLoggedIn==true && role=="admin"){
        links.splice(2, 2);
    }
    if (isLoggedIn==true && role=="user"){
        links.splice(4, 1);
    }
    return (
        <div className='flex bg-zinc-800 text-white px-5 py-4 items-center justify-between'>
            <Link to="/" className='flex items-center'>
                <img src="https://cdn-icons-png.flaticon.com/512/3771/3771417.png" width="40" height="50" style={{ paddingRight: '5px' }} alt="Icon" />
                <h1 className='text-2xl font-semibold'>BookVerse</h1>
            </Link>
            <div className='nav-links-bookverse flex items-center gap-4'>
                {links.map((item, i) => (
                    <Link to={item.link} key={i}>{item.title}</Link>
                ))}
            </div>
            {(isLoggedIn == false)?
            (<div className='flex gap-4'>
                <Link to="/login" className='px-2 py-1 border border-blue-500'>Login</Link>
                <Link to="/register" className='px-2 py-1 bg-blue-500 rounded'>Register</Link>
            </div>):null}
        </div>

    );
}

export default Navbar;
