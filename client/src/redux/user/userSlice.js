import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logInStart: (state) => {
            state.loading = true
        },
        logInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        },
        logInFailure: (state, action) => {
            state.loading = false
            state.error = false
        }
    }
})

export const { logInStart, logInSuccess, logInFailure } = userSlice.actions;
export default userSlice.reducer;