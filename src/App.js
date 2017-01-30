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
      data: randomStart(d)
    }
    this.addCell = this.addCell.bind(this);
  }

  // generationTick(data){
  //   //map over data array and change count for each
  //   const dataCounts = data.map(function(cell){
  //     //edge cases - top row, bottom row, left col, right col
  //   });
  //
  //   //map over data and kill any cell wil <2 || >3 neighbors
  //   //and create any cell with exactly 3 neighbors
  //
  // }

  addCell(row, col, val){
    console.log("Updating row: " + row + " cell: " + col + " val: " + val);
    let data = this.state.data;
    if(val === "dead"){
      data[row][col] = ["born",0];
    }
    else if(val === "born"){
      data[row][col] = ["old",0];
    }
    else{
      data[row][col] = ["dead",0];
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
          <Button bsStyle="success">Start</Button>
          <Button bsStyle="danger">Clear</Button>
        </ButtonToolbar>
        <div className="gen-counter">
          <p>Generation: <span id="generation">0</span></p>
        </div>
      </div>
    );
  }
}

export default App;
