import React, { Component } from "react";
import axios from "axios";
import GraphMetrics from "./GraphMetrics";
import AudMetrics from "./AudMetrics";
import MediaURLFetch from "./Media";

class API extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mediaData: [],
      profileId: "",
      userMetrics: [],
      mediaMetrics: [],
      likes: "",
      comments: "",
      instagram_business: ""
    };
  }
  componentDidMount() {
    this.getPageDetails = props => {
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
          console.log("this is facebook database", res);

          this.getIgDetails(this.props.accessToken, pageid);
        });
    };

    this.getIgDetails = (accessToken, pageid) => {
      axios
        .get(
          `https://graph.facebook.com/v5.0/${pageid}?fields=instagram_business_account&access_token=${accessToken}`
        )
        .then(res => {
          let instagram_business_account_id =
            res.data.instagram_business_account.id;
          this.setState({
            instagram_business: instagram_business_account_id
          });
          console.log(
            "this is the instagram business acc id: ",
            instagram_business_account_id
          );
          console.log("this is instagram database", res);

          this.getMediaDetails(instagram_business_account_id, accessToken);
        });
    };

    this.getMediaDetails = (instagram_business_account_id, accessToken) => {
      axios
        .get(
          `https://graph.facebook.com/v5.0/${instagram_business_account_id}/media?access_token=${accessToken}`
        )
        .then(res => {
          console.log(res);
          let media_data = res.data.data.map(item => {
            return item.id;
          });

          this.setState(
            {
              mediaData: media_data,
              profileId: instagram_business_account_id
            },
            () => console.log("media data for me", this.state)
          );
        });
    };

    this.getUserMetrics = props => {
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

    this.getAllMedia = accessToken => {
      let feed = [];
      for (var singleMedia of this.state.mediaData) {
        axios
          .get(
            `https://graph.facebook.com/${singleMedia}?fields=media_url,caption,children,comments_count,is_comment_enabled,like_count,timestamp,username&access_token=${accessToken}`
          )
          .then(res => {
            let gettingThisData = res.data;
            feed.push(gettingThisData);
            this.setState({
              mediaMetrics: [...this.state.mediaMetrics, gettingThisData]
            });
          });
      }

      let like_count = this.state.mediaMetrics
        .map(met => met.like_count)
        .reduce((acc, curr) => acc + curr, 0);
      this.setState({
        likes: like_count
      });

      console.log("from state array", this.state.mediaMetrics);
      console.log("like count", like_count);
      let comments_count = this.state.mediaMetrics
        .map(met => met.comments_count)
        .reduce((acc, curr) => acc + curr, 0);
      this.setState({
        comments: comments_count
      });
      this.setState({ mediaMetrics: [] });

      console.log("comments count", comments_count);
    };
  }

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
        <div className="display-2 text-primary"> Likes: {this.state.likes}</div>
        <div className="display-2 text-primary">
          Comments: {this.state.comments}
          <br />
        </div>

        <GraphMetrics
          businessAccountId={this.state.instagram_business}
          accessToken={this.props.accessToken}
        />
        <AudMetrics
          businessAccountId={this.state.instagram_business}
          accessToken={this.props.accessToken}
        />
        <MediaURLFetch
          mediaDataArray={this.state.mediaData}
          accessToken={this.props.accessToken}
        />
      </div>
    );
  }
}

export default API;
