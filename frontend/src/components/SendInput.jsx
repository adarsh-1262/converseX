import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

function SendInput() {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/message/send/${selectedUser?._id}`, { message }, {
                headers: {
                    'Content-Type': 'application/json' // for sending data in json format
                },
                withCredentials: true
            });
            console.log(res);
            dispatch(setMessages([...messages, res?.data?.newMessage]));
        } catch (error) {
            console.log(error);
        }
        setMessage("");
    }
    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Type a message...'
                    className='w-full border text-sm rounded-lg block p-2 border-zinc-500 bg-white text-black'
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pr-4'>
                    <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput
