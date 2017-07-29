import React from 'react';
import CenteredSection from './CenteredSection.component';

export default function PollVoteForm(props) {

  return (
    <CenteredSection>
      <form onSubmit={props.onVote}>
        <legend>{props.title}</legend>
        <div className="form-group well">
          {
            props.options.map(option => {
              return (
                <div
                key={option._id} 
                className="radio">
                  <label>
                    <input 
                    onClick={props.onSelect}
                    type="radio"
                    name="option"
                    value={option._id}/>
                    {option.label}
                  </label>
                </div>
              )
            })
          }
        </div>
        <div className="form-group">
          <button
          disabled={props.selectedOption.length === 0 ? true : false}
          className="btn btn-success"
          type="submit">Vote</button>
        </div>
      </form>
    </CenteredSection>
  )

}



