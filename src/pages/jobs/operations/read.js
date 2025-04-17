import React from "react";
import { TextInput } from "evergreen-ui";
import FormRow from "../../../components/form_row";

function Read({ value, onChange }) {
  return (
    <>
      <FormRow
        title="Lines"
        isRow
        title_styles={{ width: 60 }}
        children_styles={{ display: "flex", gap: 10 }}
      >
        <TextInput
          value={value?.count}
          style={{ width: "50%" }}
          placeholder="count"
          isInvalid={!value?.count?false:isNaN(parseInt(value?.count,10))}
          onChange={(event) => onChange("count", event.target.value)}
        />
      </FormRow>
    </>
  );
}

export default Read;
