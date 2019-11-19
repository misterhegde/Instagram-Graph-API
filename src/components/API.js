import React, { Component } from "react";
import axios from "axios";
import { ProductConsumer } from "../context";

class API extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaData: [],
      profileId: "",
      userMetrics: []
    };
  }

  getPageDetails = props => {
    axios
      .get(
        `https://graph.facebook.com/v5.0/me/accounts?access_token=${this.props.accessToken}`
      )
      .then(res => {
        console.log(res.data);
        let pageid = res.data.data
          .map(item => {
            return item.id;
          })
          .toString();
        console.log("this is facebook page's id: ", pageid);
        this.getIgDetails(this.props.accessToken, pageid);
      });
  };

  getIgDetails = (accessToken, pageid) => {
    axios
      .get(
        `https://graph.facebook.com/v5.0/${pageid}?fields=instagram_business_account&access_token=${accessToken}`
      )
      .then(res => {
        //console.log(res);
        let instagram_business_account_id =
          res.data.instagram_business_account.id;
        console.log(
          "this is the instagram business acc id: ",
          instagram_business_account_id
        );
        this.getMediaDetails(instagram_business_account_id, accessToken);
      });
  };

  getMediaDetails = (instagram_business_account_id, accessToken) => {
    axios
      .get(
        `https://graph.facebook.com/v5.0/${instagram_business_account_id}/media?access_token=${accessToken}`
      )
      .then(res => {
        console.log(res);
        let media_data = res.data.data.map(item => {
          return item.id;
        });
        console.log(media_data);
        this.setState(
          {
            mediaData: media_data,
            profileId: instagram_business_account_id
          },
          () => console.log(this.state)
        );
        //console.log(media_data[0]);
      });
  };

  getUserMetrics = props => {
    axios
      .get(
        `https://graph.facebook.com/v3.2/${this.state.profileId}?fields=name,biography,profile_picture_url,followers_count,follows_count&access_token=${this.props.accessToken}`
      )
      .then(res => {
        const userMetrics = res.data;
        this.setState({ userMetrics });
        console.log(userMetrics);
      });
  };

  render() {
    const media_data = this.state.mediaData;
    return (
      <div>
        <button
          className="btn btn-primary"
          onClick={() => this.getPageDetails(this.props)}
        >
          click here to get page details
        </button>

        <br />
        <br />
        <ProductConsumer>
          {value => (
            <button
              onClick={() =>
                value.setMediaState(media_data, this.state.profileId)
              }
            >
              SetState
            </button>
          )}
        </ProductConsumer>
        <br />

        <button
          className="btn btn-primary"
          onClick={() => this.getUserMetrics(this.props)}
        >
          Click this to get User's metrics
        </button>
        <div>
          <img
            src={this.state.userMetrics.profile_picture_url}
            width="200"
            height="200"
            alt="profile display"
          />
        </div>

        <div className="display-2 text-primary">
          {" "}
          Name: {this.state.userMetrics.name}
        </div>
        <div className="display-2 text-primary">
          {" "}
          Biography: {this.state.userMetrics.biography}
        </div>

        <div className="display-2 text-primary">
          Followers: {this.state.userMetrics.followers_count}
        </div>

        <div className="display-2 text-primary">
          {" "}
          Following: {this.state.userMetrics.follows_count}
        </div>
      </div>
    );
  }
}

export default API;
