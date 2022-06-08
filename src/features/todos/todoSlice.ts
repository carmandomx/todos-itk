import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';


export interface ITodo {
    task: string;
    id: number;
    is_completed: boolean;
}
 
export interface TodoState {
    value: ITodo[],
    total: number;
}

const initialState: TodoState = {
    value: [
        {
            id: 1,
            task: 'From the Initial State',
            is_completed: false
        }
    ],
    total: 0
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ITodo>) => {
            
            // state.todos.push(action.payload)
            state.value = [...state.value, action.payload]
            state.total = state.value.length
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter((value) => value.id !== action.payload)
            state.total = state.value.length
        },
        updateTodo: (state, action: PayloadAction<ITodo>) => {
            state.value = state.value.map((value) => {
                if (value.id === action.payload.id) {
                    return action.payload
                }

                return value;
            })
            state.total = state.value.length
        }
    }
})

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions




export const selectTodos = (state: RootState) => state.todos.value






export default todoSlice.reducer