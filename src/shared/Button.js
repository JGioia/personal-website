import React, { useMemo } from 'react';

export default function Button(props) {
  const children = props.children;
  const onClick = props.onClick ?? (() => undefined);
  const fullWidth = props.fullWidth ?? false;
  const fullHeight = props.fullHeight ?? false;
  const disableLinkStyling = props.disableLinkStyling ?? false;
  const invisible = props.invisible ?? false;
  const color = props.color ?? "rgb(251, 131, 134)";

  const style = useMemo(() => {
    let style = {
      borderRadius: "5px",
      display: "flex",
      justifyContent: "center",
      padding: 10
    }
    // Interesting implementation note height and width percent only work when parent's height and width are set
    // This makes it impossible to set something to be the full height of the parent component if the parent component's
    // height is unknown/not it's a percent
    if (fullWidth) {
      style = {...style, width: "100%"};
    }
    if (fullHeight) {
      style = {...style, height: "100%"};
    }
    if (!disableLinkStyling) {
      style = {...style, cursor: "pointer"};
    }
    if (!invisible) {
      style = {...style, backgroundColor: color} //"rgb(41, 88, 163)",
    }
    return style;
  },[fullHeight, fullWidth, disableLinkStyling, invisible, color]);

  const className = invisible ? "hover-background" : "hover-shadow";

  return (
    <div 
    style={style} 
    onClick={onClick}
    className={className}>
      {children}
    </div>
  )
}