import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setOnlineUsers } from '../redux/userSlice';

function OtherUser({ user }) {
    const dispatch = useDispatch();
    const { selectedUser, onlineUser } = useSelector(store => store.user);

    const isOnline = onlineUser?.includes(user._id);

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    };
    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-600' : ''} flex gap-2 items-center text-white hover:bg-zinc-500 rounded p-2 cursor-pointer`}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-2 '>
                        <p className='text-white'>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider  my-0 py-0 h-1'></div>
        </>
    )
}

export default OtherUser
