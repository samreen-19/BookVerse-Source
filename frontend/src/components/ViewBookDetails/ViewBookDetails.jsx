import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewBookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState({});
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://bookverse-eph3.onrender.com/api/v1/get-book-by-id/${id}`);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };

        fetch();
    }, [id]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id
    };

    const handleFavorite = async () => {
        try {
            const response = await axios.put("https://bookverse-eph3.onrender.com/api/v1/add-book-to-favourite", {}, { headers });
            alert(response.data.message);
        } catch (error) {
            console.error("Error adding to favorite:", error);
        }
    };

    const handleCart = async () => {
        try {
            const response = await axios.put("https://bookverse-eph3.onrender.com/api/v1/add-to-cart", {}, { headers });
            alert(response.data.message);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const deleteBook = async () => {
        try {
            const response = await axios.delete(`https://bookverse-eph3.onrender.com/api/v1/delete-book/`, { headers });
            alert(response.data.message);
            navigate('/all-books'); 
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    // const editBook = () => {
    //     navigate(`/updatebook/${bookid}`); 
    // };

    return (
        <div className='px-12 py-8 bg-yellow-100 flex gap-8'>
            {Data && (
                <>
                    <div className='bg-yellow-300 rounded p-4 h-[88vh] w-3/6 flex items-center justify-center border-2 border-black'>
                        <img src={Data.url} className="h-[70vh] border-2 border-black justify-around mr-8" alt="Book Cover" />
                        {isLoggedIn && (
                            <div className="flex flex-col">
                                {role === "user" ? (
                                    <>
                                        <button className="bg-white rounded-full text-3xl p-2 gap-8" onClick={handleFavorite}>
                                            <FaHeart />
                                        </button>
                                        <button className="bg-white rounded-full text-3xl p-2 mt-4" onClick={handleCart}>
                                            <FaShoppingCart />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to={`/updatebook/${id}`} className="bg-white rounded-full text-3xl p-2 gap-8">
                                            <MdModeEdit />
                                        </Link>
                                        <button className="bg-white rounded-full text-3xl p-2 mt-4" onClick={deleteBook}>
                                            <MdDelete />
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <div className='p-4 w-3/6'>
                        <h1 className="text-4xl text-blue-950 font-semibold">{Data.title}</h1>
                        <p className="text-black-400 mt-1">by {Data.author}</p>
                        <p className="text-black-500 mt-4 text-xl">{Data.desc}</p>
                        <p className="flex mt-4 items-center justify-start text-black-400">
                            <GrLanguage className="mr-2" />
                            {Data.language}
                        </p>
                        <p className="mt-4 text-zinc-900 text-3xl font-semibold">Price: ₹ {Data.price}{" "}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewBookDetails;
