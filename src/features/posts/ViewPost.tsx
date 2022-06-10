import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchPostById, selectPostDetails } from './postSlice'

type Props = {}

const ViewPost = (props: Props) => {
    const { postId } = useParams()
    const dispatch = useAppDispatch();
    const postDetails = useAppSelector(selectPostDetails);
    useEffect(() => {
        if (postId) {

            dispatch(fetchPostById(Number(postId)))
        }
    }, [dispatch])
  return (
    <div>
        {
            postDetails && (
                <><h3>{ postDetails.title}</h3>
                <p> {postDetails.body} </p></>
            )

        }
    </div>
  )
}

export default ViewPost