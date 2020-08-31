import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  CardTitle,
  Badge
} from "reactstrap";
import PropTypes from "prop-types";
import Cookies from 'universal-cookie';
import { CardAuthor, CardCategory } from "components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../../components/Loading/Loading";
import InfoBar from "./InfoBar";
import Notification from "../../components/Notification/Notification";
import StatsPanel from "../../components/InfoPanel/StatsPanel";
import AdsCount from "../Dashboard/AdsCount";
import Impressions from "../Dashboard/Impressions";
import AdCredits from "../Dashboard/AdCredits";
import Balance from "../Dashboard/Balance";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
 
// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)
 


class Member extends React.Component {
  compare(a, b) {
    const genreA = a.created_at;
    const genreB = b.created_at;
    
    let comparison = 0;
    if (genreA < genreB) {
      comparison = 1;
    } else if (genreA > genreB) {
      comparison = -1;
    }
    return comparison;
  }
  get_impressions(adverts){

    let impressions = [];
    for(let advert of adverts){
      for(let impression of advert.ad_impressions){
        if(impression!==null)
        impressions.push(impression);
      }
    }
    return impressions.sort(this.compare).slice(0, 100).map((impression, key) => {
      // Create relative date/time formatter.
        const timeAgo = new TimeAgo('en-US')
        let ad_browser  = impression.ad_browser
        let ad_platform= impression.ad_platform
      	let created_at = timeAgo.format(new Date(parseInt(impression.created_at)));
        let geopluginareaCode = impression.geoplugin_areaCode
        let geoplugincity = impression.geoplugin_city
        let geoplugincontinentCode = impression.geoplugin_continentCode
        let geoplugincontinentName = impression.geoplugin_continentName
        let geoplugincountryCode = impression.geoplugin_countryCode
        let geoplugincountryName = impression.geoplugin_countryName
        let geoplugincurrencyCode = impression.geoplugin_currencyCode
        let geoplugincurrencyConverter = impression.geoplugin_currencyConverter
        let geoplugincurrencySymbol = impression.geoplugin_currencySymbol
        let geoplugincurrencySymbol_UTF8 = impression.geoplugin_currencySymbol_UTF8
        let geoplugindelay = impression.geoplugin_delay
        let geoplugindmaCode = impression.geoplugin_dmaCode
        let geoplugineuVATrate = impression.geoplugin_euVATrate
        let geoplugininEU = impression.geoplugin_inEU
        let geopluginlatitude = impression.geoplugin_latitude
        let geopluginlocationAccuracyRadius = impression.geoplugin_locationAccuracyRadius
        let geoplugintimezone = impression.geoplugin_timezone
        let geopluginstatus = impression.geoplugin_status
        let geopluginrequest = impression.geoplugin_request
        let geopluginregionName = impression.geoplugin_regionName
        let geopluginregionCode = impression.geoplugin_regionCode
        let geopluginregion = impression.geoplugin_region
        let geopluginlongitude = impression.geoplugin_longitude
        return <div key={key}>
          <Card>
            <CardHeader>
              <CardCategory>
                <Badge color="warning">{"View"}</Badge> ==>
                {"A user from "}
                <b>  
                  {geoplugincity + ", " +geoplugincountryName}</b>
                {" using "+ ad_platform + " operating system "}
                and
                <b>
                  {" "+ ad_browser+" browser "}
                </b>
                {" with an ip: "}
                <b> {" " + geopluginrequest}</b>{" viewed your advert "}<b>{created_at}</b> 
              </CardCategory>
            </CardHeader>
        </Card>
      </div>;
      });
  }
  get_clicks(adverts){

    let clicks = [];
    for(let advert of adverts){
      for(let cl of advert.ad_clicks){
        if(cl!==null)
        clicks.push(cl);
      }
    }
    return clicks.sort(this.compare).slice(0, 100).map((impression, key) => {
      // Create relative date/time formatter.
        const timeAgo = new TimeAgo('en-US')
        let ad_browser  = impression.ad_browser
        let ad_platform= impression.ad_platform
      	let created_at = timeAgo.format(new Date(parseInt(impression.created_at)));
        let geopluginareaCode = impression.geoplugin_areaCode
        let geoplugincity = impression.geoplugin_city
        let geoplugincontinentCode = impression.geoplugin_continentCode
        let geoplugincontinentName = impression.geoplugin_continentName
        let geoplugincountryCode = impression.geoplugin_countryCode
        let geoplugincountryName = impression.geoplugin_countryName
        let geoplugincurrencyCode = impression.geoplugin_currencyCode
        let geoplugincurrencyConverter = impression.geoplugin_currencyConverter
        let geoplugincurrencySymbol = impression.geoplugin_currencySymbol
        let geoplugincurrencySymbol_UTF8 = impression.geoplugin_currencySymbol_UTF8
        let geoplugindelay = impression.geoplugin_delay
        let geoplugindmaCode = impression.geoplugin_dmaCode
        let geoplugineuVATrate = impression.geoplugin_euVATrate
        let geoplugininEU = impression.geoplugin_inEU
        let geopluginlatitude = impression.geoplugin_latitude
        let geopluginlocationAccuracyRadius = impression.geoplugin_locationAccuracyRadius
        let geoplugintimezone = impression.geoplugin_timezone
        let geopluginstatus = impression.geoplugin_status
        let geopluginrequest = impression.geoplugin_request
        let geopluginregionName = impression.geoplugin_regionName
        let geopluginregionCode = impression.geoplugin_regionCode
        let geopluginregion = impression.geoplugin_region
        let geopluginlongitude = impression.geoplugin_longitude
        return <div key={key}>
          <Card>
            <CardHeader>
              <CardCategory>
                <Badge color="success">{"Click"}</Badge> ==>
                {"A user from "}
                <b>  
                  {geoplugincity + ", " +geoplugincountryName}</b>
                {" using "+ ad_platform + " operating system "}
                and
                <b>
                  {" "+ ad_browser+" browser "}
                </b>
                {" with an ip: "}
                <b> {" " + geopluginrequest}</b>{" clicked on your advert "}<b>{created_at}</b> 
              </CardCategory>
            </CardHeader>
        </Card>
      </div>;
      });
  }

