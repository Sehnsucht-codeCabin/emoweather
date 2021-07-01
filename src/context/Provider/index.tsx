import React, { useState } from "react";
import EmoweatherContext from "..";

const EmoweatherProvider = ({ children } : { children: React.ReactNode }) => {
  const [triggerUiElement, setTriggerUiElement] = useState({
    setEventListener: false,
    uiReference: undefined,
    eventType: undefined
  });
  const [activeLoader, activateLoader] = useState(false);

  return (
    <EmoweatherContext.Provider value={{
        triggerUiElement,
        setTriggerUiElement,
        activeLoader,
        activateLoader
    }}>
      {children}
    </EmoweatherContext.Provider>
  )
}

export { EmoweatherProvider };