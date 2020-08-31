import React, { Component } from "react";
import PropTypes from "prop-types";

class ProgressBar extends Component {
  render() {
    return (
      <div className="card-progress">
        <div className={`progress-container progress-${this.props.color}`}>
          <span className="progress-badge">{this.props.title}</span>
          <div className="progress">
            <div
              className="progress-bar progress-bar-warning"
              role="progressbar"
              aria-valuenow={this.props.current}
              aria-valuemin="0"
              aria-valuemax={this.props.max}
              style={{
                width: `${this.props.current}%`
              }}
            >
              <span className="progress-value">{this.props.current}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  title: PropTypes.string,
  current: PropTypes.string,
  color: PropTypes.string,
  max: PropTypes.string
};

export default ProgressBar;
