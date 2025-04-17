import React, { useEffect, useState } from "react";
import { toaster } from "evergreen-ui";
import API from "../../services/connection";
import styles from "./styles.module.scss";
import _ from "lodash";
import Health from "./health";
import Password from "./password";
import Size from "./size";
import ILMConfig from "./ilm_config";

function Jobs() {
  const [health, setHealth] = useState({});
  const [health_loading, setHealthLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setHealthLoading(true);
      try {
        const res = await API.get("health");
        if (res.data.status) {
          setHealth(res.data?.data);
        } else {
          toaster.warning("Error loading health status");
        }
      } catch (error) {
        toaster.warning("Something went wrong! please try again later.");
        console.log("error", error);
      }
      setHealthLoading(false);
    };
    load();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.section}
        style={{ flex: 1, borderRight: "1px solid #eae6f5" }}
      >
        <Password />
      </div>
      <div className={styles.section} style={{ flex: 1 }}>
        <ILMConfig />
      </div>
      <div
        className={styles.section}
        style={{ flex: 1, borderLeft: "1px solid #eae6f5" }}
      >
        <div style={{ display: "flex", borderBottom: "1px solid #eae6f5" }}>
          <Size tier="tier1" style={{ borderRight: "1px solid #eae6f5" }} />
          <Size tier="tier2" />
        </div>
        <Health health={health} health_loading={health_loading} />
      </div>
    </div>
  );
}

export default Jobs;
