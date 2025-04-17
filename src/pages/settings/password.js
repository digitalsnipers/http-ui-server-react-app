import React, { useState } from "react";
import { TextInput, Button, FloppyDiskIcon, toaster } from "evergreen-ui";
import API from "../../services/connection";
import styles from "./styles.module.scss";

function Password() {
  const [cpass, setCPass] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!cpass || !pass1 || !pass2 || pass1 != pass2) {
      toaster.warning("Invalid values");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("change_pass",{
        cpass,
        pass:pass1
      });
      if (res.data.status) {
        toaster.success("Password reseted succesfully");
      } else {
        toaster.warning("Error reseting password");
      }
    } catch (error) {
      toaster.warning("Something went wrong! please try again later.");
      console.log("error", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className={styles.card}>
        <p style={{ margin: 0 }}>Admin</p>
        <p style={{ margin: 0, color: "#0f9d58" }}>active</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          margin: 50,
          padding: 20,
        }}
      >
        <p style={{ marginBottom: 10 }}>Change admin password</p>
        <TextInput
          placeholder="current password"
          style={{ marginBottom: 30 }}
        type="password"
          value={cpass}
          onChange={(v) => setCPass(v.target.value)}
        />
        <TextInput
          placeholder="New password"
          style={{ marginBottom: 30 }}
        type="password"
          value={pass1}
          onChange={(v) => setPass1(v.target.value)}
        />
        <TextInput
          placeholder="Re enter password"
          style={{ marginBottom: 30 }}
        type="password"
          value={pass2}
          onChange={(v) => setPass2(v.target.value)}
        />
        <Button
          marginRight={16}
          intent="primary"
          iconBefore={FloppyDiskIcon}
          isLoading={loading}
          onClick={submit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Password;
