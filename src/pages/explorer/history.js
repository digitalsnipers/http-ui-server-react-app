import React, { useContext, useEffect, useState } from "react";
import {
  FolderCloseIcon,
  IconButton,
  GridViewIcon,
  ListIcon,
  CrossIcon,
  toaster,
  TextInput,
  Spinner
} from "evergreen-ui";
import moment from "moment";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Line,
  Tooltip,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

import API from "../../services/connection";
import { TimeRangeContext } from "./index";

function Info({ index }) {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false)

  const { from, to } = useContext(TimeRangeContext);

  useEffect(() => {
    const load = async () => {
      setloading(true)
      setData([])
      try {
        const res = await API.get(`explorer/history/${index}`);
        if (res.data.status) {
          setData(res.data?.data || []);
        } else {
          toaster.warning("Error loading data");
        }
      } catch (error) {
        toaster.warning("Something went wrong! please try again later.");
        console.log("error", error);
      }
      setloading(false)
    };
    if (index) {
      load();
    }
  }, [index]);

  const render_reference = () => {
    const time_reg =
      /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4} (00|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

    if (from && to && time_reg.test(from) && time_reg.test(to)) {
      return (
        <ReferenceArea
          x1={new Date(moment(from,'DD-MM-YYYY hh:mm').toISOString()).getTime()}
          x2={new Date(moment(to,'DD-MM-YYYY hh:mm').toISOString()).getTime()}
          // stroke="#2952CC"
          stroke="red"
          strokeOpacity={1}
          isFront
        />
      );
    }
    return null;
  };

  return (
    <div style={{ height: 30, background: "#ffffff", paddingTop: 10 }}>
      {loading && <Spinner size={16} />}
      <ResponsiveContainer height={20} width={window.innerWidth-10}>
        <BarChart
          width={window.innerWidth-10}
          margin={{top:5,right:10,bottom:5,left:5}}
          data={data.map((d) => ({ d: new Date(d.date).getTime(), ...d }))}
        >
          <Bar dataKey="tier1" stackId="a" fill="#2952CC" opacity={0.9} />
          <Bar dataKey="tier2" stackId="a" fill="#2952CC" opacity={0.4} />
          <Tooltip
            position={{ x: 0, y: -100 }}
            labelFormatter={(label) => moment(label).format("MMMM Do YYYY")}
          />
          <XAxis dataKey="d" hide scale="time" name="Date" />
          {render_reference()}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// "#13ae4b"

export default Info;
