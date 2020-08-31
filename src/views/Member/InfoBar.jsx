import React, { Component } from "react";
import PropTypes from "prop-types";

class InfoBar extends Component {
  render() {
    return (
      <div className="card card-stats">
        <div className="card-body ">
          <div className="statistics statistics-horizontal">
            <div className="info info-horizontal">
              <div className="row">
                <div className="col-5">
                  <div className={`icon icon-${this.props.color} icon-circle`}>
                    <i className={this.props.icon} />
                  </div>
                </div>
                <div className="col-7 text-right">
                  <h3 className="info-title">{this.props.info}</h3>
                  <h6 className="stats-title">{this.props.stats}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InfoBar.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  info: PropTypes.string,
  stats: PropTypes.string
};

export default InfoBar;
