import React, { Fragment } from "react";

import { PanelHeader } from "components";
import NotificationAlert from "react-notification-alert";
import Cookies from 'universal-cookie';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "../../components/Loading/Loading";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DoughNut from "./DoughNut";
import BubbleChart from "./BubbleChart";
import PieChart from "./PieChart";
import PolarChart from "./PolarChart";
class Reports extends React.Component {
    constructor(props) {
        super(props);
        let cookies = new Cookies();
        this.state = {
            username: cookies.get("VOILK_USERNAME"),
            privatekey: cookies.get("VOILK_POSTING"),
            posting_pubkey: cookies.get("VOILK_POSTINGPUB"),
            all: true
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.notify = this.notify.bind(this);
    }

    isLoggedIn = () => {
        // let cookies = new Cookies();
        // this.setState({
        //   username: cookies.get("VOILK_USERNAME"),
        //   privatekey: cookies.get("VOILK_POSTING"),
        //   posting_pubkey: cookies.get("VOILK_POSTINGPUB")
        // });
        console.log(this.state.username);
        if (this.state.username == "null" ||
            this.state.privatekey == "null" ||
            this.state.posting_pubkey == "null" ||
            this.state.username == undefined ||
            this.state.posting_pubkey == undefined ||
            this.state.privatekey == undefined
        ) {
            window.location.href = "/login"
        }
    }

    onDismiss() { }
    notify(place, msg) {
        var color = Math.floor(Math.random() * 5 + 1);
        var type;
        switch (color) {
            case 1:
                type = "primary";
                break;
            case 2:
                type = "success";
                break;
            case 3:
                type = "danger";
                break;
            case 4:
                type = "warning";
                break;
            case 5:
                type = "info";
                break;
            default:
                break;
        }
        type = "info";
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    {msg}
                </div>
            ),
            type: type,
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 10
        };
        this.refs.notificationAlert.notificationAlert(options);
    }

    render() {
        let all, advert_id, query_id;
        if (this.props.match.params.advert_id === undefined) {
          console.log(this.props.match.params)
          all = true;
        } else {
          advert_id = this.props.match.params.advert_id;
          console.log(this.props.match.params)
          all = false;
        }
        
        return (
            <React.Fragment>
                {this.isLoggedIn()}
                <PanelHeader size="sm" />
                <div className="content">
                    <NotificationAlert ref="notificationAlert" />
                    <div class="row">
                        <div class="col-md-12 ml-auto">
                            <div className="card">
                                <div class="card-header">
                                    <h5 class="card-category">Reports Data</h5>
                                    <h4 class="card-title">Impressions Reports</h4>
                                </div>
                                <div className="card-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <Query query={gql`
                                        {
                                            get_impressions_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}",
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "geoplugin_countryName"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <LineChart
                                                                title={"Impressions by Countries"}
                                                                tablelabel={"Country"}
                                                                label={"Impressions"}
                                                                data={data.get_impressions_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                        <div class="col-md-4">
                                            <Query query={gql`
                                        {
                                            get_impressions_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "geoplugin_regionName"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <BarChart
                                                                title={"Impressions by Regions"}
                                                                tablelabel={"Region"}
                                                                label={"Impressions"}
                                                                data={data.get_impressions_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                        <div class="col-md-4">
                                            <Query query={gql`
                                        {
                                            get_impressions_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "geoplugin_timezone"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <LineChart
                                                                title={"Impressions by TimeZones"}
                                                                tablelabel={"Time Zone"}
                                                                label={"Impressions"}
                                                                data={data.get_impressions_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                            
                                    </div>
                                    <div className="row">
                                        <div class="col-md-8">
                                            <Query query={gql`
                                        {
                                            get_impressions_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "ad_url"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <LineChart
                                                                title={"Impressions by Post Link"}
                                                                tablelabel={"Post Links"}
                                                                label={"Impressions"}
                                                                data={data.get_impressions_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                        <div class="col-md-4">
                                            <Query query={gql`
                                        {
                                            get_impressions_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "geoplugin_currencyCode"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <PolarChart
                                                                title={"Impressions by Currency"}
                                                                tablelabel={"Currencies"}
                                                                label={"Impressions"}
                                                                data={data.get_impressions_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                    </div>
                                    <div className="row">
                                       <div class="col-md-4">
                                            <Query query={gql`
                                        {
                                            get_impressions_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "geoplugin_city"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <LineChart
                                                                title={"Impressions by City"}
                                                                tablelabel={"City"}
                                                                label={"Impressions"}
                                                                data={data.get_impressions_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                       <div class="col-md-4">
                                            <Query query={gql`
                                        {
                                            get_impressions_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "ad_browser"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <LineChart
                                                                title={"Impressions by Browsers"}
                                                                tablelabel={"Browser"}
                                                                label={"Impressions"}
                                                                data={data.get_impressions_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                       <div class="col-md-4">
                                            <Query query={gql`
                                        {
                                            get_impressions_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "ad_platform"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <BarChart
                                                                title={"Impressions by Operating system"}
                                                                tablelabel={"Operating system"}
                                                                label={"Impressions"}
                                                                data={data.get_impressions_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div> 
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="card">
                                <div class="card-header">
                                    <h5 class="card-category">Reports Data</h5>
                                    <h4 class="card-title">Clicks Reports</h4>
                                </div>
                                <div className="card-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <Query query={gql`
                                        {
                                            get_clicks_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "geoplugin_countryName"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <LineChart
                                                                title={"Clicks by Countries"}
                                                                tablelabel={"Country"}
                                                                label={"Clicks"}
                                                                data={data.get_clicks_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                        <div class="col-md-4">
                                            <Query query={gql`
                                        {
                                            get_clicks_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "geoplugin_regionName"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <LineChart
                                                                title={"Clicks by Regions"}
                                                                tablelabel={"Region"}
                                                                label={"Clicks"}
                                                                data={data.get_clicks_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                        <div class="col-md-4">
                                            <Query query={gql`
                                        {
                                            get_clicks_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "geoplugin_timezone"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <LineChart
                                                                title={"Clicks by TimeZones"}
                                                                tablelabel={"Time Zone"}
                                                                label={"Clicks"}
                                                                data={data.get_clicks_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                            
                                    </div>
                                    <div className="row">
                                        <div class="col-md-3">
                                            <Query query={gql`
                                        {
                                            get_clicks_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "ad_platform"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <LineChart
                                                                title={"Clicks by Operating system"}
                                                                tablelabel={"Operating system"}
                                                                label={"Clicks"}
                                                                data={data.get_clicks_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                        <div class="col-md-6">
                                            <Query query={gql`
                                        {
                                            get_clicks_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "ad_url"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <LineChart
                                                                title={"See from which posts you are receiving visitors"}
                                                                tablelabel={"Post Links"}
                                                                label={"Clicks"}
                                                                data={data.get_clicks_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                        <div class="col-md-3">
                                            <Query query={gql`
                                        {
                                            get_clicks_report_by(username: "${this.state.username}",
                                            wif: "${this.state.privatekey}"
                                            all: ${all},
                                            advert_id: "${advert_id}",
                                            criteria: "ad_browser"){
                                            count
                                            result
                                            }
                                        }
                                    `}
                                            >
                                                {({ loading, error, data }) => {
                                                    if (loading) return <Loading message={"Loading Transactions..."} color={"info"} />;
                                                    if (error) return <p>Error :(</p>;
                                                    return (
                                                        <div>
                                                            <LineChart
                                                                title={"Clicks by Browser"}
                                                                tablelabel={"Browser"}
                                                                label={"Clicks"}
                                                                data={data.get_clicks_report_by} />

                                                        </div>
                                                    )
                                                }}
                                            </Query>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </React.Fragment>
        );
    }
}

export default Reports;
