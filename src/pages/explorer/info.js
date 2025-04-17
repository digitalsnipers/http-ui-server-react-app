import React, { useContext, useEffect, useState } from "react";
import { IconButton, CrossIcon, toaster, Select, Button } from "evergreen-ui";
import _ from "lodash";

import API from "../../services/connection";
import FormRow from "../../components/form_row";
import Config from "./operations";
import { TimeRangeContext } from "./index";
import { validate } from "./config_validator";
import moment from "moment";

function Info({ index, onClose }) {
  const { from, to, setFrom, setTo } = useContext(TimeRangeContext);

  const [loading, setloading] = useState(false);
  const [operation, setOperation] = useState("index");
  const [config, setConfig] = useState({});

  const add_to_config = (k, v) => {
    const nconfig = _.cloneDeep(config);
    _.set(nconfig, k, v);
    setConfig(nconfig);
  };

  const handle_submit = async () => {
    config.from = from;
    config.to = to;
    if (validate(operation, config)) {
      setloading(true);
      try {
        const res = await API.post("jobs", {
          operation,
          config: { ...config, from, to },
          source: index,
        });
        if (res.data.status) {
          toaster.success("Job submit succesfully");
          setConfig({});
          setFrom(moment().add(-1, "day").format("DD-MM-YYYY hh:mm"));
          setTo(moment().format("DD-MM-YYYY hh:mm"));
        } else {
          toaster.warning("Error submiting job");
        }
      } catch (error) {
        toaster.warning("Something went wrong! please try again later.");
        console.log("error", error);
      }
      setloading(false);
    } else {
      toaster.warning("Invalid Configuration");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontWeight: 600, margin: 0, fontSize: 16 }}>{index}</p>
        <IconButton
          icon={<CrossIcon />}
          appearance="minimal"
          onClick={onClose}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <FormRow title="Operation" isRow title_styles={{ width: 60 }}>
          <Select
            value={operation}
            onChange={(event) => setOperation(event.target.value)}
          >
            <option value="index" selected>
              Index
            </option>
            <option value="extract">Extract</option>
            <option value="get">Read</option>
          </Select>
        </FormRow>
        <Config value={config} onChange={add_to_config} operation={operation} />
        <FormRow isRow title_styles={{ width: 60 }}>
          <Button
            appearance="primary"
            isLoading={loading}
            onClick={handle_submit}
          >
            Submit
          </Button>
        </FormRow>
      </div>
    </>
  );
}

export default Info;
