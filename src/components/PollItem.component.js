import React from 'react';
import { Link } from 'react-router-dom';

const PollItem = function(props) {
  return (
    <div className="col-xs-12 col-md-3">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{props.title}</h3>
        </div>
        <div className="panel-body">
          {
            props.author && 
            <p><strong>Author: </strong> <Link to={"/polls/users/" + props.authorId}>@{props.author}</Link></p>
          }
          <p><strong>Voters: </strong>{props.voters}</p>
          <p><strong>Created at: </strong>{(new Date(props.date)).toLocaleDateString()}</p>
        </div>
        <div className="panel-footer">
          {
            !props.inDashboard ?
            <Link to={"/polls/details/" + props.pollId} className="btn btn-info">
              <i className="fa fa-list"></i>
              {' '}
              <span>Participate</span>
            </Link>
            :
            <div>
              <Link 
                to={"/polls/edit/" + props.pollId} 
                className="btn btn-primary fa fa-pencil"
                title="edit">
              </Link>
              {' '}
              <button
                id={props.pollId}
                onClick={props.handleDelete}
                title="discard" 
                className="btn btn-danger fa fa-trash">
              </button>
            </div>
          }
          
        </div>
      </div>
    </div>
  )
}

export default PollItem;