import React from 'react';
import './Cell.css';

const Cell = (props) => {
  const r = props.value[2];
  const c = props.colNum[3];
  const v = props.value[0];
  const neighbors = props.value[1];
  const classNames = "cell " + props.value[0];
  return (
    <div
      className={classNames}
      onClick={() =>{
        props.addCell(r,c,v)
      }}
    />
  )
}

export default Cell;
