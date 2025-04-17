import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/layout_components/header";
import Footer from "../../components/layout_components/footer";

import styles from "./styles.module.scss";

import { SET } from "../../redux/settings/actions";

export default function Main({ children }) {
  const isMenuCollapsed = useSelector(
    (state) => state.settings.isMenuCollapsed
  );
  const dispatch = useDispatch();

  function handleMenuCollapse() {
    dispatch({
      type: SET,
      payload: {
        key: "isMenuCollapsed",
        value: !isMenuCollapsed,
      },
    });
  }
  return (
    <div className={styles.layout_content}>
      <div className={styles.layout_header}>
        <Header />
      </div>
      <div className={styles.layout_content_main}>{children}</div>
      <div className={styles.layout_footer}>
        <Footer />
      </div>
    </div>
  );
}
