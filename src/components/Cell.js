import React from 'react';
import './Cell.css';

const Cell = (props) => {
  const r = props.rowNum;
  const c = props.colNum;
  const v = props.value;
  const classNames = "cell " + props.value;
  return (
    <div
      className={classNames}
      onClick={() =>{
        props.updateCell(r,c,v)
      }}
    />
  )
}

export default Cell;
