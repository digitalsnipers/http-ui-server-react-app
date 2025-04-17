import React, { useContext } from "react";
import { TextInput } from "evergreen-ui";
import FormRow from "../../../components/form_row";

function Timerange({from,to}) {

  const time_reg =
    /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4} (00|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

  return (
    <FormRow
      title="Timerange"
      isRow
      title_styles={{ width: 60 }}
      children_styles={{ display: "flex", gap: 10 }}
    >
      <TextInput
      disabled
        value={from}
        style={{ width: "50%" }}
        placeholder="From: DD-MM-YYYY hh:mm"
        isInvalid={!time_reg.test(from)}
      />
      <TextInput
        value={to}
        disabled
        style={{ width: "50%" }}
        placeholder="To: DD-MM-YYYY hh:mm"
        isInvalid={!time_reg.test(to)}
      />
    </FormRow>
  );
}

export default Timerange;
