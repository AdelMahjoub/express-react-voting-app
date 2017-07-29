import React from 'react';

export default function Notification(props) {

  function close(e) {
    e.target.parentElement.setAttribute('style', 'display: none;');
  }

  return (
    <div className={`alert ${props.color}`}>
      <button
      onClick={close} 
      type="button" 
      className="close">&times;</button>
      <strong>{props.message}</strong>
    </div>
  )
}