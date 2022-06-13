import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks'
import { loginSuccess } from './authSlice';

type Props = {}

const Login = (props: Props) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {

        setTimeout(() => {
            dispatch(loginSuccess({
                access_token: 'mi_access_token',
                uid: 'mi_uid'
            }))
            navigate('/')
        }, 5000);

    }, [])
  return (
    <div>Login</div>
  )
}

export default Login