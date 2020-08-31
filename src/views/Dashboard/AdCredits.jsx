import React, { Component } from 'react';
import InfoItem from "../../components/InfoPanel/InfoItem";
import PropTypes from "prop-types";
class AdCredits extends Component {
    state = {  }
    render() { 
        return ( 
            <InfoItem
            info={{
              icon_color: "icon icon-success",
              icon: "fas fa-fill-drip",
              value: "Credits",
              fname: this.props.count
            }}
          />
         );
    }
}
AdCredits.propTypes = {
  count: PropTypes.string
}; 

export default AdCredits;