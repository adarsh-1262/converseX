import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../main';

function Signup() {
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
    })
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className='h-full w-full p-6 bg-gray-900 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-white'>Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2'>
              <span className='text-base text-white label-text'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({
                ...user,
                fullName: e.target.value
              })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Enter your full name' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base text-white label-text'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({
                ...user,
                username: e.target.value
              })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Enter your username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base text-white label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({
                ...user,
                password: e.target.value
              })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Enter your password' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base text-white label-text'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({
                ...user,
                confirmPassword: e.target.value
              })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Re-type your password' />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center mt-4'>
              <p className='text-white'>Male:</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}

                className="checkbox mx-2 checkbox-warning" />
            </div>
            <div className='flex items-center mt-4'>
              <p className='text-white'>Female:</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}

                className="checkbox mx-2 checkbox-warning" />
            </div>
          </div>

          <div className='flex items-center justify-center mt-6'>
            <p className='text-white px-2'>Already have an account? </p>
            <Link to="/login" className='text-white'>
              login
            </Link>
          </div>

          <div>
            <button type='submit' className='btn btn-block btn-sm mt-3 border-slate-700'>
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;
