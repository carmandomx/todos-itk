import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { client } from '../../app/client';
import { RootState } from '../../app/store';

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface PostState {
    posts: IPost[];
    status: 'idle' | 'loading' | 'completed' |  'failed';
    postDetails: IPost | null;
}

const initialState: PostState = {
    posts: [],
    status: 'idle',
    postDetails: null
}

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    console.log(state.auth.access_token)
// https://jsonplaceholder.typicode.com/posts
    const req = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return req.data;

})

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId: number) => {
    const req = await axios({
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`
    })

    return req.data;
})
export const deletePostById = createAsyncThunk('posts/deletePostById', async (postId: number) => {
    const req = await axios({
        method: 'DELETE',
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`
    })

    return postId;
})

export const createPost = createAsyncThunk('posts/create',async (body: Partial<IPost>) => {
    const req = await axios({
        method: 'POST',
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: body
    })

    return req.data
})

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.status = 'loading'
        })

        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.status = 'completed';
            state.posts = action.payload.slice(0,5)
        })

        builder.addCase(fetchAllPosts.rejected, (state) => {
            state.status = 'failed';
        })

        builder.addCase(fetchPostById.pending, state => {
            state.status = 'loading';
        })

        builder.addCase(fetchPostById.fulfilled, (state, action) => {
            state.status = 'completed';
            state.postDetails = action.payload
        })

        builder.addCase(fetchPostById.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(deletePostById.pending, (state) => {
            state.status = 'loading';
        })

        builder.addCase(deletePostById.fulfilled, (state, action) => {
            console.log(action)
            state.posts = state.posts.filter((value) => value.id != action.payload)
        })

        builder.addCase(deletePostById.rejected, (state) => {
            state.status = 'failed';
        })

        builder.addCase(createPost.pending, (state) => {
            state.status = 'loading';
        })

        builder.addCase(createPost.fulfilled, (state, action) => {
            state.status = 'completed'
            state.posts.push(action.payload);
        })

        builder.addCase(createPost.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectStatus = (state: RootState) => state.posts.status;
export const selectPostDetails = (state: RootState) => state.posts.postDetails;
export default postSlice.reducer;