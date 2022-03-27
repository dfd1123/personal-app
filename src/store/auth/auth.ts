import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserInfo } from './types/auth';

const initialState : AuthState = {
    accessToken: null,
    user: null
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<{ user?: UserInfo}>){
            const {user} = action.payload;

            state.user = user ?? null;
        }
    }
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
