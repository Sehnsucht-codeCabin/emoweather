import { createSlice } from "@reduxjs/toolkit";

const documentEventListener = createSlice({
    name: "modal",
    initialState: {
        setEventListener: false,
        triggeredPopUp: false,
        uiReference: undefined,
        eventType: undefined
    },
    reducers: {
        triggerUiElement: (state, action) => {
            const { setEventListener, uiReference, eventType } = action.payload;
            const newState = { ...state };
            newState.setEventListener = setEventListener;
            newState.uiReference = uiReference;
            newState.eventType = eventType;
            return newState;
        },
        triggerPopUp: (state, action) => {
            state.triggeredPopUp = action.payload
        }
    }

});

export const { triggerUiElement, triggerPopUp } = documentEventListener.actions;
export default documentEventListener.reducer;