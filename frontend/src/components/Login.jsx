import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

function Login() {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://converse-x-backend.vercel.app/api/v1/user/login`, user, {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
            });
            navigate('/');
            dispatch(setAuthUser(res.data));
          } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
          }
        setUser({
            username: '',
            password: '',
        })
    }
    return (
        <div className="min-w-96 mx-auto">
            <div className='h-full w-full p-6 bg-gray-900 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center text-white'>Login</h1>
                <form onSubmit={onSubmitHandler} action="">
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
                    <div className='flex items-center justify-center mt-6'>
                        <p className='text-white px-2'>Don't have an account?</p>
                        <Link to="/register" className='text-white'>
                            Signup
                        </Link>
                    </div>

                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-3 border-slate-700'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
