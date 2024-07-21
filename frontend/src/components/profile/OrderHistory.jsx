import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]); 
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get("https://bookverse-eph3.onrender.com/api/v1/get-order-history", { headers });
                setOrderHistory(response.data.data);
            } catch (error) {
                console.error("Error fetching order history:", error);
            }
        };
        fetchOrderHistory();
    }, []);

    return (
        <div className='min-h-screen'>
            {orderHistory && orderHistory.length > 0 && (
                <div className='min-h-screen p-0 md:p-4 text-zinc-100'>
                    <h1 className='text-xl md:text-xl font-semibold text-black mb-8'>Order History</h1>
                    <div className='mt-4 bg-yellow-700 w-full rounded py-2 px-4 flex gap-2'>
                        <div className='w-1/12'>
                            <h1 className='text-center'>Sr.</h1>
                        </div>
                        <div className='w-5/12'>
                            <h1 className='text-center'>Books</h1>
                        </div>
                        <div className='w-4/12'>
                            <h1 className='text-center'>Description</h1>
                        </div>
                        <div className='w-1/12'>
                            <h1 className='text-center'>Price</h1>
                        </div>
                        <div className='w-1/12'>
                            <h1 className='text-center'>Status</h1>
                        </div>
                    </div>
                    {orderHistory.map((item, index) => (
                        <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 border border-white' key={index}>
                            <div className='w-1/12'>
                                <h1 className='text-center'>{index + 1}</h1>
                            </div>
                            <div className='w-5/12 text-center'>
                                <Link to={`/view-book-details/${item.book._id}`}>
                                    {item.book.title}
                                </Link>
                            </div>
                            <div className='w-4/12'>
                                <h1 className='text-center'>{item.book.desc.slice(0, 50)}...</h1>
                            </div>
                            <div className='w-1/12 text-center'>
                                <h1 className='text-center'>Rs.{item.book.price}</h1>
                            </div>
                            <div className='w-1/12 text-center'>
                                <h1 className='text-center'>{item.status}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {orderHistory && orderHistory.length === 0 && (
                <p className='text-center text-2xl text-gray-500'>No orders found.</p>
            )}
        </div>
    );
};

export default OrderHistory;
