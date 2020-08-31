import React, { Component, Fragment } from 'react';
import { PanelHeader } from "components";
import NotificationAlert from "react-notification-alert";
import Cookies from 'universal-cookie';
import {
    Card,
    CardBody,
} from "reactstrap";
require("isomorphic-fetch");

class CreateAdvert extends Component {
    constructor(props) {
        super(props);
        let cookies = new Cookies();
        this.state = {
            username: cookies.get("VOILK_USERNAME"),
            privatekey: cookies.get("VOILK_POSTING"),
            posting_pubkey: cookies.get("VOILK_POSTINGPUB"),
            option0: "125x125",
            option1: "468x60",
            option2: "250x250",
            option3: "728x90",
            option4: "120x600",
            option5: "160x600"
        };
        this.onDismiss = this.onDismiss.bind(this);
        this.notify = this.notify.bind(this);
    }

    state = {
        image: "",
        size: "",
        width: "",
        height: "",
        link: "",
        type: "IMAGE",
        error: "",
        selectvalidity: false,
        imagevalidity: false,
        linkvalidity: false,
        validated: false,
        option0: "125x125",
        option1: "468x60",
        option2: "250x250",
        option3: "728x90",
        option4: "120x600",
        option5: "160x600",
        key: "0"
    }
    change(e) {
        let size = e.target.value.split("x");
        this.setState({ width: size[0], height: size[1] });
        this.setState({ size: e.target.value, selectvalidity: true })
    }
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
    checkImage(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    handleimage(e) {
        console.log(e.target)
        if (this.validURL(e.target.value) && this.checkImage(e.target.value)) {
            this.setState({ image: e.target.value, imagevalidity: true, error: "" })
        }
        else {
            this.setState({ image: "#", imagevalidity: false, error: "Only jpeg, jpg, gif, png supported" })
        }
    }
    handlelink(e) {
        if (this.validURL(e.target.value)) {
            this.setState({ link: e.target.value, linkvalidity: true, error: " " })
        }
        else {
            this.setState({ link: "#", linkvalidity: false, error: "Not a valid link" })
        }
    }
    handleclick(e) {
        e.preventDefault();
        this.setState({ error: "Kindly wait while we Create an Advert for you" })
        
        if (this.state.linkvalidity && this.state.imagevalidity && this.state.selectvalidity) {
            this.notify("tr", (<div> Kindly don't close your browser - <b>while we are creating the advert</b> </div>))
            this.setState({ validated: true, error: "Your information is validated" })
            console.log(this.state.privatekey)
            console.log(this.state.username)
            let imglink = this.state.image;
            let trglink = this.state.link;
            console.log(imglink);
            console.log(trglink);
            fetch('https://graphql.voilk.com/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: '{ create_advert (username: "' + this.state.username + '", wif: "' + this.state.privatekey + '", size: "' + this.state.size + '", image_link: "' + imglink + '", target_link: "' + trglink + '") { error nMatched nModified nUpserted } }' })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.data.create_advert !== null) {
                        if (res.data.create_advert.nModified == 1) {
                            this.notify("tr", (<div> Your Advert was successfully Created!! </div>))
                            window.location.href = "/manage";
                        }
                        else {
                            this.notify("tr", (<div> Your advert was not created.. try again</div>));
                        }
                    }
                })
        }
        else {
            this.setState({ validated: false, error: "There is some error in your selection" })
            this.notify("tr", (<div> There is some error in your selection - fill form carefully</div>))
        }
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
        return (
            <Fragment>
                <PanelHeader size="sm" />
                <div className="content">
                    <Card>
                        <CardBody>
                            <NotificationAlert ref="notificationAlert" />
                            <div className="row">
                                <div class="card ">
                                    <div class="card-header ">
                                        <h4 class="card-title">Create Advertisement</h4>
                                    </div>
                                    <div class="card-body ">
                                        <form method="get" action="/" class="form-horizontal">
                                            <div class="row">
                                                <label class="col-sm-2 col-form-label">Advert Type</label>
                                                <div class="col-sm-10">
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" value="IMAGE" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <label class="col-sm-2 col-form-label">Advert Size</label>
                                                <div class="form-group col-lg-5 col-md-6 col-sm-3">
                                                    <select
                                                        className={"selectpicker"}
                                                        data-size="5"
                                                        data-style="btn btn-info btn-round"
                                                        title="Select Size"
                                                        onChange={this.change.bind(this)}
                                                        value={this.state.size}
                                                    >
                                                        <option value="" disabled>Select Size</option>
                                                        <option value={this.state.option1}>{this.state.option1}</option>
                                                        <option value={this.state.option0}>{this.state.option0}</option>
                                                        <option value={this.state.option2}>{this.state.option2}</option>
                                                        <option value={this.state.option3}>{this.state.option3}</option>
                                                        <option value={this.state.option4}>{this.state.option4}</option>
                                                        <option value={this.state.option5}>{this.state.option5}</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <label class="col-sm-2 col-form-label">Advert Image</label>
                                                <div class="col-sm-10">
                                                    <div class="form-group">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            placeholder="Paste your image link here"
                                                            onChange={this.handleimage.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <label class="col-sm-2 col-form-label">Advert Target</label>
                                                <div class="col-sm-10">
                                                    <div class="form-group">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            placeholder="Paste your target link here"
                                                            onChange={this.handlelink.bind(this)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label class="col-sm-2 col-form-label"></label>
                                                <div class="col-sm-10">
                                                    <button class="btn btn-large btn-info" onClick={this.handleclick.bind(this)}>Create Advert</button>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <label class="col-sm-2 col-form-label"></label>
                                                <div class="col-sm-10">
                                                    <p style={{ color: this.state.validated ? "green" : "red" }}>{this.state.error}</p>
                                                    <a href={this.state.link}><img src={this.state.image} height={this.state.height + " px"} width={this.state.width + " px"} /></a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Fragment>
        );
    }
}

export default CreateAdvert;