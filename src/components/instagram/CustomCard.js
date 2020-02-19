import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ButtonToolbar,
  Button,
  Card,
  Badge
} from "react-bootstrap";
import "./GADash.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faUsers,
  faHourglassHalf,
  faUserClock,
  faMouse,
  faCalculator,
  faChartBar
} from "@fortawesome/free-solid-svg-icons";

library.add(fab);

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card className="Card" border="info" style={{ width: "17rem" }}>
        <div className="CardFab">
          <FontAwesomeIcon icon={faUsers} size="2x" />
        </div>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <h1>{this.props.value}</h1>
        </Card.Body>
      </Card>
    );
  }
}
