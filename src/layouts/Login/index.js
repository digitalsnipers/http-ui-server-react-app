import React from 'react';
import styles from './styles.module.scss';


function LoginLayout({ children }) {
  return (
    <div className={styles.main_wrapper}>
      <div className={styles.login}>
        {children}
      </div>
      <p className={styles.cr}>&copy; 2024 Ciber Digita Consultants LLP. All rights reserved.</p>
    </div>
  );
}

export default LoginLayout;
