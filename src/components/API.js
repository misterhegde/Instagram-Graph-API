import React, { Component } from "react";
import axios from "axios";

class API extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaData: [],
      profileId: "",
      userMetrics: [],
      mediaMetrics: []
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
        console.log(("posts": media_data));

        this.setState(
          {
            mediaData: media_data,
            profileId: instagram_business_account_id
          },
          () => console.log(this.state)
        );
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
        this.getAllMedia(this.props.accessToken);
      });
  };

  getAllMedia = accessToken => {
    let feed = [];
    for (var singleMedia of this.state.mediaData) {
      axios
        .get(
          `https://graph.facebook.com/${singleMedia}?fields=media_url,caption,children,comments_count,is_comment_enabled,like_count,timestamp,username&access_token=${accessToken}`
        )
        .then(res => {
          let gettingThisData = res.data;
          feed.push(gettingThisData);
        });
      console.log("can i see this");
    }

    this.setState({ mediaMetrics: [...this.state.mediaMetrics, feed] });
    console.log("from state array", this.state.mediaMetrics);
  };

  render() {
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

        <br />

        <button
          className="btn btn-primary"
          onClick={() => this.getUserMetrics(this.props)}
        >
          Click this to get User's metrics
        </button>

        <br />
        <br />
        <br />
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
          Posts: {this.state.mediaData.length}
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
