import { configureStore } from "@reduxjs/toolkit";
import loader from "./slices/loaderSlice";
import documentEventListener from "./slices/documentEventListenerSlice";

export default configureStore({
    reducer: {
        loader,
        documentEventListener
    },
});