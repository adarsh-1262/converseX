import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

function Sidebar() {
    const [search, setSearch] = useState('');
    const {otherUsers} = useSelector(store => store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/logout`);
            navigate('/login');
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
        } catch (error) {
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found")
        }
    }   

    return (
        <div className='border border-white p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-1'>
                <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-md' type="text"
                    placeholder='search...'
                />
                <button type='submit' className='btn bg-gray-400 text-white'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none' />
                </button>
            </form>

            <div className='divider p-1/2'></div>
            <OtherUsers />
            <div className='mt-2'>
                <button
                    onClick={logoutHandler}
                    className='btn btn-sm'>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar
