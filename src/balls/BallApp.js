import React, { Component } from "react";
import { Typography, Button } from '@material-ui/core';
import './BallApp.css';
 
class BallList extends React.Component {
  render() {
    // React doesn't reinstantiate components when it rerenders them
    // React memo can make sure that it doesn't rerender
    return (
      <div>
        {this.props.items.map(item => (
          <Ball changer={item.changer} key={item.id}/>
        ))}
      </div>
    );
  }
}
 
class Ball extends Component {
  constructor(props) {
    super(props);
    this.changer = props.changer;
    this.state = {
      ticks : 0,
      xOffset : 0,
      yOffset : 0,
      xVel : Math.random() * 6 - 3,
      yVel : Math.random() * 6 - 3,
      radius : (Math.random() * 20) + 10,
      color : Math.floor(Math.random()*16777215).toString(16),
      visibility: true
    };
    this.xMin = -50
    this.xMax = 50
    this.yMin = -45
    this.yMax = 50
  }
 
  tick() {
    this.setState(state => {
      state = JSON.parse(JSON.stringify(state)); // Removing this results in color reverting back to it's original value after return
      state = this.move(state);
      state = this.bounce(state);
      state = this.changer.change(state);
      state.ticks += 1;
      return (state);
    });
  }
 
  move(state) {
    state.xOffset += state.xVel;
    state.yOffset += state.yVel;
    return state;
  }
 
  bounce(state) {
    // finds the max in vw with the size of the ball taken into account
    // I have no clue why it is times 4 radius instead of times 2
    const trueXMax = this.xMax - (state.radius * 2) * (100 / window.innerWidth);
    const trueYMax = this.yMax - (state.radius * 2) * (100 / window.innerHeight);
 
    if (state.xOffset < this.xMin) {
      let diff = this.xMin - state.xOffset;
      state.xOffset += diff * 2;
      state.xVel *= -1;
    }
 
    if (state.xOffset > trueXMax) {
      let diff = state.xOffset - trueXMax;
      state.xOffset -= diff * 2;
      state.xVel *= -1;
    }
 
    if (state.yOffset < this.yMin) {
      let diff = this.yMin - state.yOffset;
      state.yOffset += diff * 2;
      state.yVel *= -1;
    }
 
    if (state.yOffset > trueYMax) {
      let diff = state.yOffset - trueYMax;
      state.yOffset -= diff * 2;
      state.yVel *= -1;
    }
    return state;
  }
 
  componentDidMount() {
    this.interval = setInterval(() => {
        this.tick();
      }, 30);
  }
 
  componentWillUnmount() {
    clearInterval(this.interval);
  }
 
  render() {
    if (this.state.visibility) {
      return (<div className="Ball" style={{
        marginLeft: this.state.xOffset + "vw",
        marginTop: this.state.yOffset + "vh",
        position: "absolute",
        width: "0px",
        height: "0px"
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{
          width: (this.state.radius * 2) + "px",
          height: (this.state.radius * 2) + "px"
        }}>
          <circle cx={this.state.radius} cy={this.state.radius} r={this.state.radius} fill={"#" + this.state.color} />
        </svg>
      </div>);
    } else {
      return (<div className="Ball" style={{
        marginLeft: this.state.xOffset + "vw",
        marginTop: this.state.yOffset + "vh",
        position: "absolute",
        width: "0px",
        height: "0px"
      }}></div>);
    }
  }
}
 
class NoBallChange {
  change(state) {
    return JSON.parse(JSON.stringify(state));
  }
 
  toString() {
    return "Straight";
  }
}
 
class RainbowBallChange extends NoBallChange {
 
  constructor() {
    super();
    this.colors = ["9400D3", "4B0082", "0000FF", "00FF00", "FFFF00", "FF7F00", "FF0000"];
    this.change = this.change.bind(this);
  }
 
  change(state) {
    state = super.change(state);
    if (state.ticks % 3 === 0) {
      let index = this.colors.indexOf(state.color);
      if (index !== -1) {
        state.color = this.colors[(index + 1) % this.colors.length];
      } else {
        state.color = this.colors[0];
      }
    }
    return state;
  }
 
  toString() {
    return "Rainbow";
  }
}
 
class SizeBallChange extends NoBallChange {
 
  change(state) {
    state = super.change(state);
    const multiplier = 1.03;
    const tickCycle = 200;
 
    if (state.ticks % 2 === 0) {
      if (state.ticks % tickCycle < tickCycle / 2) {
        state.radius *= multiplier;
      } else {
        state.radius /= multiplier;
      }
    }
    return state;
  }
 
