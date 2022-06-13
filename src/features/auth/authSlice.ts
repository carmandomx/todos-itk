import { ActionCreatorWithPayload, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthState {
    uid: string;
    access_token: string;
}

const initialState: AuthState = {
    uid: '',
    access_token: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{uid: string; access_token: string;}>) => {
            state.access_token = action.payload.access_token;
            state.uid = action.payload.uid;
        }
    }
})

export const { loginSuccess } = authSlice.actions;

export const selectUID = (state: RootState) => state.auth.uid;
export const selectAccessToken = (state: RootState) => state.auth.access_token;

export default authSlice.reducer