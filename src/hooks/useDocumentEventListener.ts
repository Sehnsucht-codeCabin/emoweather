import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeUiElement } from "src/features/documentEventListener";
import { triggerUiElement } from "src/features/documentEventListener/documentEventListenerSlice";
import { ABOUT, EMOTICON } from "../constants";

const useDocumentEventListener = () => {

    const storedData = useSelector(({ loader, documentEventListener }) => ({
        activeLoader: loader.activeLoader,
        setEventListener: documentEventListener.setEventListener,
        activePopUp: documentEventListener.triggeredPopUp,
        uiReference: documentEventListener.uiReference,
        eventType: documentEventListener.eventType,
        mouseCoordinates: documentEventListener.mouseCoordinates,
    }));

    const dispatch = useDispatch();

    const { setEventListener, uiReference, eventType, mouseCoordinates } = storedData;
    const correctReference = [EMOTICON, ABOUT].includes(uiReference) ? "modal" : uiReference;

    const [eventDetails, setEventDetails] = useState({
        currentSetEventListener: setEventListener,
        currentUiReference: uiReference,
        currentEventType: eventType,
        currentMouseCoordinates: mouseCoordinates
    });

    const onCloseUiElement = useCallback((event) => {
        const { currentEventType } = eventDetails;
        const { key, target } = event;
        if (target.dataset.info === "initiator" && key !== "Escape") {
            currentEventType.forEach(type => document.removeEventListener(type, onCloseUiElement));
            return;
        }
        const closeUi = closeUiElement(event)[correctReference]();
        if (closeUi) {
            currentEventType.forEach(type => document.removeEventListener(type, onCloseUiElement));
            dispatch(triggerUiElement({ setEventListener: false, uiReference: null, eventType: null, mouseCoordinates: null }));
        } 
    }, [correctReference, dispatch, eventDetails]);

    useEffect(() => {
        const { currentSetEventListener, currentUiReference, currentEventType, currentMouseCoordinates } = eventDetails;
        if (currentSetEventListener !== setEventListener || currentUiReference !== uiReference || currentEventType !== eventType || currentMouseCoordinates !== mouseCoordinates) {
            setEventDetails({
                currentSetEventListener: setEventListener,
                currentUiReference: uiReference,
                currentEventType: eventType,
                currentMouseCoordinates: mouseCoordinates
            });
        }
    }, [dispatch, eventDetails, eventType, mouseCoordinates, setEventListener, uiReference]);

    useEffect(() => {
        const { currentSetEventListener, currentEventType, currentMouseCoordinates, currentUiReference } = eventDetails;
        if (currentSetEventListener) {
            currentEventType.forEach(type => document.addEventListener(type, onCloseUiElement));
            dispatch(triggerUiElement({ setEventListener: false, uiReference: currentUiReference, eventType: currentEventType, mouseCoordinates: currentMouseCoordinates }));
        }
    }, [dispatch, eventDetails, onCloseUiElement, uiReference]);

}

export default useDocumentEventListener;