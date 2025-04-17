import React, { useEffect, useState } from "react";
import {
  Switch,
  TextInput,
  FloppyDiskIcon,
  Button,
  toaster
} from "evergreen-ui";

import API from "../../../services/connection";

import { FormRow } from "./helper";
import Row from "../../../components/form_row";

function Dlt() {
  const [d, setD] = useState({status:false, days:0})
  const [ loading, setloading] = useState(false)

  useEffect(()=>{
    const load = async () => {
      setloading(true);
      try {
        const res = await API.get(`settings/delete`);
        if (res.data?.status && res.data?.data) {
          setD(res.data?.data);
        }
      } catch (error) {
        toaster.warning("Something went wrong! please try again later.");
        console.log("error", error);
      }
      setloading(false);
    };
    load();
  },[])

  const handeSave = async () => {
    if(d.status && (isNaN(d.days) || d.days===0)){
      toaster.warning('Invalid configuration')
      return
    }
    setloading(true);
      try {
        const res = await API.post(`settings/delete`,{
          value:JSON.stringify(d)
        });
        if (res.data?.status) {
          toaster.success('Settings saved succesfully')
        }
        else{
          toaster.warning('Error while saving setting')
        }
      } catch (error) {
        toaster.warning("Something went wrong! please try again later.");
        console.log("error", error);
      }
      setloading(false);
  }


  return (
    <FormRow
        title="Data deletion"
        desc="No. of days where the data stays befor final delete"
      >
        <Row
          title="Enabled"
          isRow
          title_styles={{ width: 50 }}
          wrapper_styles={{ marginBottom: 20 }}
          children_styles={{ textAlign: "left" }}
        >
          <Switch checked={d?.status} onChange={()=>setD({status:!d?.status,days:d?.days})} />
        </Row>
        <Row
          title="Days"
          isRow
          title_styles={{ width: 50 }}
          children_styles={{ textAlign: "left" }}
        >
          <TextInput width={50} disabled={!d?.status} value={d?.days} onChange={(v) => setD({status:d?.status, days:v.target.value})} />
        </Row>
        <Button
          marginRight={16}
          intent="primary"
          iconBefore={FloppyDiskIcon}
          style={{ marginTop: 30 }}
          isLoading={loading}
          onClick={handeSave}
        >
          Save
        </Button>
      </FormRow>
  )
}

export default Dlt