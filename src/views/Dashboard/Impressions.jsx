import React, { Component } from 'react';
import InfoItem from "../../components/InfoPanel/InfoItem";
import PropTypes from "prop-types";
class Impressions extends Component {
    state = {  }
    render() { 
        return ( 
            <InfoItem
            info={{
              icon_color: "icon icon-warning",
              icon: "fas fa-eye",
              value: "Views",
              fname: this.props.count
            }}
          />
         );
    }
}
Impressions.propTypes = {
  count: PropTypes.string
}; 

export default Impressions;