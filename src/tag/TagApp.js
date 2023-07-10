import React from 'react';

export default function TagApp() {
  // Valid gamePhases are 'menu', 'game', 'end'
  // const [gamePhase, setGamePhase] = useState("menu");
  // const [obstacles, setObstacles] = useState([]);

  const keyDownEvent = (e) => {
    console.log("hi");
    console.log(e.keyCode);
  };

  // useEffect(() => {
  //   document.addEventListener("keydown", keyDownEvent);
  //   return () => document.removeEventListener("keydown", keyDownEvent);
  // }, []);

  return (
    <div 
      tabIndex="0"
      onKeyDown={keyDownEvent}
      style={{backgroundColor:"red",
        height:"100vh",
        width:"100vw"}}>

    </div>
  );
}