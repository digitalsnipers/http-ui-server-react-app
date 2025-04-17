import React, { useEffect, useState } from "react";
import {
  toaster,
} from "evergreen-ui";
import moment from 'moment'
import API from "../../services/connection";
import styles from "./styles.module.scss";
import Card from './row'
import _ from "lodash";
import Progress from "./progress";
import Filter from "./filter";

function ILM() {
  const [history, setHistory] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await API.get("ilm/history");
        if (res.data.status) {
          setHistory(res.data?.data || []);
        } else {
          toaster.warning("Error loading history");
        }
      } catch (error) {
        toaster.warning("Something went wrong! please try again later.");
        console.log("error", error);
      }
      setLoading(false)
    };
    load();
    const int = setInterval(() => {
      load()
    }, 5000);
    return () => {
      clearInterval(int)
    }
  }, []);

  

  const load = async () => {
    try {
      const res = await API.get("ilm/history");
      if (res.data.status) {
        setHistory(res.data?.data || []);
      } else {
        toaster.warning("Error loading history");
      }
    } catch (error) {
      toaster.warning("Something went wrong! please try again later.");
      console.log("error", error);
    }
  };

  const j = _.groupBy(history,'status')

  return (
    <div className={styles.wrapper}>
      <div className={styles.selector}>
        <Progress />
      </div>
      <div className={styles.selector}>
        <Filter />
      </div>
      <div
        className={styles.contents}
        style={{
          height: "calc(100vh - 108px)",
        }}
      >
        <div
          className={styles.explorer}
          style={{
            height: "calc(100vh - 108px)",
          }}
        >
          <div>
            <Card isHeader loading={loading} />
          </div>
          {history
            ?.filter((d) => d.source.toLowerCase().includes(search.toLowerCase()))
            ?.sort((a,b)=>moment(b.timestamp).diff(moment(a.timestamp)))
            ?.map((m,i) => (
              <Card
                {...m}
                refresh={load}
                index={i}
                selected={m.id === selected}
                onClick={() => setSelected(m.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ILM;
