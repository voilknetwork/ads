import React, { Component } from "react";

import gql from "graphql-tag";
import { graphql } from "react-apollo";
import InfoItem from "./InfoItem";

const query = gql`
  {
    global_dynamic_properties {
      virtual_supply
      current_vsd_supply
      total_reward_fund_voilk
      vote_power_reserve_rate
    }
  }
`;

class InfoPanel extends Component {
  getInfoPanel() {
    let data = this.props.data;
    if (!data.loading) {
      const item1 = {
        icon_color: "icon icon-primary",
        icon: "now-ui-icons business_money-coins",
        value: "VOILK Supply",
        fname: data.global_dynamic_properties.virtual_supply
      };
      const item2 = {
        icon_color: "icon icon-success",
        icon: "now-ui-icons objects_diamond",
        value: "VSD Supply",
        fname: data.global_dynamic_properties.current_vsd_supply
      };
      const item3 = {
        icon_color: "icon icon-warning",
        icon: "now-ui-icons shopping_bag-16",
        value: "Reward Fund",
        fname: data.global_dynamic_properties.total_reward_fund_voilk
      };
      const item4 = {
        icon_color: "icon icon-primary",
        icon: "now-ui-icons ui-2_like",
        value: "Reserve Rate",
        fname: data.global_dynamic_properties.vote_power_reserve_rate
      };

      return (
        <div className="col-md-12">
          <div className="card card-stats card-raised">
            <div className="card-body">
              <div className="row">
                <InfoItem info={item1} />
                <InfoItem info={item2} />
                <InfoItem info={item3} />
                <InfoItem info={item4} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    return <div className="row">{this.getInfoPanel()}</div>;
  }
}

export default graphql(query)(InfoPanel);
