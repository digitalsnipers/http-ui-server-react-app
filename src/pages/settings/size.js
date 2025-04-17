import React, { useEffect, useState } from "react";import {
  toaster,
  Spinner
} from "evergreen-ui";
import API from "../../services/connection";

function Size({ tier, style }) {
  const [s,setS] = useState(0)
  const [loading,setloading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setloading(true);
      try {
        const res = await API.get(`health/size/${tier}`);
        if (res.data.status) {
          setS(res.data?.data);
        } else {
          toaster.warning("Error loading size status");
        }
      } catch (error) {
        toaster.warning("Something went wrong! please try again later.");
        console.log("error", error);
      }
      setloading(false);
    };
    load();
  }, []);

  const floatNormalize = (value) => {
    return value.toFixed(2)
  }

  const bandwidthAutoCalc = (value, from='b') => {
    const sizes = ['b', 'kb', 'mb', 'gb', 'tb']
    if (Math.floor(value / 1024) === 0 || from === 'tb')
      return floatNormalize(value).toString() + ' ' + from.toUpperCase()
    else return bandwidthAutoCalc(value / 1024, sizes[sizes.indexOf(from) + 1])
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding:20,
        height:150,
        flex:1,
        ...style
      }}
    >
      <h1 style={{ fontWeight: 400, margin: 0 }}>{loading?<Spinner />:bandwidthAutoCalc(s)}</h1>
      <p style={{ opacity: 0.5, margin: 0 }}>{tier==='tier1'?'Tier 1':'Tier 2'}</p>
    </div>
  );
}

export default Size;
