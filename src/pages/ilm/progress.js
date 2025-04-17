import React, { useState, useEffect } from "react";
import { toaster } from "evergreen-ui";
import ProgressBar from "@ramonak/react-progress-bar";
import API from "../../services/connection";


function Progress() {
  const [p, setP] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("ilm/progress");
        if (res.data.status) {
          setP(res.data?.data);
        } else {
          toaster.warning("Error loading ilm progress");
        }
      } catch (error) {
        toaster.warning("Something went wrong! please try again later.");
        console.log("error", error);
      }
    };
    load();
    const int = setInterval(() => {
      load();
    }, 2000);
    return () => {
      clearInterval(int);
    };
  }, []);

  const get_p = () => {
    if (p?.compression?.active) return ["Compressing", p.compression];
    if (p?.deletion?.active) return ["Deleting", p.deletion];
    return null;
  };

  const _p = get_p();
  if (_p) {
    return (
      <div style={{ width: "100vw", padding: 5 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop:5,
            justifyContent: "space-between",
          }}
        >
          <p
            style={{ fontSize: 10, marginBottom: 5, opacity: 0.8 }}
          >{`${_p[0]} : ${_p[1]?.current_item} (${_p[1]?.child_progress}%)`}</p>
          <div style={{ flex: 1, padding: "0px 10px" }}>
            <ProgressBar
              completed={_p[1]?.progress}
              height="2px"
              bgColor="#2952CC"
              isLabelVisible={false}
            />
          </div>
          <p style={{ fontSize: 10, marginBottom: 5, opacity: 0.8 }}>
            {_p[1]?.progress}%
          </p>
        </div>
      </div>
    );
  }
  return <p style={{ opacity: 0.8, padding: 5 }}>Execution History</p>;
}

export default Progress;
