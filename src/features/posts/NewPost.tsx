import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createPost, IPost, selectStatus } from './postSlice';
type Props = {}

const NewPost = (props: Props) => {
    const { register, handleSubmit, reset } = useForm<Partial<IPost>>();
    const dispatch = useAppDispatch()
    const onSubmit = (values: Partial<IPost>) => {
        dispatch(createPost(values))
    }

    const reqStatus = useAppSelector(selectStatus);

    useEffect(() => {
        if (reqStatus === 'completed') {
            reset()
        }
    }, [reqStatus])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <label>
            Title
            <input {...register('title')} />
        </label>
        <label>
            Body
            <input {...register('body')} />
        </label>

        <input type={'submit'}/>
    </form>
  )
}

export default NewPost