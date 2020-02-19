import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default class CardItem extends Component {
  render() {
    return (
      <Card className="card" variant="outlined">
        <CardContent>
          <Typography variant="h5" color="textSecondary">
            {this.props.title}
          </Typography>
          <Typography variant="h2" component="p">
            {this.props.value}
          </Typography>
        </CardContent>
        <Grid
          className="d-flex justify-content-end h-100 align-items-end"
          color="textPrimary"
        >
          <Grid item>{this.props.action} </Grid>
        </Grid>
      </Card>
    );
  }
}
