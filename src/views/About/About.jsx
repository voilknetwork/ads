import React from "react";

import { PanelHeader } from "components";

import { CardCategory } from "components";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import UserLink from "../Member/UserLink";
import ImpRecorder from "../../components/ImpRecorder/ImpRecorder";
import Cookies from 'universal-cookie';
require("isomorphic-fetch");
class About extends React.Component {

  render() {
    return (
      <React.Fragment>
        <PanelHeader size="sm" />
        <div className="content">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardCategory>Created with 💖</CardCategory>
            </CardHeader>
            <CardBody>
              <p>
                This Advertising network was made with 💖 by{" "}
                <UserLink author={"bilalhaider"} />{" "}
              </p>
              <div>
                Technologies used,
                <ul>
                  <li>
                    MongoDB
                  </li>
                  <li>Apollo</li>
                  <li>Graphql</li>
                  <li>Now ui Dashboard Pro from Creative-tim</li>
                  <li>Love 💖</li>
                </ul>
              </div>
              <p>bilal_haider032@yahoo.com</p>
              <p>+923162494001</p>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default About;
