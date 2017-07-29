import React from 'react';

export default function CenteredSection(props) {
  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 col-md-offset-2">
        { props.children }
      </div>
    </div>
  )
}