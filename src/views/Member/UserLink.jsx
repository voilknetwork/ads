import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class UserLink extends Component {
  render() {
    return (
      <a href="#">{this.props.author}</a>
    );
  }
}

UserLink.propTypes = {
  author: PropTypes.string
};

export default UserLink;