  render() {
    let cookies = new Cookies();
    let name = cookies.get("VOILK_USERNAME");
    return (
      <Query
        query={gql`
          {
            account(name: "${name}") {
              id
              name
              owner {
                key_auths
                weight_threshold
                account_auths
              }
              posting {
                key_auths
                weight_threshold
                account_auths
              }
              active {
                key_auths
                weight_threshold
                account_auths
              }
              memo_key
              json_metadata {
                name
                location
                about
                profile_image
                cover_image
                website
              }
              proxy
              last_owner_update
              reset_account
              created
              mined
              recovery_account
              last_account_recovery
              reset_account
              comment_count
              lifetime_vote_count
              post_count
              can_vote
              voting_manabar {
                current_mana
                last_update_time
              }
              voting_power
              balance
              savings_balance
              vsd_balance
              vsd_seconds
              vsd_seconds_last_update
              vsd_last_interest_payment
              savings_vsd_seconds_last_update
              savings_vsd_last_interest_payment
              savings_withdraw_requests
              reward_vsd_balance
              reward_voilk_balance
              reward_coining_voilk
              coining_shares
              delegated_coining_shares
              received_coining_shares
              coining_withdraw_rate
              next_coining_withdrawal
              withdrawn
              to_withdraw
              withdraw_routes
              curation_rewards
              posting_rewards
              proxied_vsf_votes
              witnesses_voted_for
              last_post
              last_root_post
              last_vote_time
              post_bandwidth
              pending_claimed_accounts
              average_bandwidth
              lifetime_bandwidth
              last_bandwidth_update
              average_market_bandwidth
              lifetime_market_bandwidth
              last_market_bandwidth_update
              coining_balance
              reputation
              witness_votes
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Loading
                header={false}
                color={"white"}
                message={"Fetching User Data..."}
              />
            );
          if (error) return <p>Error :(</p>;
          
          if (data.account === null) {
            return (
              <Notification
                message={"User Not found .."}
                color={"while"}
                header={false}
              />
            );
          }
          let impressions = [];
          for(let advert of this.props.info.ads){
            for(let impression of advert.ad_impressions){
              impressions.push(impression);
            }
          }
          let clicks = [];
          for(let advert of this.props.info.ads){
            for(let cl of advert.ad_clicks){
              clicks.push(cl);
            }
          }
          //console.log(this.props.info.ads);
          return (
            <React.Fragment>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={12}>
                      <StatsPanel>
                        <AdsCount count={this.props.info.ads.length} />
                        <Impressions count={impressions.length}/>
                        <Balance count={clicks.length}/>
                        <AdCredits count={this.props.info.credit}/>
                      </StatsPanel>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4} xs={12}>
                        <Card className="card-user">
                          <div className="image">
                            <img
                              src={data.account.json_metadata==undefined?"":data.account.json_metadata.cover_image}
                              alt="..."
                            />
                          </div>
                          <CardBody>
                            <CardAuthor
                              avatar={data.account.json_metadata==undefined?"":data.account.json_metadata.profile_image}
                              avatarAlt="..."
                              title={data.account.name}
                              description={data.account.json_metadata==undefined?"":data.account.json_metadata.name}
                            />
                            <p className="description text-center">
                              {data.account.json_metadata==undefined?"":data.account.json_metadata.about}
                            </p>
                          </CardBody>
                        </Card>
                        <InfoBar
                          color={"primary"}
                          icon={"fas fa-funnel-dollar"}
                          info={"VSD"}
                          stats={data.account.vsd_balance}
                        />
                        <InfoBar
                          color={"primary"}
                          icon={"fas fa-coins"}
                          info={"Balance"}
                          stats={data.account.balance}
                        />
                        <InfoBar
                          color={"primary"}
                          icon={"now-ui-icons business_bank"}
                          info={"Vested"}
                          stats={data.account.coining_shares}
                        />
                        <InfoBar
                          color={"primary"}
                          icon={"now-ui-icons ui-2_chat-round"}
                          info={data.account.post_count}
                          stats={"Posts Count"}
                        />
                      </Col>
                      <Col md={8} xs={24}>
                        <div className="card ">
                          <div className="card-header ">
                            <h4 className="card-title">
                              <small className="description">
                                Advertisements Feed
                              </small>
                            </h4>
                          </div>
                          <div className="card-body ">
                            <ul
                              className="nav nav-pills nav-pills-primary"
                              role="tablist"
                            >
              
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  data-toggle="tab"
                                  href="#link1"
                                  role="tablist"
                                >
                                  Recent Impressions
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  data-toggle="tab"
                                  href="#link2"
                                  role="tablist"
                                >
                                  Recent Clicks
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content tab-space">
                              <div className="tab-pane active" id="link1">
                                <Card>
                                  <CardHeader>
                                    <CardCategory>
                                      Recent Impressions
                                    </CardCategory>
                                    <CardTitle tag="h4">
                                      Recent <Badge color={"success"}>100</Badge>{" "}
                                      Impressions
                                    </CardTitle>
                                  </CardHeader>
                                  <CardBody>
                                    {this.get_impressions(this.props.info.ads)}
                                  </CardBody>
                                </Card>
                              </div>
                              <div className="tab-pane" id="link2">
                                <Card>
                                  <CardHeader>
                                    <CardCategory>
                                      Recent Clicks
                                    </CardCategory>
                                    <CardTitle tag="h4">
                                      Recent <Badge color={"success"}>100</Badge>{" "}
                                      Clicks
                                    </CardTitle>
                                  </CardHeader>
                                  <CardBody>
                                    {this.get_clicks(this.props.info.ads)}
                                  </CardBody>
                                </Card>
                              </div>
                            
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
Member.propTypes = {
  info: PropTypes.object
};
export default Member;
