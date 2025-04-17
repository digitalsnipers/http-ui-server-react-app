import React from 'react'

export const FormRow = ({title,desc,children}) => {
  return (
    <div style={{display:'flex', borderBottom: "1px solid #eae6f5"}}>
      <div style={{flex:1, padding:'40px 40px 40px 40px'}}>
        <h2 style={{fontWeight:400, margin:0}}>{title}</h2>
        <p style={{margin:0, opacity:0.5, fontSize:11}}>{desc}</p>
      </div>
      <div style={{flex:1, padding:'40px 40px 40px 40px'}}>{children}</div>
    </div>
  )
}
