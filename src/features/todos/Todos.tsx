import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ITodo, selectTodos, addTodo, deleteTodo, updateTodo } from './todoSlice'
import { useForm } from 'react-hook-form'
type Props = {}



const Todos = (props: Props) => {
    const { register, handleSubmit, reset } = useForm<ITodo>({
        defaultValues: {
            is_completed: false
        }
    })

    const dispatch = useAppDispatch();

    const onSubmit = (values: ITodo) => {
        dispatch(addTodo(values))
        reset()
    }

    const todos = useAppSelector(selectTodos);

    const list = todos.map((value) => <li key={value.id}>
        Task: {value.task} - is It Done? - { value.is_completed ? 'Yes' : "No" } - <button onClick={() => {
            dispatch(deleteTodo(value.id))
        }}>X</button> - <button onClick={() => {
            dispatch(updateTodo({
                ...value,
                is_completed: true
            }))
        }}>Complete</button>

    </li>)
  return (
    <div>Todos
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Id
                <input { ...register('id') } type="number"   />
            </label>
            <label>
                Task
                <input {...register('task')} />
            </label>
            <input type={'submit'} />
        </form>
        <ul>
            { list }
        </ul>
    </div>
  )
}

export default Todos