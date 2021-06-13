import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: "loader",
    initialState: {
        activeLoader: false,
    },
    reducers: {
        activateLoader: (state, action) => {
            state.activeLoader = action.payload;
        }
    }

});

export const { activateLoader } = loaderSlice.actions;
export default loaderSlice.reducer;