import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBookDetails = () => {
    const [bookData, setBookData] = useState({
        url: '',
        title: '',
        author: '',
        language: '',
        price: '',
        desc: '',
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value,
        });
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://bookverse-eph3.onrender.com/api/v1/get-book-by-id/${id}`, { headers });
                setBookData(response.data.data);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetch();
    }, [id]);

    const submit = async () => {
        try {
            const response = await axios.put(`https://bookverse-eph3.onrender.com/api/v1/update-book`, bookData , { headers });
            console.log(response);
            alert("Book updated successfully");
            setBookData(response.data.data);
            navigate(`/all-books`);
        } catch (error) {
            console.error('Error updating book:', error);
            alert(error.response.data.message);
        }
    };

    return (
        <div className='bg-yellow-100 p-6 min-h-screen'>
            <h1 className='text-xl md:text-xl font-semibold text-black mb-8'>Update Book</h1>
            <div className='w-full md:w-3/4 lg:w-1/2 mx-auto'>
                <div className='mb-4'>
                    <label htmlFor='url' className='block text-xl text-black font-semibold mb-2'>
                        Image URL
                    </label>
                    <input
                        type='text'
                        id='url'
                        name='url'
                        value={bookData.url || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='title' className='block text-xl text-black font-semibold mb-2'>
                        Title
                    </label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={bookData.title || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='author' className='block text-xl text-black font-semibold mb-2'>
                        Author
                    </label>
                    <input
                        type='text'
                        id='author'
                        name='author'
                        value={bookData.author || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='language' className='block text-xl text-black font-semibold mb-2'>
                        Language
                    </label>
                    <input
                        type='text'
                        id='language'
                        name='language'
                        value={bookData.language || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='price' className='block text-xl text-black font-semibold mb-2'>
                        Price
                    </label>
                    <input
                        type='number'
                        id='price'
                        name='price'
                        value={bookData.price || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='desc' className='block text-xl text-black font-semibold mb-2'>
                        Description
                    </label>
                    <textarea
                        id='desc'
                        name='desc'
                        value={bookData.desc || ''}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 h-32 resize-none'
                        required
                    ></textarea>
                </div>
                <div className='flex justify-end'>
                    <button
                        className='bg-black text-white font-semibold px-4 py-2 rounded-md'
                        onClick={
                            submit
                        }
                    >
                        Update Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBookDetails;
