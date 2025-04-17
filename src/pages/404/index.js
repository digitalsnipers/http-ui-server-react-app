import React from "react";
import { Button, Link, CloudIcon } from "evergreen-ui";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import styles from "./styles.module.scss";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { isAuthenticated } = useSelector((store) => store.user);
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
      <div className={styles.logo}>
        <CloudIcon size={100} color="disabled" />
        <h1 style={{ marginBottom: 40, fontWeight: 400, opacity: 1, color: '#d8dae5' }}>404 Not Found</h1>
      </div>
      <Button appearance="minimal" style={{ marginBottom: 20 }} onClick={() => navigate('/home')}>Go Home</Button>
    </div>
    </div>
  );
}

export default Login;
