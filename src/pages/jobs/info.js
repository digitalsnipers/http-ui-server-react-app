import React from "react";
import { IconButton, CrossIcon, toaster, Select, Button } from "evergreen-ui";
import _ from "lodash";
import FormRow from "../../components/form_row";
import Config from "./operations";

function Info({source, config, operation, onClose, refresh}) {
  const get_config = () =>{
    try {
      return JSON.parse(config)
    } catch (error) {
      return {}
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontWeight: 600, margin: 0, fontSize: 16 }}>{source}</p>
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
            disabled
          >
            <option value="index" selected>
              Index
            </option>
            <option value="extract">Extract</option>
            <option value="compress">Compress</option>
            <option value="delete">Delete</option>
            <option value="get">Read</option>
          </Select>
        </FormRow>
        <Config {...get_config()} refresh={refresh} operation={operation} />
      </div>
    </>
  );
}

export default Info;
