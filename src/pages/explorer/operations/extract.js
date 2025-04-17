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

function Extract({ value, onChange }) {
  const handle_filter_change = (e) => {
    const bool = e.target.checked;
    if (!bool) {
      onChange("filter", undefined);
    } else {
      onChange("filter", { operator: "OR", conditions: "" });
    }
  };

  return (
    <>
      <Timerange />
      <FormRow title="Filters" isRow title_styles={{ width: 60 }}>
        <Switch
          checked={Boolean(value?.filter)}
          onChange={handle_filter_change}
        />
      </FormRow>
      {value?.filter && <Filter value={value?.filter} onChange={onChange} />}
      <FormRow title="Type" isRow title_styles={{ width: 60 }}>
        <RadioGroup
          value={value?.type || "JSON"}
          options={[
            { label: "JSON Lines", value: "JSON" },
            { label: "CSV", value: "CSV" },
          ]}
          onChange={(event) => onChange("type", event.target.value)}
          style={{ display: "flex", gap: 20 }}
        />
      </FormRow>
      <FormRow title="Batching" isRow title_styles={{ width: 60 }}>
        <Switch
          checked={Boolean(value?.batching)}
          onChange={(event) => onChange("batching", !value?.batching)}
        />
      </FormRow>
      {value?.batching && (
        <FormRow
          title="Interval"
          isRow
          title_styles={{ width: 60 }}
          children_styles={{ display: "flex", gap: 10 }}
        >
          <TextInput
            value={value?.batch_count}
            style={{ width: "50%" }}
            placeholder="count"
            isInvalid={
              !value?.batch_count
                ? false
                : isNaN(parseInt(value?.batch_count, 10))
            }
            onChange={(event) => onChange("batch_count", event.target.value)}
          />
          <Select
            value={value?.batch_type}
            onChange={(event) => onChange("batch_type", event.target.value)}
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
