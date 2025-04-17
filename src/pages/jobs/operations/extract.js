import React from "react";
import {
  TextInput,
  Select,
  Switch,
  RadioGroup,
} from "evergreen-ui";
import FormRow from "../../../components/form_row";
import Filter from "./filter";
import Timerange from "./timerange";

function Extract(props) {

  return (
    <>
      <Timerange {...{from:props?.from, to:props?.to}} />
      <FormRow title="Filters" isRow title_styles={{ width: 60 }}>
        <Switch
          checked={Boolean(props?.filter)}
          disabled
        />
      </FormRow>
      {props?.filter && <Filter value={props?.filter} />}
      <FormRow title="Type" isRow title_styles={{ width: 60 }}>
        <RadioGroup
          value={props?.type || "JSON"}
          options={[
            { label: "JSON Lines", value: "JSON", isDisabled:true },
            { label: "CSV", value: "CSV", isDisabled:true },
          ]}
          style={{ display: "flex", gap: 20 }}
        />
      </FormRow>
      <FormRow title="Batching" isRow title_styles={{ width: 60 }}>
        <Switch
          checked={Boolean(props?.batching)}
          disabled
        />
      </FormRow>
      {props?.batching && (
        <FormRow
          title="Interval"
          isRow
          title_styles={{ width: 60 }}
          children_styles={{ display: "flex", gap: 10 }}
        >
          <TextInput
            value={props?.batch_count}
            style={{ width: "50%" }}
            placeholder="count"
            isInvalid={
              !props?.batch_count
                ? false
                : isNaN(parseInt(props?.batch_count, 10))
            }
            disabled
          />
          <Select
            value={props?.batch_type}
            disabled
          >
            <option value="m" selected>
              Minute
            </option>
            <option value="h">Hours</option>
            <option value="D">Day</option>
            <option value="M">Month</option>
            <option value="Y">Year</option>
          </Select>
        </FormRow>
      )}
    </>
  );
}

export default Extract;
