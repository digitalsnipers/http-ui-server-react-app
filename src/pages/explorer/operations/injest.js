import React from "react";
import {
  FolderCloseIcon,
  IconButton,
  GridViewIcon,
  ListIcon,
  CrossIcon,
  toaster,
  TextInput,
  TextInputField,
  Select,
  Switch,
  Button,
} from "evergreen-ui";
import FormRow from "../../../components/form_row";
import Filter from "./filter";
import Timerange from "./timerange";

function Injest({ value, onChange }) {
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
      <FormRow title="Index" isRow title_styles={{ width: 60 }}>
        <TextInput
          value={value?.index}
          placeholder="Target Index"
          onChange={(event) => onChange("index", event.target.value)}
        />
      </FormRow>
      <Timerange />
      <FormRow title="Filters" isRow title_styles={{ width: 60 }}>
        <Switch
          checked={Boolean(value?.filter)}
          onChange={handle_filter_change}
        />
      </FormRow>
      {value?.filter && <Filter value={value?.filter} onChange={onChange} />}
    </>
  );
}

export default Injest;
