import React, { lazy, Suspense, useContext } from "react";
import styles from "./index.module.scss";
import useDocumentEventListener from "../hooks/useDocumentEventListener";
import { EMOTICON, ABOUT } from "../constants";
import Modal from "../uiLibrary/Modal";
import Header from "./Header";
import Footer from "./Footer";
import EmoweatherContext from "../context";
import { ContextType } from "../commonTypings";

const Frame = ({ children } : { children: React.ReactNode }) => {
  const { triggerUiElement, activeLoader } = useContext(EmoweatherContext) as ContextType;
  const { uiReference } = triggerUiElement;

  const Loader = lazy(() => import("../uiLibrary/Loader"));

  const correctReference = uiReference && [EMOTICON, ABOUT].includes(uiReference) ? "modal" : uiReference;

  useDocumentEventListener();

  return (
    <div className={styles.frameContainer}>
      <Header />
        <section>{children}</section>
      <Footer />
      {correctReference === "modal" && <Modal />}
      {activeLoader && (
        <Suspense fallback={<div>Loading...</div>}>
          <Loader />
        </Suspense>
      )}
    </div>
  );
};

export default Frame;