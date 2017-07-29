import React from 'react';
import PollItem from './PollItem.component';

const columns = 4;

const Hsplitter = function() {
  return (
      <div className="col-xs-12 col-md-12">
        <hr/>
      </div>
  )
}

const PollsList = function(props) {
  return (
    <div className="container main">
      <div className="row">
      {
        props.polls.map((poll, index) => {
          return (
            <div key={poll['_id']}>
            <PollItem 
            inDashboard={props.inDashboard}
            title={poll['title']}
            author={poll['postedBy']['username']}
            voters={poll['participants'].length}
            date={poll['createdAt']}
            pollId={poll._id}
            authorId={poll['postedBy']['_id']}
            handleDelete={props.handleDelete}/>
            {(index > 0 && (index + 1) % columns === 0) && <Hsplitter />}
            </div>
          ) 
        })
      }
      </div>
    </div>
  )
}

export default PollsList;