import React from 'react'

function FormRow({
  title,
  children,
  isRow = false,
  wrapper_styles = {},
  title_styles = {},
  children_styles = {},
}) {
  if (isRow) {
    return (
      <div
        style={{
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          margin: "5px 0px",
          ...wrapper_styles,
        }}
      >
        <div
          style={{
            fontSize: 12,
            marginBottom: 5,
            margin: "0px 10px 0px 0px",
            ...title_styles,
          }}
        >
          {title}
        </div>
        <div style={{flex:1,...children_styles}}>{children}</div>
      </div>
    );
  }
  return (
    <div style={{ textAlign: "left", margin: "5px 0px" }}>
      <div style={{ fontSize: 12, marginBottom: 10 }}>{title}</div>
      <div>{children}</div>
    </div>
  );
}

export default FormRow