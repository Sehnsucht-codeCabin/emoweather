import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ABOUT, EMOTICON } from "../constants";
import { setEventListenerSelector, uiReferenceSelector, eventTypeSelector, mouseCoordinatesSelector } from "../store/selectors";
import { triggerUiElement } from "../store/slices/documentEventListenerSlice";

const useDocumentEventListener = () => {
    const uiReference = useSelector(uiReferenceSelector);
    const setEventListener = useSelector(setEventListenerSelector);
    const eventType = useSelector(eventTypeSelector);
    const mouseCoordinates = useSelector(mouseCoordinatesSelector);

    const dispatch = useDispatch();

    const correctReference = [EMOTICON, ABOUT].includes(uiReference) ? "modal" : uiReference;

    const [eventDetails, setEventDetails] = useState({
        currentSetEventListener: setEventListener,
        currentUiReference: uiReference,
        currentEventType: eventType,
        currentMouseCoordinates: mouseCoordinates
    });

    const closeUiElement : Function = useCallback((event: KeyboardEvent) => {
        const { type, key, target }: { type: string; key: string, target: EventTarget | null } = event;
        return {
            modal: () => {
                if ((type === "click" && (target as HTMLElement)?.dataset.info === "close-modal") || (key && key === "Escape")) {
                    document.body.style.overflow = "auto";
                    return true;
                }
            },
            popup: () => {
                if (type === "click" && ((target as HTMLElement)?.dataset.info !== "popUpBody" || (target as HTMLElement)?.dataset.info === "closePopUpBtn")) return true;
            },
        }
    }, []);

    const onCloseUiElement = useCallback((event) => {
        const { currentEventType } = eventDetails;
        const { key, target } = event;
        if (target.dataset.info === "initiator" && key !== "Escape") {
            currentEventType.forEach((type : string) => document.removeEventListener(type, onCloseUiElement));
            return;
        }
        const closeUi = closeUiElement(event)[correctReference]();
        if (closeUi) {
            currentEventType.forEach((type : string)=> document.removeEventListener(type, onCloseUiElement));
            dispatch(triggerUiElement({ setEventListener: false, uiReference: null, eventType: null, mouseCoordinates: null }));
        } 
    }, [correctReference, dispatch, eventDetails, closeUiElement]);

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
            currentEventType.forEach((type : string) => document.addEventListener(type, onCloseUiElement));
            dispatch(triggerUiElement({ setEventListener: false, uiReference: currentUiReference, eventType: currentEventType, mouseCoordinates: currentMouseCoordinates }));
        }
    }, [dispatch, eventDetails, onCloseUiElement, uiReference]);

}

export default useDocumentEventListener;