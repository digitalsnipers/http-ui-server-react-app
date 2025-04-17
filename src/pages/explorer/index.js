import React, { useState, useEffect, createContext } from "react";
import {
  FolderCloseIcon,
  IconButton,
  GridViewIcon,
  ListIcon,
  CrossIcon,
  toaster,
  TextInput,
} from "evergreen-ui";
import moment from 'moment'
import styles from "./styles.module.scss";

import API from "../../services/connection";
import Info from "./info";
import History from "./history";

const Card = ({ name, selected, onClick }) => {
  return (
    <div
      className={styles.card}
      active={selected ? "yes" : "no"}
      role="presentation"
      onClick={onClick}
    >
      <FolderCloseIcon size={45} color={selected ? "info" : "#D8DAE5"} />
      <p className={styles.card_title} style={{ opacity: selected ? 1 : 0.75 }}>
        {name}
      </p>
    </div>
  );
};

export const TimeRangeContext = createContext();

function Explorer() {
  const [viewMode, setViewMode] = useState("tiles");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);

  // timerange filter context vals
  const [from, setFrom] = useState(moment().add(-1, "day").format("DD-MM-YYYY hh:mm"));
  const [to, setTo] = useState(moment().format("DD-MM-YYYY hh:mm"));

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("explorer/list");
        if (res.data.status) {
          setData(res.data?.data || []);
        } else {
          toaster.warning("Error loading indices list");
        }
      } catch (error) {
        toaster.warning("Something went wrong! please try again later.");
        console.log("error", error);
      }
    };
    load();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.selector}>
        <div style={{ flex: 1 }}>
          <TextInput
            placeholder="search"
            style={{ width: 200 }}
            value={search}
            onChange={(v) => setSearch(v.target.value)}
          />
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <IconButton
            icon={<GridViewIcon color="info" />}
            appearance="minimal"
          />
          <IconButton icon={<ListIcon />} appearance="minimal" />
        </div>
        <div style={{ flex: 1, textAlign: "right" }} />
      </div>
      <TimeRangeContext.Provider value={{ from, setFrom, to, setTo }}>
        <div
          className={styles.contents}
          style={{
            height: selected ? "calc(100vh - 148px)" : "calc(100vh - 128px)",
          }}
        >
          <div
            className={styles.explorer}
            style={{
              height: 'auto'
            }}
          >
            {data
              ?.filter((d) => d.toLowerCase().includes(search.toLowerCase()))
              ?.map((m) => (
                <Card
                  name={m}
                  selected={m === selected}
                  onClick={() => setSelected(m)}
                />
              ))}
          </div>
          <div className={styles.details} active={selected ? "yes" : "no"}>
            <Info index={selected} onClose={() => setSelected(null)} />
          </div>
        </div>
        {selected && <History index={selected} />}
      </TimeRangeContext.Provider>
    </div>
  );
}

export default Explorer;
