import React from 'react';

const sortOptions= ['most recent', 'oldest', 'most voted', 'least voted'];

const NavbarForm = function(props) {
  return (
    <form className="navbar-form navbar-left">
      <div className="form-group has-feedback">
        <div className="input-group">
          <span className="input-group-addon">Search</span>
          <input
          value={props.searchTerm}
          onChange={props.onSearch} 
          type="text" 
          className="form-control" 
          placeholder="Search" />
        </div>
        <span className="fa fa-search form-control-feedback"></span>
      </div>
      {' '}
      <div className="form-group">
        <div className="input-group">
          <span className="input-group-addon">Sort By</span>
          <select
          defaultValue={props.sortFilter}
          onChange={props.onSort} 
          className="form-control">
            {
              sortOptions.map(option => {
                return (
                  <option
                    key={option} 
                    value={option}>{ option.charAt(0).toUpperCase() + option.slice(1)}</option>
                )
              })
            }
          </select>
        </div>
      </div>
    </form>
  )
}

export default NavbarForm;