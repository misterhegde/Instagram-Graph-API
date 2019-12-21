import React, { Component } from "react";
import axios from "axios";

class GraphMetrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graphData: []
    };
  }

  componentDidMount() {
    this.getUserProfileViewsWebsiteClickReachAndImpressoins = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=profile_views,website_clicks,reach,impressions,email_contacts,get_directions_clicks,phone_call_clicks,website_clicks,text_message_clicks&period=day&access_token=${this.props.accessToken}`
        )
        .then(res => {
          let graphData = res.data.data;
          this.setState({ graphData: graphData });
          console.log("this should be from state graph", this.state.graphData);
          console.log("this should be impressons database", res);
        });
    };

    this.getUserWeekpressions = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=impressions&period=week&access_token=${this.props.accessToken}`
        )
        .then(res => {
          //let graphData = res.data.data;
          //this.setState({ graphData: graphData });
          console.log("week impresions", res);
        });
    };

    this.getUserMonthImpressions = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=impressions&period=days_28&access_token=${this.props.accessToken}`
        )
        .then(res => {
          //let graphData = res.data.data;
          //this.setState({ graphData: graphData });
          console.log("month impressions", res);
        });
    };

    this.getUserWeekReach = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=reach&period=week&access_token=${this.props.accessToken}`
        )
        .then(res => {
          //let graphData = res.data.data;
          //this.setState({ graphData: graphData });
          console.log("week reach", res);
        });
    };

    this.getUserMonthReach = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=reach&period=days_28&access_token=${this.props.accessToken}`
        )
        .then(res => {
          //let graphData = res.data.data;
          //this.setState({ graphData: graphData });
          console.log("month reach", res);
        });
    };

    this.getUserProfileViews = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=profile_views&period=days&access_token=${this.props.accessToken}`
        )
        .then(res => {
          //let graphData = res.data.data;
          //this.setState({ graphData: graphData });
          console.log("profile views. Period: day", res);
        });
    };

    this.getUserWebsiteClicks = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=website_clicks&period=days&access_token=${this.props.accessToken}`
        )
        .then(res => {
          //let graphData = res.data.data;
          //this.setState({ graphData: graphData });
          console.log("Website clicks. Period: day", res);
        });
    };
  }

  render() {
    return (
      <div>
        <button
          className="btnmaterial"
          onClick={() =>
            this.getUserProfileViewsWebsiteClickReachAndImpressoins(this.props)
          }
        >
          click here to get Profile views, Website clicks, Reach, Impressions
        </button>
        <br />
        <br />

        <button
          className="btnmaterial"
          onClick={() => this.getUserWeekpressions(this.props)}
        >
          click here to get Week Impressions
        </button>

        <button
          className="btnmaterial"
          onClick={() => this.getUserMonthImpressions(this.props)}
        >
          click here to get Month Impressions
        </button>
        <br />
        <br />

        <button
          className="btnmaterial"
          onClick={() => this.getUserWeekReach(this.props)}
        >
          click here to get Week Reach
        </button>

        <button
          className="btnmaterial"
          onClick={() => this.getUserMonthReach(this.props)}
        >
          click here to get Month Reach
        </button>
        <br />
        <br />

        <button
          className="btnmaterial"
          onClick={() => this.getUserProfileViews(this.props)}
        >
          click here to get Profile views
        </button>
        <br />
        <br />

        <button
          className="btnmaterial"
          onClick={() => this.getUserWebsiteClicks(this.props)}
        >
          click here to get Website Clicks
        </button>
        <br />
        <br />
        {/* <ul>
          {this.state.graphData.map(details => {
            return (
              <div className="display-2 text-primary" key={details.id}>
                <p>
                  {details.name}:
                  {details.values.map((some, index) => {
                    return some.value;
                  })}
                </p>
              </div>
            );
          })}
        </ul> */}
      </div>
    );
  }
}

export default GraphMetrics;
