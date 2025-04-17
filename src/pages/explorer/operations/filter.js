import React from "react";
import { RadioGroup, TextInput } from "evergreen-ui";
import FormRow from "../../../components/form_row";

function Filter({ value = {}, onChange }) {
  return (
    <div>
      <FormRow title="Operator" isRow title_styles={{ width: 60 }}>
        <RadioGroup
          value={value?.operator || "OR"}
          options={[
            { label: "AND", value: "AND" },
            { label: "OR", value: "OR" },
            { label: "NOT", value: "NOT" },
          ]}
          onChange={(event) => onChange("filter.operator", event.target.value)}
          style={{ display: "flex", gap: 20 }}
        />
      </FormRow>
      <FormRow title="Conditions" isRow title_styles={{ width: 60 }}>
        <TextInput
          value={value?.conditions}
          placeholder="Comma seperated list of keywords"
          onChange={(event) =>
            onChange("filter.conditions", event.target.value)
          }
        />
      </FormRow>
    </div>
  );
}

export default Filter;
