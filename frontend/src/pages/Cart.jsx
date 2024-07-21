import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import { Navigate, useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate= useNavigate();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("https://bookverse-eph3.onrender.com/api/v1/get-user-cart", { headers });
                console.log(response);
                setCart(response.data.data);
                const totalPrice = response.data.data.reduce((acc, item) => acc + item.price, 0);
                setTotal(totalPrice);
            } catch (error) {
                console.error("Error fetching the cart:", error);
            }
        };
        fetchCart();
    }, []);

    const deleteItem = async (bookid) => {
        try {
            const response = await axios.put(`https://bookverse-eph3.onrender.com/api/v1/remove-from-cart/${bookid}`, {}, { headers });
            console.log(response);
            setCart(cart.filter(item => item._id !== bookid));
            setTotal(total - cart.find(item => item._id === bookid).price);
        } catch (error) {
            console.error("Error removing the item from the cart:", error);
        }
    };

    const placeOrder = async () => {
        try {
            const response = await axios.post(`https://bookverse-eph3.onrender.com/api/v1/place-order`, {order: cart}, { headers });
            navigate("/profile/orderhistory");
            alert("Order placed successfully!");
        } catch (error) {
            console.log("Error placing the order:", error);
        }
    };

    return (
        <div className='bg-yellow-100 p-6 min-h-screen'>
            <h1 className='text-xl font-semibold '>Your cart</h1>
            {cart.length > 0 ? (
                <>
                    {cart.map((item, i) => (
                        <div className='w-full my-4 p-4 rounded-lg flex flex-col bg-zinc-800 justify-between items-center md:flex-row' key={i}>
                            <img src={item.url} className='h-[20vh] object-cover rounded-lg' alt={item.title} />
                            <div className='w-full md:w-auto md:ml-4 flex flex-col'>
                                <h1 className='text-2xl text-zinc-100 font-semibold mt-2 md:mt-0'>{item.title}</h1>
                                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{item.desc.slice(0, 100)}...</p>
                            </div>
                            <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                                <h2 className='text-zinc-100 text-2xl font-semibold flex'>₹ {item.price}</h2>
                                <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ml-4' onClick={() => deleteItem(item._id)}>
                                    <AiFillDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className='w-full mt-8 p-4 rounded-lg flex justify-end bg-zinc-800'>
                        <h2 className='text-3xl text-zinc-100 font-semibold'>Total: ₹ {total}</h2>
                    </div>
                    <div className='w-full mt-4 flex justify-end'>
                        <button className='bg-yellow-500 border border-black text-black px-4 py-2 rounded-md mt-4' onClick={placeOrder}>Place your order</button>
                    </div>
                </>
            ) : (
                <p className='text-2xl text-zinc-500'>Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;
