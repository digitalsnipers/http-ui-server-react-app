import React from 'react';
import { useDispatch } from 'react-redux';
import { LogOutIcon, CloudIcon, IconButton } from 'evergreen-ui'

import styles from './styles.module.scss';
import Menu from '../top_menu'

function Header() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT', payload: { isAuthenticated: false } });
  };


  return (
    <div className={styles.wrapper}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CloudIcon style={{ marginRight: 10 }} color="disabled" size={30} />
        <h3 style={{ fontWeight: 450, opacity: 1, color: '#2952CC', marginRight: 50 }}>Flatfile Manager</h3>
        <Menu />
      </div>
      <IconButton icon={<LogOutIcon />} onClick={handleLogout} intent="danger" appearance='minimal' />
    </div>
  );
}

export default Header;
