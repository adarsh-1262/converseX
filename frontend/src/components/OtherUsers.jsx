import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux';

function OtherUsers() {
  // my custom hooks
  useGetOtherUsers(); // This is a custom hook that fetches data from the backend
  
  const {otherUsers} = useSelector(store => store.user);
  if (!otherUsers) {
    return; //early return in react function component
  }

  return (
    <div className='overflow-auto flex-1'>
      {
        otherUsers?.map((user) => {
          return (
            <OtherUser key={user._id} user={user} />
          )
        })
      }
    </div>
  )
}

export default OtherUsers
