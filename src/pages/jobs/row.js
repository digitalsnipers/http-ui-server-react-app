import React from 'react'
import {
  FolderCloseIcon,
  IconButton,
  GridViewIcon,
  ListIcon,
  UploadIcon,
  CrossIcon,
  toaster,
  TextInput,
  DocumentIcon,
  CompressedIcon,
  TrashIcon,
  AlignLeftIcon,
  RefreshIcon
} from "evergreen-ui";
import moment from 'moment'
import API from "../../services/connection";
import styles from "./styles.module.scss";
import Info from './info'
import Action from './actions'

const Card = ({ selected, onClick, isHeader, loading, index, ...rest }) => {
  const render_operation = (op) => {
    switch (op) {
      case 'index':
        return <UploadIcon style={{opacity:0.3}} />

      case 'extract':
        return <DocumentIcon style={{opacity:0.3}} />

      case 'compress':
        return <CompressedIcon style={{opacity:0.3}} />
      
      case 'delete':
        return <TrashIcon style={{opacity:0.3}} />

      case 'get':
        return <AlignLeftIcon style={{opacity:0.3}} />
    
      default:
        return <RefreshIcon style={{opacity:0.3}} />
    }
  }

  const render_status = (s) => {
    switch (s) {
      case 'queue':
        return <span style={{color:"#e6b400"}}>Not Started</span>

      case 'in_progress':
        return <span style={{color:"#2952CC"}}>In Progress</span>

      case 'complete':
        return <span style={{color:"#0f9d58"}}>Completed</span>
      
      case 'error':
        return <span style={{color:"#ff2c2c"}}>Error</span>
    
      default:
        return null
    }
  }

  

  if(isHeader){
    return (
      <div
        className={styles.card}
        role="presentation"
        style={{background:'#f9fafb',zIndex:10}}
      >
        <div style={{width:30}}>
          {loading && render_operation('loading')}
        </div>
        <p style={{ opacity: 0.75, margin: 0, width:'20%', textAlign: 'left', paddingLeft:10 }}>
          Timestamp
        </p>
        <p style={{ opacity: 0.75, margin: 0, width:'15%', textAlign: 'left' }}>
          Source
        </p>
        <p style={{ opacity: 0.75, margin: 0, width:'15%', textAlign: 'left' }}>
          Operation
        </p>
        <p style={{ opacity: 0.75, margin: 0, width:'15%', textAlign: 'left' }}>
          Status
        </p>
        <p style={{ opacity: 0.75, margin: 0, flex:1, textAlign: 'left' }}>
          Actions
        </p>
      </div>
    );
  }

  return (
    <div
      className={styles.card}
      active={selected ? "yes" : "no"}
    >
      <div style={{width:30}}>
        {render_operation(rest.operation)}
      </div>
      <p style={{ opacity: selected ? 1 : 0.75, margin: 0, width:'20%', textAlign: 'left', paddingLeft:10 }}>
        {moment.utc(rest.timestamp).local().format('MMMM Do YYYY hh:mm a')}
      </p>
      <p style={{ opacity: selected ? 1 : 0.75, margin: 0, width:'15%', textAlign: 'left' }}>
        {rest.source}
      </p>
      <p style={{ opacity: selected ? 1 : 0.75, margin: 0, width:'15%', textAlign: 'left' }}>
        {rest.operation}
      </p>
      <p style={{ opacity: selected ? 1 : 0.75, margin: 0, width:'15%', textAlign: 'left' }}>
        {render_status(rest.status)}
      </p>
      <div style={{ opacity: selected ? 1 : 0.75, margin: 0, flex: 1, textAlign: 'left' }}>
        <Action onSelect={onClick} {...rest} />
      </div>
    </div>
  );
};

export default Card