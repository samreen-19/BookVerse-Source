import React from 'react';
import AllBooks from '../../pages/AllBooks';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className='relative h-[75vh] flex items-center justify-center'>
            <div className='max-w-4xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 text-center'>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6'>
                    Welcome to BookVerse.
                </h1>
                <p className='text-lg sm:text-xl text-gray-700 mb-8'>
                    Discover a world of stories and knowledge with us.
                </p>
                <div className='flex justify-center'>
                    <Link to="/all-books" className='inline-block bg-black text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-500 hover:text-black transition duration-300'>
                        Discover books
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;
