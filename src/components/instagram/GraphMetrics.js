import React, { Component } from "react";
import axios from "axios";
// import IconButton from "@material-ui/core/IconButton";
// import CardItem from "./Card";

//import { BrowserRouterasRouter } from "react-router-dom";
// import InstagramIcon from "@material-ui/icons/Instagram";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Cards from "./CustomCard";

class GraphMetrics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      impressionDataDay: "",
      impressionDataWeek: "",
      impressionDataMonth: "",
      reachDataWeek: "",
      reachDataMonth: "",
      profileViews: "",
      websiteClicks: "",
      emailContacts: "",
      phoneCallClicks: "",
      textMessageClicks: "",
      followCount: "",
      getDirectionClicks: "",
      followersCount: this.props.followersCount
    };
  }

  componentDidMount() {
    this.getUserDayImpressions = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=impressions&period=day&access_token=${this.props.accessToken}`
        )
        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ impressionDataDay: val });

          console.log("week impressions", this.state.impressionDataWeek);
        });
    };

    this.getUserWeekImpressions = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=impressions&period=week&access_token=${this.props.accessToken}`
        )
        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ impressionDataWeek: val });

          console.log("week impressions", this.state.impressionDataWeek);
        });
    };

    this.getUserMonthImpressions = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=impressions&period=days_28&access_token=${this.props.accessToken}`
        )

        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ impressionDataMonth: val });
        });
    };

    this.getUserWeekReach = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=reach&period=week&access_token=${this.props.accessToken}`
        )
        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ reachDataWeek: val });
        });
    };

    this.getUserMonthReach = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=reach&period=days_28&access_token=${this.props.accessToken}`
        )
        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ reachDataMonth: val });
        });
    };

    this.getUserProfileViews = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=profile_views&period=day&access_token=${this.props.accessToken}`
        )
        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ profileViews: val });
        });
    };

    this.getUserWebsiteClicks = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=website_clicks&period=day&access_token=${this.props.accessToken}`
        )
        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ websiteClicks: val });
        });
    };

    this.getUserEmailContacts = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=email_contacts&period=day&access_token=${this.props.accessToken}`
        )
        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ emailContacts: val });

          console.log("email contacts", this.state.emailContacts);
        });
    };

    this.getUserPhoneCallClicks = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=phone_call_clicks&period=day&access_token=${this.props.accessToken}`
        )
        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ phoneCallClicks: val });

          console.log("phone call clicks", this.state.phoneCallClicks);
        });
    };

    this.getUserTextMessageClicks = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=text_message_clicks&period=day&access_token=${this.props.accessToken}`
        )
        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ textMessageClicks: val });

          console.log("textMessageClicks", this.state.textMessageClicks);
        });
    };

    this.getUserFollowCount = props => {
      //Total no. of new followers each day
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=follower_count&period=day&access_token=${this.props.accessToken}`
        )
        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ followCount: val });

          console.log("followCount", this.state.followCount);
        });
    };

    this.getUserDirectionClicks = props => {
      axios
        .get(
          `https://graph.facebook.com/${this.props.businessAccountId}/insights?metric=get_directions_clicks&period=day&access_token=${this.props.accessToken}`
        )
        .then(res => {
          return res.data.data[0].values[0];
        })
        .then(val => {
          this.setState({ getDirectionClicks: val });

          console.log("getDirectionClicks", this.state.getDirectionClicks);
        });
    };

    this.getAudienceGrowthRate = props => {
      console.log(
        "AGR",
        (this.state.followCount / this.props.followersCount) * 100
      );
    };

    this.getClickThroughRate = props => {
      console.log(
        "CTR",
        (this.state.websiteClicks / this.props.impressionDataDay) * 100
      );
    };
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <MDBContainer>
          <MDBRow>
            <MDBCol size="4">
              <button
                className="btnmaterial"
                onClick={() => this.getUserDayImpressions(this.props)}
              >
                Day Impressions
              </button>
              {this.state.impressionDataDay ? (
                <div>
                  {/* className="text-info h1 cardPosition" */}
                  {/* <CardItem
                      title="Day Impressions"
                      value={this.state.impressionDataDay.value}
                      action={<IconButton></IconButton>}
                    /> */}
                  <Cards
                    title="day impressions"
                    value={this.state.impressionDataDay.value}
                  />
                </div>
              ) : null}
            </MDBCol>
            <br />
            <br />
            <MDBCol size="4">
              <button
                className="btnmaterial"
                onClick={() => this.getUserWeekImpressions(this.props)}
              >
                Week Impressions
              </button>
              {this.state.impressionDataWeek ? (
                <div>
                  {/* <CardItem
                    title="Week Impressions"
                    value={this.state.impressionDataWeek.value}
                    action={<IconButton></IconButton>}
                  /> */}
                  <Cards
                    title="Week Impressions"
                    value={this.state.impressionDataWeek.value}
                  />
                </div>
              ) : null}
            </MDBCol>
            <br /> <br />
            <MDBCol size="4">
              <button
                className="btnmaterial"
                onClick={() => this.getUserMonthImpressions(this.props)}
              >
                Month Impressions
              </button>
              {this.state.impressionDataMonth ? (
                <div>
                  {/* <CardItem
                    title="Month Impressions"
                    value={this.state.impressionDataMonth.value}
                    action={<IconButton></IconButton>}
                  /> */}
                  <Cards
                    title="Month Impressions"
                    value={this.state.impressionDataMonth.value}
                  />
                </div>
              ) : null}
            </MDBCol>
          </MDBRow>
          <br />
          <br />
          <MDBRow>
            <MDBCol size="4">
              {" "}
              <button
                className="btnmaterial"
                onClick={() => this.getUserWeekReach(this.props)}
              >
                Week Reach
              </button>
              {this.state.reachDataWeek ? (
                <div>
                  {/* <CardItem
                    title="Week Reach"
                    value={this.state.reachDataWeek.value}
                    action={<IconButton></IconButton>}
                  /> */}
                  <Cards
                    title="Week Reach"
                    value={this.state.reachDataWeek.value}
                  />
                </div>
              ) : null}
            </MDBCol>
            <br /> <br />
            <MDBCol size="4">
              <button
                className="btnmaterial"
                onClick={() => this.getUserMonthReach(this.props)}
              >
                Month Reach
              </button>
              {this.state.reachDataMonth ? (
                <div>
                  {/* <CardItem
                    title="Month Reach"
                    value={this.state.reachDataMonth.value}
                    action={<IconButton></IconButton>}
                  /> */}
                  <Cards
                    title="Month Reach"
                    value={this.state.reachDataMonth.value}
                  />
                </div>
              ) : null}
            </MDBCol>
            <br />
            <br />
            <MDBCol size="4">
              {" "}
              <button
                className="btnmaterial"
                onClick={() => this.getUserProfileViews(this.props)}
              >
                Profile views
              </button>{" "}
              {this.state.profileViews ? (
                <div>
                  {/* <CardItem
                    title="Profile views"
                    value={this.state.profileViews.value}
                    action={<IconButton></IconButton>}
                  /> */}
                  <Cards
                    title="Profile views"
                    value={this.state.profileViews.value}
                  />
                </div>
              ) : null}
            </MDBCol>
          </MDBRow>
          <br />
          <br />
          <MDBRow>
            <MDBCol size="4">
              <button
                className="btnmaterial"
                onClick={() => this.getUserWebsiteClicks(this.props)}
              >
                Website Clicks
              </button>

              {this.state.websiteClicks ? (
                <div>
                  {/* <CardItem
                    title="Website Clicks"
                    value={this.state.websiteClicks.value}
                    action={<IconButton></IconButton>}
                  /> */}
                  <Cards
                    title="Website Clicks"
                    value={this.state.websiteClicks.value}
                  />
                </div>
              ) : null}
            </MDBCol>
            <br />
            <br />
            <MDBCol size="4">
              <button
                className="btnmaterial"
                onClick={() => this.getUserEmailContacts(this.props)}
              >
                Email Contacts
              </button>
              {this.state.emailContacts ? (
                <div>
                  {/* <CardItem
                    title="Email Contacts"
                    value={this.state.emailContacts.value}
                    action={<IconButton></IconButton>}
                  /> */}
                  <Cards
                    title="Email Contacts"
                    value={this.state.emailContacts.value}
                  />
                </div>
              ) : null}
            </MDBCol>

            <br />
            <br />
            <MDBCol size="4">
              <button
                className="btnmaterial"
                onClick={() => this.getUserPhoneCallClicks(this.props)}
              >
                Phone Call Clicks
              </button>
              {this.state.phoneCallClicks ? (
                <div>
                  {/* <CardItem
                    title="Phone Call Clicks"
                    value={this.state.phoneCallClicks.value}
                    action={<IconButton></IconButton>}
                  /> */}
                  <Cards
                    title="Phone Call Clicks"
                    value={this.state.phoneCallClicks.value}
                  />
                </div>
              ) : null}
            </MDBCol>
          </MDBRow>

          <br />
          <br />
          <MDBRow>
            <MDBCol size="4">
              <button
                className="btnmaterial"
                onClick={() => this.getUserTextMessageClicks(this.props)}
              >
                Text Message Clicks
              </button>
              {this.state.textMessageClicks ? (
                <div>
                  {/* <CardItem
                    title="Text Message Clicks"
                    value={this.state.textMessageClicks.value}
                    action={<IconButton></IconButton>}
                  /> */}
                  <Cards
                    title="Text Message Clicks"
                    value={this.state.textMessageClicks.value}
                  />
                </div>
              ) : null}
            </MDBCol>
            <br />
            <br />
            <MDBCol size="4">
              <button
                className="btnmaterial"
                onClick={() => this.getUserFollowCount(this.props)}
              >
                Follower Count
              </button>
              {this.state.followCount ? (
                <div>
                  {/* <CardItem
                    title="Follower Count"
                    value={this.state.followCount.value}
                    action={<IconButton></IconButton>}
                  /> */}
                  <Cards
                    title="Follower Count"
                    value={this.state.followCount.value}
                  />
                </div>
              ) : null}
            </MDBCol>
            <br />
            <br />
            <MDBCol size="4">
              <button
                className="btnmaterial"
                onClick={() => this.getUserDirectionClicks(this.props)}
              >
                Directions Clicks
              </button>
              {this.state.getDirectionClicks ? (
                <div>
                  {/* <CardItem
                    title="Direction Clicks"
                    value={this.state.getDirectionClicks.value}
                    action={<IconButton></IconButton>}
                  /> */}
                  <Cards
                    title="Direction Clicks"
                    value={this.state.getDirectionClicks.value}
                  />
                </div>
              ) : null}
            </MDBCol>
          </MDBRow>
          <br />
          <br />
          <MDBRow>
            <MDBCol size="4">
              {this.state.followCount ? (
                // <div className="text-info h1">
                //   {" "}
                //   Audience Growth Rate:{" "}
                //   {(this.state.followCount / this.props.followersCount) * 100} %
                // </div>
                <Cards
                  title="Audience Growth Rate"
                  value={
                    (this.state.followCount / this.props.followersCount) * 100
                  }
                />
              ) : null}{" "}
            </MDBCol>

            <br />
            <MDBCol size="4">
              {this.state.followCount && this.state.impressionDataDay ? (
                // <div className="text-info h1">
                //   {" "}
                //   Click Through Rate:{" "}
                //   {(this.state.websiteClicks / this.state.impressionDataDay) *
                //     100}{" "}
                //   %
                // </div>
                <Cards
                  title="Click Through Rate"
                  value={
                    (this.state.websiteClicks / this.state.impressionDataDay) *
                    100
                  }
                />
              ) : null}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default GraphMetrics;
