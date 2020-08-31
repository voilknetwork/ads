import React, { Component } from "react";
import PropTypes from "prop-types";

class StatsPanel extends Component {
  render() {
    return (
      <div className="col-md-12">
        <div className="card card-stats card-raised">
          <div className="card-body">
            <div className="row">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

StatsPanel.propTypes = {
  item1: PropTypes.object,
  item2: PropTypes.object,
  item3: PropTypes.object,
  item4: PropTypes.object
};

export default StatsPanel;
