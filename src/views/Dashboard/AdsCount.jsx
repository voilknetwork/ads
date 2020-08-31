import React, { Component } from 'react';
import InfoItem from "../../components/InfoPanel/InfoItem";
import PropTypes from "prop-types";

class AdsCount extends Component {
    render() {
        return ( 
            <InfoItem
            info={{
              icon_color: "icon icon-info",
              icon: "fab fa-buysellads",
              value: "Adverts",
              fname: this.props.count
            }}
          />
         );
    }
}
AdsCount.propTypes = {
  count: PropTypes.string
};  
export default AdsCount;