export const activeLoaderSelector = ({ loader } : { loader: { [key: string]: any } }) => loader.activeLoader;
export const uiReferenceSelector = ({ documentEventListener }: { [key: string]: any }) => documentEventListener.uiReference;
export const setEventListenerSelector = ({ documentEventListener } : { [key: string]: any }) => documentEventListener.setEventListener;
export const eventTypeSelector = ({ documentEventListener } : { [key: string]: any }) => documentEventListener.eventType;
export const mouseCoordinatesSelector = ({ documentEventListener } : { [key: string]: any }) => documentEventListener.mouseCoordinates;