  toString() {
    return "Size";
  }
}
 
class CompositeBallChange extends NoBallChange {
  
  constructor(changer1, changer2) {
    super();
    this.changer1 = changer1;
    this.changer2 = changer2;
  }
 
  change(state) {
    state = super.change(state);
    state = this.changer1.change(state);
    state = this.changer2.change(state);
    return state;
  }
 
  toString() {
    return this.changer1.toString() + "-" + this.changer2.toString();
  }
}
 
class BlinkingBallChange extends NoBallChange {
 
  change(state) {
    state = super.change(state);
    if (state.ticks % 2 === 0) {
      state.visibility = false;
    } else {
      state.visibility = true;
    }
    return state;
  }
 
  toString() {
    return "Blink";
  }
}
 
export default class BallApp extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], numNewBalls: 10, changer: new NoBallChange(), changer2: new NoBallChange(), changerItems: [
      {changer: new NoBallChange(), id:0}, {changer: new RainbowBallChange(), id:1},
      {changer: new SizeBallChange(), id:2}, {changer: new BlinkingBallChange(), id:3} ]};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setChanger = this.setChanger.bind(this);
    this.setChanger2 = this.setChanger2.bind(this);
    this.handleCombine = this.handleCombine.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleAddRainbow = this.handleAddRainbow.bind(this);
    this.handleAddBlink = this.handleAddBlink.bind(this);
    this.handleAddSize = this.handleAddSize.bind(this);
    this.handleResetModifiers = this.handleResetModifiers.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" id="App-header">
 
          <BallList items={this.state.items}/>
          <Button variant="contained" id="addBallButton" onClick={this.handleSubmit} style={{
            marginBottom: 8
          }} color="primary">
            Add balls!
          </Button>

          <div style={{display: "flex", marginBottom: 8, alignItems: "center"}}>
            <Typography style={{
              marginRight: 8,
              zIndex: 100
            }}>
              Add Modifier:
            </Typography>
            <Button variant="contained" id="combineButton" onClick={this.handleAddRainbow} style={{
              marginRight: 5
            }}>
              Rainbow
            </Button>
            <Button variant="contained" id="combineButton" onClick={this.handleAddBlink} style={{
              marginRight: 5
            }}>
              Blink
            </Button>
            <Button variant="contained" id="combineButton" onClick={this.handleAddSize}>
              Size
            </Button>
          </div>
 
          <Button variant="contained" id="clearButton" onClick={this.handleResetModifiers} style={{
            marginBottom: 8
          }}>
            Reset Modifiers!
          </Button>
 
          <Button variant="contained" id="clearButton" onClick={this.handleClear}
            color="secondary">
            Clear balls!
          </Button>
 
        </header>
      </div>
    );
  }
 
  setChanger(changer) {
    this.setState({changer: changer});
  }
 
  setChanger2(changer) {
    this.setState({changer2: changer});
  }

  handleResetModifiers(e) {
    e.preventDefault();
    this.setState({changer: new NoBallChange()});
  }

  handleAddRainbow(e) {
    e.preventDefault();
    this.setState({changer: new CompositeBallChange(this.state.changer, new RainbowBallChange())});
  }

  handleAddBlink(e) {
    e.preventDefault();
    this.setState({changer: new CompositeBallChange(this.state.changer, new BlinkingBallChange())});
  }

  handleAddSize(e) {
    e.preventDefault();
    this.setState({changer: new CompositeBallChange(this.state.changer, new SizeBallChange())});
  }
 
  handleClear(e) {
    e.preventDefault();
 
    this.setState({items: []});
  }
 
  handleCombine(e) {
    e.preventDefault();
 
    const newChangerItem = {
      changer: new CompositeBallChange(this.state.changer, this.state.changer2), 
      id: this.state.changerItems.length
    };
 
    this.setState({changerItems: [...this.state.changerItems, newChangerItem]});
  }
  handleSliderChange(e) {
  }
 
  handleSubmit(e) {
    e.preventDefault();
 
    const newItemList = [];
    const numNewBalls = this.state.numNewBalls;
 
    for (let i = this.state.items.length; i < this.state.items.length + numNewBalls; i ++) {
      const newItem = {
        changer: this.state.changer,
        id: i
      };
      
      newItemList.push(newItem);
    }
 
    this.setState({items: [...this.state.items, ...newItemList]});
  }
}
