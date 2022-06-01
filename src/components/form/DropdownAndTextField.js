import React, { Component, Fragment } from "react";

class DropdownAndTextField extends Component {
  render() {
    return (
      <Fragment>
        <div className="container-dropdown">
          <form action="">
            <div className="dropdownText-row">
              <div className="col-50">
                <select className="select" onChange={this.props.onChange}>
                  <option value="default">All Vehicles</option>
                  <option value="running">Running</option>
                  <option value="stopped">Stopped</option>
                  <option value="faulty">Faulty</option>
                </select>
              </div>
              <div className="col-50">
                <input
                  className="inputField"
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search with vehicle id or status"
                />
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default DropdownAndTextField;
