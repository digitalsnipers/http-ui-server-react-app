import React, { useEffect, useState } from "react";
import {
  FolderCloseIcon,
  IconButton,
  GridViewIcon,
  ListIcon,
  UploadIcon,
  CrossIcon,
  toaster,
  TextInput,
  DocumentIcon,
  CompressedIcon,
  TrashIcon,
  AlignLeftIcon
} from "evergreen-ui";
import moment from 'moment'
import API from "../../services/connection";
import styles from "./styles.module.scss";
import Info from './info'
import Card from './row'
import _ from "lodash";

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await API.get("jobs");
        if (res.data.status) {
          setJobs(res.data?.data || []);
        } else {
          toaster.warning("Error loading jobs");
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
      const res = await API.get("jobs");
      if (res.data.status) {
        setJobs(res.data?.data || []);
      } else {
        toaster.warning("Error loading jobs");
      }
    } catch (error) {
      toaster.warning("Something went wrong! please try again later.");
      console.log("error", error);
    }
  };

  const j = _.groupBy(jobs,'status')

  return (
    <div className={styles.wrapper}>
      <div className={styles.selector}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <TextInput
            placeholder="search"
            style={{ width: 200 }}
            value={search}
            onChange={(v) => setSearch(v.target.value)}
          />
        </div>
        <div style={{ flex: 1, display:'flex', gap:20,alignItems:'center',justifyContent:'flex-end' }}>
          <p style={{margin:0, color:"#0f9d58", fontWeight:600}}>{j?.complete?.length || 0} Completed</p>
          <p style={{margin:0, color:"#2952CC", fontWeight:600}}>{j?.in_progress?.length || 0} In Progress</p>
          <p style={{margin:0, color:"#e6b400", fontWeight:600}}>{j?.queue?.length || 0} Not Started</p>
          <p style={{margin:0, color:"#ff2c2c", fontWeight:600}}>{j?.error?.length || 0} Error</p>
        </div>
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
          {jobs
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
        <div className={styles.details} active={selected ? "yes" : "no"}>
          <Info index={selected} onClose={() => setSelected(null)} refresh={load} {...jobs?.find(j => j.id === selected)} />
        </div>
      </div>
    </div>
  );
}

export default Jobs;
