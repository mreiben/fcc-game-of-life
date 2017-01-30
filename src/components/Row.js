import React from 'react';
import Cell from './Cell.js';
import './Row.css';

const Row = (props) => {
  let myCells = [];
  for(let i = 0; i < props.size; i++){
    const k = props.rowNum + "x" + i;
    myCells.push(<Cell
      rowNum={props.rowNum}
      colNum={i}
      value={props.values[i]}
      key={k}
      addCell={props.addCell}
    />);
  }
  return(
    <div className="row">
      {myCells}
    </div>
  );
}

export default Row;
