import React from 'react';

export default function Column(props) {
  const children = props.children;
  const style = {
    display: "flex",
    width: "100%"
  };
  return (
    <div style={style}>
      {children}
    </div>
  );
}