import React, { Component, Fragment } from "react";

class OtherNotesForm extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <form action="">
            <div className="row">
              <div className="col-100">
                <textarea
                  onChange={this.props.onChange}
                  disabled={
                    this.props.details !== null && this.props.edit === false
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.additionalInfo
                      : this.props.details.additionalInfo
                  }
                  className="textField"
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder="Write something.."
                  style={{ height: "110px" }}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default OtherNotesForm;
