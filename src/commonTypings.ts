interface ITriggerUiElement {
  setEventListener: boolean,
  uiReference: undefined | string | null,
  eventType: undefined | string[] | null
}

export type ContextType = {
  setTriggerUiElement: ({ setEventListener, uiReference, eventType } : ITriggerUiElement) => ITriggerUiElement,
  triggerUiElement: ITriggerUiElement,
  activeLoader: boolean,
  activateLoader: (activeLoader : boolean) => boolean
}