import React, { useState } from "react";
import { Button, TextInput, Link, CloudIcon, toaster } from "evergreen-ui";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import styles from "./styles.module.scss";

function Login() {
  const [uname, setUname] = useState("admin");
  const [pass, setPass] = useState("ACDcdc!@#4");
  const dispatch = useDispatch();

  const { isAuthenticated, isLoading } = useSelector((store) => store.user);
  if (isAuthenticated) return <Navigate to="/explorer" />;

  const handleSubmit = () => {
    if(uname&&pass){
      dispatch({ type: "LOGIN", payload: { username: uname, password: pass } });
    }
    else{
      toaster.warning("Incorrect Credentials !")
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <CloudIcon size={100} color="disabled" />
        <h1
          style={{
            marginBottom: 40,
            fontWeight: 400,
            opacity: 1,
            color: "#2952CC",
          }}
        >
          Flatfile Manager
        </h1>
      </div>
      <TextInput
        placeholder="username"
        style={{ marginBottom: 20, width: "100%" }}
        value={uname}
        onChange={(v) => setUname(v.target.value)}
      />
      <TextInput
        placeholder="password"
        type="password"
        style={{ marginBottom: 20, width: "100%" }}
        value={pass}
        onChange={(v) => setPass(v.target.value)}
      />
      <Button
        appearance="primary"
        isLoading={isLoading}
        style={{ marginBottom: 20 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Link href="" style={{ textAlign: "center" }}>
        forgot password?
      </Link>
    </div>
  );
}

export default Login;
