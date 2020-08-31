import React, { Component } from "react";
import PropTypes from "prop-types";
import { CardCategory, PanelHeader } from "../index";
import { Badge, Card, CardBody, CardHeader } from "reactstrap";
import NotificationAlert from "react-notification-alert";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }
  onDismiss() {}
  notify(place, color, msg) {
    var type = color;
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{msg}</div>
        </div>
      ),
      type: type,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  }
  render() {
    return (
      <React.Fragment>
        <NotificationAlert ref="notificationAlert" />
        {this.props.header ? <PanelHeader size={"sm"} /> : null}
        <div
          className={"content text-center"}
          style={{ backgroundColor: "white" }}
        >
          <Card>
            <CardHeader>
              <CardCategory>Query Complete...</CardCategory>
            </CardHeader>
            <CardBody>
              <br />
              <Badge color={"warning"}>
                <i className="fas fa-bell" /> {this.props.message}
              </Badge> <br/>
              <a href={"/dashboard"}>click here</a> {" and go back to home"}
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

Notification.propTypes = {
  place: PropTypes.string,
  color: PropTypes.string,
  message: PropTypes.message,
  header: PropTypes.bool
};

export default Notification;
