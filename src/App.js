import React, { Component } from 'react';
import Row from './components/Row.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    function zeros(dimensions) {
      let array = [];
      for (let i = 0; i < dimensions[0]; ++i) {
          array.push(dimensions.length === 1 ? "dead" : zeros(dimensions.slice(1)));
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
      for(let i = 0; i < arr.length; i++){
        data[arr[i][0]][arr[i][1]] = "old";
      }
      return data;
    }

    let d = zeros([40,50]);

    this.state = {
      rows: 40,
      cols: 50,
      data: randomStart(d)
    }
    this.updateCell = this.updateCell.bind(this);
  }

  updateCell(row, col, val){
    console.log("Updating row: " + row + " cell: " + col + " val: " + val);
    let data = this.state.data;
    if(val === "dead"){
      data[row][col] = "born";
    }
    else if(val === "born"){
      data[row][col] = "old";
    }
    else{
      data[row][col] = "dead";
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
        updateCell={this.updateCell}
      />);
    }
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <div id="board">
          {rows}
        </div>
      </div>
    );
  }
}

export default App;
