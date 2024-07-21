import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {

      const response = await axios.get("https://bookverse-eph3.onrender.com/api/v1//get-all-books"); 
      setData(response.data.data); 
    };

    fetch();
  }, []);

  return (
    <div className="bg-yellow-100 min-h-screen h-auto px-12 py-8">
      <h4 className='text-3xl text-yellow-100'>All books</h4>
      <div className='my-8 grid grid-cols-4 gap-5'>
        {Data && Data.map((items,i)=>(
            <div key={i}> <BookCard data={items}/>{" "}</div>
        ))}
      </div>
    </div>
  );
}

export default AllBooks;
