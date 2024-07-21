import React, { useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard'
import { useEffect } from 'react'

const Favorites = () => {
    const [favouriteBooks, setfavouriteBooks] = useState()
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    
    useEffect(() => {
        const fetch=async ()=>{
            const response=await axios.get("https://bookverse-eph3.onrender.com/api/v1//get-favourite-books",{headers})
        
        setfavouriteBooks(response.data.data);
        };
        fetch();
    },
     [favouriteBooks])
    
  return (
    <div className='text-xl font-semibold'>
        Favorites
    <div className=' grid grid-cols-3 gap-4 h-auto min-h-screen py-3'>
        {favouriteBooks && favouriteBooks.map((items,i)=><div key={i}><BookCard data={items} favourite={true}/></div>
        
            )}
    </div>
    </div>
  )
}

export default Favorites