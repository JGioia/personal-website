import React from 'react';

export default function Text(props) {
  const children = props.children;
  const white = props.white ?? false;
  const bold = props.bold ?? false;
  const large = props.large ?? false;
  const centerText = props.centerText ?? false;
  const highlighted = props.highlighted ?? false;
  const strikethrough = props.strikethrough ?? false;
  
  return (
    <div style={{
      fontWeight: bold ? "bold" : "normal",
      fontSize: large ? 28 : 16,
      color: white ? "white" : "black",
      display: "flex",
      alignItems: "center",
      textAlign: centerText ? "center" : "",
      textDecoration: strikethrough ? "line-through" : ""
    }}>
      <div style={{backgroundColor: highlighted ? "#FFE873" : ""}}>
        {children}
      </div>
    </div>
  )
}