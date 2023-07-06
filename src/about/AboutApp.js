import React from 'react';

export default function AboutApp() {
  return (
    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
      <Text large bold>About Me</Text>
      <div style={{display: "grid", gridTemplateColumns: "2fr 1fr"}}>
        <Text>
          Hi!! I'm Joseph Gioia! I'm a software engineer currently working at ExtraHop in Downtown Seattle. 
          I've previously worked as a Software Engineer Intern at Meta and Centene, and as an Undergraduate 
          Research Assistant at the Human-Computer AI and Robotics Group at Rice University.
        </Text>
        <Text>Picture placeholder</Text>
      </div>
      <div>
      <Text>
        Web Apps: Ball World, Timeline Game, Task Selector
      </Text>
      </div>
      <Text>
        <a>LinkedIn</a> - <a>Instagram</a> - <a>Email</a>
      </Text>
    </div>
  )
}