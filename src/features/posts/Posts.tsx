import React, { useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUID } from '../auth/authSlice'
import { deletePostById, fetchAllPosts, selectPosts, selectStatus } from './postSlice'

type Props = {}

const Posts = (props: Props) => {
    const selectUid = useAppSelector(selectUID);
    const dispatch = useAppDispatch();
    const reqStatus = useAppSelector(selectStatus);
    useEffect(() => {
        if (reqStatus === 'idle') {
          dispatch(fetchAllPosts());
        }
    }, [reqStatus, dispatch])
    const posts = useAppSelector(selectPosts);
    

    const list = posts.map((value) => <li key={value.id}> <Link to={`/${value.id}`}> Post ID: {value.id}</Link>  - Title: {value.title} - <button onClick={() => {
      dispatch(deletePostById(value.id))
    }}>X</button>  </li>)
  return (
    <div>Posts
      <p>
        User ID is: { selectUid }
      </p>
      <Link to="new"> New Post </Link>
      
       <ul>{list}</ul> </div>
  )
}

export default Posts