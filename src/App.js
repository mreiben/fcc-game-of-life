import React, { Component } from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import Row from './components/Row.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    function zeros(rows,cols){
      let array = [];
      for (let r = 0; r < rows; r++) {
        let row = [];
          for (let c = 0; c < cols; c++) {
            row.push(["dead",0,r,c]);
          }
        array.push(row);
      }
      return array;
    }
    function randomStart(data){
      let arr = [];
      for(let i = 0; i < 200; i++){
        let r = Math.floor(Math.random()*40);
        let c = Math.floor(Math.random()*50);
        arr.push([r,c]);
      }
      for(let x = 0; x < arr.length; x++){
        let row = arr[x][0];
        let col = arr[x][1];
        data[row][col][0] = "old";
      }
      return data;
    }

    let d = zeros(40,50);

    this.state = {
      rows: 40,
      cols: 50,
      data: randomStart(d),
      generation: 0,
      tickOn: false,
      started: false,
    }

    this.addCell = this.addCell.bind(this);
    //this.countNeighbors = this.countNeighbors.bind(this);
    this.generationTick = this.generationTick.bind(this);
    this.runTicks = this.runTicks.bind(this);
  }

  countNeighbors = (cell) => {
    let x = 0;
    let data = this.state.data;
    let r = cell[2];
    let c = cell[3];
    //check top row
    if(r===0){
      //check left column
      if(c===0){
        if(data[data.length-1][data[0].length-1][0] !== "dead"){x++;}
        if(data[data.length-1][0][0] !== "dead"){x++;}
        if(data[data.length-1][1][0] !== "dead"){x++;}
        if(data[0][data[0].length-1][0] !== "dead"){x++;}
        if(data[0][1][0] !== "dead"){x++;}
        if(data[1][data[0].length-1][0] !== "dead"){x++;}
        if(data[1][0][0] !== "dead"){x++;}
        if(data[1][1][0] !== "dead"){x++;}
      }
      else if (c=== data[0].length - 1){
        if(data[data.length-1][data[0].length-2][0] !== "dead"){x++;}
        if(data[data.length-1][data[0].length-1][0] !== "dead"){x++;}
        if(data[data.length-1][0][0] !== "dead"){x++;}
        if(data[0][data[0].length-2][0] !== "dead"){x++;}
        if(data[0][0][0] !== "dead"){x++;}
        if(data[1][data[0].length-2][0] !== "dead"){x++;}
        if(data[1][data[0].length-1][0] !== "dead"){x++;}
        if(data[1][0][0] !== "dead"){x++;}
      }
      else {
        if(data[data.length-1][c-1][0] !== "dead"){x++;}
        if(data[data.length-1][c][0] !== "dead"){x++;}
        if(data[data.length-1][c+1][0] !== "dead"){x++;}
        if(data[0][c-1][0] !== "dead"){x++;}
        if(data[0][c+1][0] !== "dead"){x++;}
        if(data[1][c-1][0] !== "dead"){x++;}
        if(data[1][c][0] !== "dead"){x++;}
        if(data[1][c+1][0] !== "dead"){x++;}
      }
    }
    else if (r===data.length-1){
      if(c===0){
        if(data[r-1][data[0].length-1][0] !== "dead"){x++;}
        if(data[r-1][0][0] !== "dead"){x++;}
        if(data[r-1][1][0] !== "dead"){x++;}
        if(data[r][data[0].length-1][0] !== "dead"){x++;}
        if(data[r][1][0] !== "dead"){x++;}
        if(data[0][data[0].length-1][0] !== "dead"){x++;}
        if(data[0][0][0] !== "dead"){x++;}
        if(data[0][1][0] !== "dead"){x++;}
      }
      else if (c === data[0].length - 1){
        if(data[r-1][data[0].length-2][0] !== "dead"){x++;}
        if(data[r-1][data[0].length-1][0] !== "dead"){x++;}
        if(data[r-1][0][0] !== "dead"){x++;}
        if(data[r][data[0].length-2][0] !== "dead"){x++;}
        if(data[r][0][0] !== "dead"){x++;}
        if(data[0][data[0].length-2][0] !== "dead"){x++;}
        if(data[0][data[0].length-1][0] !== "dead"){x++;}
        if(data[0][0][0] !== "dead"){x++;}
      }
    }
    else if (c === 0){
      if(data[r-1][data[0].length-1][0] !== "dead"){x++;}
      if(data[r-1][0][0] !== "dead"){x++;}
      if(data[r-1][1][0] !== "dead"){x++;}
      if(data[r][data[0].length-1][0] !== "dead"){x++;}
      if(data[r][1][0] !== "dead"){x++;}
      if(data[r+1][data[0].length-1][0] !== "dead"){x++;}
      if(data[r+1][c][0] !== "dead"){x++;}
      if(data[r+1][c+1][0] !== "dead"){x++;}
    }
    else if(c===data[0].length-1){
      if(data[r-1][c-1][0] !== "dead"){x++;}
      if(data[r-1][c][0] !== "dead"){x++;}
      if(data[r-1][0][0] !== "dead"){x++;}
      if(data[r][c-1][0] !== "dead"){x++;}
      if(data[r][0][0] !== "dead"){x++;}
      if(data[r+1][c-1][0] !== "dead"){x++;}
      if(data[r+1][c][0] !== "dead"){x++;}
      if(data[r+1][0][0] !== "dead"){x++;}
    }
    else {
      if(data[r-1][c-1][0] !== "dead"){x++;}
      if(data[r-1][c][0] !== "dead"){x++;}
      if(data[r-1][c+1][0] !== "dead"){x++;}
      if(data[r][c-1][0] !== "dead"){x++;}
      if(data[r][c+1][0] !== "dead"){x++;}
      if(data[r+1][c-1][0] !== "dead"){x++;}
      if(data[r+1][c][0] !== "dead"){x++;}
      if(data[r+1][c+1][0] !== "dead"){x++;}
    }
    return x;
  }

  clearCells = () => {
    let newData = this.state.data.map(function(row){
      let newRow = row.map(function(cell){
        let newCell = cell;
        newCell[0] = "dead";
        newCell[1] = 0;
        return newCell;
      });
      return newRow;
    });

    this.setState({data: newData});
    this.setState({generation: 0});
  }

  generationTick = () => {
    let self = this;
    if(this.state.tickOn){
      let newData = this.state.data.map(function(row){
        let newRow = row.map(function(cell){
          let newCell = [cell[0], self.countNeighbors(cell), cell[2], cell[3]];
          if(newCell[1] < 2 || newCell[1] > 3){
            newCell[0] = "dead";
          } else if(newCell[1] === 3){
            if(newCell[0] === "dead"){
              newCell[0] = "born";
            } else if(newCell[0] === "born"){
              newCell[0] = "old";
            }
          } else if(newCell[1] === 2){
            if(newCell[0] === "born"){
              newCell[0] = "old";
            } else {
              newCell[0] = newCell[0];
            }
          }
          return newCell;
        });
        return newRow;
      });

      this.setState({data: newData});
      let g = this.state.generation;
      this.setState({generation: g + 1});
    }
  }

  runTicks(){
    let self = this;
    if(this.state.tickOn === false && this.state.started === false){
      let tickRunner = setInterval(self.generationTick,100);
      this.setState({started: true});
    }
    this.setState({tickOn: true});
  }

  addCell(row, col, val){
    console.log("Updating row: " + row + " cell: " + col + " val: " + val);
    let data = this.state.data;
    if(val === "dead"){
      data[row][col] = ["born",0,row,col];
    }
    else if(val === "born"){
      data[row][col] = ["old",0,row,col];
    }
    else{
      data[row][col] = ["dead",0,row,col];
    }
    this.setState({data: data});
  }

  render() {
    let rows = [];
    for(let i = 0; i < this.state.rows; i++){
      rows.push(<Row
        className="row"
        size={this.state.cols}
        key={i}
        rowNum={i}
        values={this.state.data[i]}
        addCell={this.addCell}
      />);
    }
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <div id="board">
          {rows}
        </div>
        <ButtonToolbar id="add-btn">
          <Button bsStyle="success" onClick={() => this.runTicks()}>Start</Button>
          <Button bsStyle="info" onClick={() => this.setState({tickOn: false})}>Pause</Button>
          <Button bsStyle="danger" onClick={() => this.clearCells()}>Clear</Button>
        </ButtonToolbar>
        <div className="gen-counter">
          <p>Generation: <span id="generation">{this.state.generation}</span></p>
        </div>
      </div>
    );
  }
}

export default App;
