import React from "react";
import {
  TextInput,
  Switch,
} from "evergreen-ui";
import FormRow from "../../../components/form_row";
import Filter from "./filter";
import Timerange from "./timerange";

function Injest(props) {
  return (
    <>
      <FormRow title="Index" isRow title_styles={{ width: 60 }}>
        <TextInput disabled value={props?.index} placeholder="Target Index" />
      </FormRow>
      <Timerange {...{from:props?.from, to:props?.to}} />
      <FormRow title="Filters" isRow title_styles={{ width: 60 }}>
        <Switch disabled checked={Boolean(props?.filter)} />
      </FormRow>
      {props?.filter && <Filter value={props?.filter} />}
    </>
  );
}

export default Injest;
