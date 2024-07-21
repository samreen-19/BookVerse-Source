import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ data, favourite }) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: data._id,
    };

    const handleRemoveBook = async (event) => {
        event.preventDefault(); 
        event.stopPropagation(); 
        const response = await axios.put(
            "https://bookverse-eph3.onrender.com/api/v1/remove-book-from-favourite",
            {},
            { headers }
        );
        alert(response.data.message);
    };

    return (
        <div>
            <Link to={`/view-book-details/${data._id}`}>
                <div className='bg-zinc-800 rounded p-4 flex flex-col'>
                    <div className='bg-zinc-900 rounded flex items-center justify-center'>
                        <img src={data.url} className='h-[20vh] object-cover rounded' />
                    </div>
                    <div className='flex items-start justify-between mt-4'>
                        <div className='flex flex-col'>
                            <h2 className='text-xl text-white font-semibold'>{data.title}</h2>
                            <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
                            <p className='mt-2 text-zinc-200 font-semibold text-xl'>₹ {data.price}</p>
                        </div>
                        <div className='flex flex-col'>
                            {favourite && (
                                <button 
                                    className='bg-yellow-500 text-white px-4 py-2 rounded border border-yellow-500 hover:bg-yellow-600 '
                                    onClick={handleRemoveBook}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BookCard;
