import React from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";
import useDocumentEventListener from "../hooks/useDocumentEventListener";
import { EMOTICON, ABOUT } from "../constants";
import { activeLoaderSelector, uiReferenceSelector } from "../store/selectors";
import Loader from "../uiLibrary/Loader";
import Modal from "../uiLibrary/Modal";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode
};

const Frame = ({ children } : Props) => {

  const uiReference = useSelector(uiReferenceSelector);
  const activeLoader = useSelector(activeLoaderSelector);

  const correctReference = [EMOTICON, ABOUT].includes(uiReference) ? "modal" : uiReference;

  useDocumentEventListener();

  return (
    <div className={styles.frameContainer}>
      <Header />
        {/* <section>{children}</section> */}
      <Footer />
      {correctReference === "modal" && <Modal />}
      {activeLoader && <Loader />}
    </div>
  );
};

export default Frame;