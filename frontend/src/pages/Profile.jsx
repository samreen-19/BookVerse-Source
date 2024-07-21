import React, { useEffect, useState } from 'react';
import Sidebar from '../components/profile/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Profile = () => {
    const [Profile, setProfile] = useState();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("https://bookverse-eph3.onrender.com/api/v1/get-user-info", { headers });
            setProfile(response.data);
        }
        fetch();
    }, []);

    return (
        <div className='h-auto bg-yellow-100 flex'>
            {Profile && (
                <>
                    <div className='fixed w-1/6 min-h-screen'>
                        <Sidebar data={Profile} />
                    </div>
                    <div className='w-5/6 ml-[16.666667%] py-8 px-12'>
                        <Outlet />
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
