import React from 'react';

export default function InputField(props) {
  return (
    <div 
      className={`form-group has-feedback 
        ${!props.blurred ? "" : props.valid ? "has-success" : "has-error"}`}>
      <label 
        htmlFor={props.name}
        className="hidden-xs control-label">{props.label}</label>

      <div className="input-group">
        <div className="input-group-addon">
          <i className={"fa fa-" + props.icon}></i>
        </div>
        <input
          onBlur={props.onBlur}
          onChange={props.onChange}
          defaultValue={props.value}
          name={props.name}
          id={props.name} 
          type={props.type} 
          className="form-control" 
          placeholder={props.label} />
        <span className={`fa
          ${!props.blurred ? "" : props.valid ? "fa-check" : "fa-warning"} 
            form-control-feedback`}></span>
      </div>
      <p className="help-block">{props.blurred ? props.helpMessage : ''}</p>
    </div>
  )
}