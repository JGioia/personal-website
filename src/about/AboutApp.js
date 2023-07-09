import React from 'react';

import Text from '../shared/Text';

export default function AboutApp() {
  return (
    <div style={{
      display: "flex", 
      alignItems: "center", 
      flexDirection: "column", 
      paddingLeft: "25%", 
      paddingRight: "25%",
      paddingTop: 30,
      paddingBottom: 20,
      gap: 20,
      backgroundColor: "#EDF5E1",
      minHeight: "100vh"}}>
      <Text large bold>About Me</Text>
      <div style={{
        display: "grid", 
        gridTemplateColumns: "1.5fr 2fr", 
        gap: 20}}>
        <img src="IMG_0150 (2).jpg" style={{width: "100%", borderRadius: 20, float: "left"}} />
        <Text>
          Hi!! I'm Joseph Gioia! I'm a software engineer currently working at ExtraHop in Downtown Seattle. 
          I've previously worked as a Software Engineer Intern at Meta and Centene, and as an Undergraduate 
          Research Assistant at the Human-Computer AI and Robotics Group at Rice University.
        </Text>
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: 10}}>
        <Text bold>
          Web Apps
        </Text>
        <Text>
          Ball World
        </Text>
        <Text>
          Timeline Game
        </Text>
        <Text>
          Task Selector
        </Text>
      </div>
      <Text>
        <a href="https://www.linkedin.com/in/joseph-gioia/" target="_blank">LinkedIn</a> - <a href="https://www.instagram.com/joseph.is.away/" target="_blank">Instagram</a>
      </Text>
    </div>
  )
}