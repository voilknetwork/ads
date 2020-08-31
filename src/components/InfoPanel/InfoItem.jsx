import React, { Component } from "react";
import PropTypes from "prop-types";

class InfoItem extends Component {
  render() {
    return (
      <div className="col-md-3">
        <div className="statistics">
          <div className="info">
            <div className={this.props.info.icon_color}>
              <i className={this.props.info.icon} />
            </div>
            <h3 className="info-title">
              <small>{this.props.info.symbol}</small>
              {this.props.info.value}
            </h3>
            <h6 className="stats-title">{this.props.info.fname}</h6>
          </div>
        </div>
      </div>
    );
  }
}

InfoItem.propTypes = {
  info: PropTypes.object
};

export default InfoItem;

//"<small>$<small>"
