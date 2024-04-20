import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useSelector } from 'react-redux'

function MessageContainer() {
    const { selectedUser, authUser, onlineUser } = useSelector(store => store.user);

    const isOnline = onlineUser?.includes(selectedUser?._id);

    return (
        <>
            {selectedUser ? (
                <div className='md:min-w-[600px] flex flex-col border border-white'>
                    <div className='flex gap-2 items-center bg-zinc-700 px-4 py-2 mb-2'>
                        <div className={`avatar ${isOnline ? 'online' : ''}`}>
                            <div className='w-12 rounded-full'>
                                <img src={selectedUser?.profilePhoto} alt="user-profile" />
                            </div>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <div className='flex gap-2 '>
                                <p className='text-white'>{selectedUser?.fullName}</p>
                            </div>
                        </div>
                    </div>
                    <Messages />
                    <SendInput />
                </div>
            ) : (
                <div className='md:min-w-[600px] flex flex-col items-center justify-center border border-white'>
                    <h1 className='text-4xl font-bold text-white'>Hi, {authUser?.fullName}</h1>
                    <h1 className='text-3xl text-white'>Let's start conversation!!!</h1>
                </div>
            )
            }
        </>
    )
}

export default MessageContainer
