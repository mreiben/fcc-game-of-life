import React from 'react';
import './Cell.css';

const Cell = (props) => {
  const r = props.rowNum;
  const c = props.colNum;
  const v = props.value[0];
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
