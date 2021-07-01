import { useCallback, useContext, useEffect, useState } from "react";
import { ContextType } from "../commonTypings";
import { ABOUT, EMOTICON } from "../constants";
import EmoweatherContext from "../context";

const useDocumentEventListener = () => {
    const { setTriggerUiElement, triggerUiElement } = useContext(EmoweatherContext) as ContextType;
    const { uiReference, setEventListener, eventType } = triggerUiElement;

    const correctReference = uiReference && [EMOTICON, ABOUT].includes(uiReference) ? "modal" : uiReference;

    const [eventDetails, setEventDetails] = useState({
        currentSetEventListener: setEventListener,
        currentUiReference: uiReference,
        currentEventType: eventType,
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
            currentEventType?.forEach((type : string) => document.removeEventListener(type, onCloseUiElement));
            return;
        }
        const closeUi = correctReference && closeUiElement(event)[correctReference]();
        if (closeUi) {
            currentEventType?.forEach((type : string)=> document.removeEventListener(type, onCloseUiElement));
            setTriggerUiElement({ setEventListener: false, uiReference: null, eventType: null });
        } 
    }, [eventDetails, closeUiElement, correctReference, setTriggerUiElement]);

    useEffect(() => {
        const { currentSetEventListener, currentUiReference, currentEventType } = eventDetails;
        if (currentSetEventListener !== setEventListener || currentUiReference !== uiReference || currentEventType !== eventType) {
            setEventDetails({
                currentSetEventListener: setEventListener,
                currentUiReference: uiReference,
                currentEventType: eventType,
            });
        }
    }, [eventDetails, eventType, setEventListener, uiReference]);

    useEffect(() => {
        const { currentSetEventListener, currentEventType, currentUiReference } = eventDetails;
        if (currentSetEventListener) {
            currentEventType?.forEach((type : string) => document.addEventListener(type, onCloseUiElement));
            setTriggerUiElement({ setEventListener: false, uiReference: currentUiReference, eventType: currentEventType });
        }
    }, [eventDetails, onCloseUiElement, setTriggerUiElement, uiReference]);

}

export default useDocumentEventListener;