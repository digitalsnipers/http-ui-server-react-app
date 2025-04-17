import React, { useContext } from "react";
import moment from "moment";
import { TextInput } from "evergreen-ui";
import { TimeRangeContext } from "../index";
import FormRow from "../../../components/form_row";

function Timerange() {
  const { setFrom, setTo, from, to } = useContext(TimeRangeContext);

  const time_reg =
    /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4} (00|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

  return (
    <FormRow
      title="Timerange"
      isRow
      title_styles={{ width: 60, display:'flex'  }}
      wrapper_styles={{
        alignItems:'flex-start'
      }}
      /* children_styles={{ display: "flex", gap: 10 }} */
    >
      <TextInput
        value={from}
        style={{ width: "50%" }}
        placeholder="From: DD-MM-YYYY hh:mm"
        isInvalid={!time_reg.test(from)}
        onChange={(event) => setFrom(event.target.value)}
        style={{marginBottom:10, width:150}}
      />
  <br />
      <TextInput
        value={to}
        style={{ width: "50%" }}
        placeholder="To: DD-MM-YYYY hh:mm"
        isInvalid={!time_reg.test(to)}
        onChange={(event) => setTo(event.target.value)}
        style={{marginBottom:10, width:150}}
      />
    </FormRow>
  );
}

export default Timerange;
