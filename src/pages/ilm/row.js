import React from 'react'
import {
  CompressedIcon,
  TrashIcon,
  RefreshIcon
} from "evergreen-ui";
import moment from 'moment'
import styles from "./styles.module.scss";

const Card = ({ isHeader, loading, ...rest }) => {
  console.log(rest)
  const render_operation = (op) => {
    switch (op) {
      case 'compression':
        return <CompressedIcon style={{ opacity: 0.3 }} />

      case 'deletion':
        return <TrashIcon style={{ opacity: 0.3 }} />

      default:
        return <RefreshIcon style={{ opacity: 0.3 }} />
    }
  }

  const render_status = (s) => {
    switch (s) {
      case 'success':
        return <span style={{ color: "#0f9d58" }}>Completed</span>

      case 'error':
        return <span style={{ color: "#ff2c2c" }}>Error</span>

      default:
        return null
    }
  }



  if (isHeader) {
    return (
      <div
        className={styles.card}
        style={{ background: '#f9fafb', zIndex: 10 }}
      >
        <div style={{ width: 20 }}>
          {loading && render_operation('loading')}
        </div>
        <p style={{ opacity: 0.75, margin: 0, width: '12%', textAlign: 'left', paddingLeft: 10 }}>
          Timestamp
        </p>
        <p style={{ opacity: 0.75, margin: 0, width: '12%', textAlign: 'left' }}>
          Source
        </p>
        <p style={{ opacity: 0.75, margin: 0, width: '12%', textAlign: 'left', paddingLeft: 10 }}>
          Operation
        </p>
        <p style={{ opacity: 0.75, margin: 0, width: '12%', textAlign: 'left' }}>
          From
        </p>
        <p style={{ opacity: 0.75, margin: 0, width: '12%', textAlign: 'left' }}>
          To
        </p>
        <p style={{ opacity: 0.75, margin: 0, width: '5%', textAlign: 'left' }}>
          Took
        </p>
        <p style={{ opacity: 0.75, margin: 0, width: '8%', textAlign: 'left' }}>
          Status
        </p>
      </div>
    );
  }

  return (
    <div
      className={styles.card}
    >
      <div style={{ width: 20 }}>
        {render_operation(rest.operation)}
      </div>
      <p style={{ opacity: 0.75, margin: 0, width: '12%', textAlign: 'left', paddingLeft: 10 }}>
        {moment(rest.timestamp).format('MMMM Do YYYY hh:mm a')}
      </p>
      <p style={{ opacity: 0.75, margin: 0, width: '12%', textAlign: 'left', paddingLeft: 10 }}>
        {rest.source}
      </p>
      <p style={{ opacity: 0.75, margin: 0, width: '12%', textAlign: 'left', paddingLeft: 10 }}>
        {rest.operation}
      </p>
      <p style={{ opacity: 0.75, margin: 0, width: '12%', textAlign: 'left', paddingLeft: 10 }}>
        {moment(rest.date_from).format('MMMM Do YYYY hh:mm a')}
      </p>
      <p style={{ opacity: 0.75, margin: 0, width: '12%', textAlign: 'left', paddingLeft: 10 }}>
        {moment(rest.date_to).format('MMMM Do YYYY hh:mm a')}
      </p>
      <p style={{ opacity: 0.75, margin: 0, width: '5%', textAlign: 'left', paddingLeft: 10 }}>
        {rest.took} Seconds
      </p>
      <p style={{ opacity: 0.75, margin: 0, width: '8%', textAlign: 'left', paddingLeft: 10 }}>
        {render_status(rest.status)}
      </p>
    </div>
  );
};

export default Card