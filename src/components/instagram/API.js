import React, { Component } from "react";
import axios from "axios";
import GraphMetrics from "./GraphMetrics";
import AudMetrics from "./AudMetrics";
import MediaURLFetch from "./Media";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Cards from "./CustomCard";

// import { BrowserRouterasRouter } from "react-router-dom";
import Popover from "./Popover";

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
          console.log("access token", this.props.accessToken);

          let pageid = res.data.data.map(item => {
            return item.id;
          });
          console.log("this is facebook page's id: ", pageid);
          //console.log("this is facebook database", res.data.data);

          this.getIgDetails(this.props.accessToken, pageid);
        });
    };

    this.toggleSelect = () => {
      alert("selected the page congats");
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
        })
        .catch(function(error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log("Error code:", error.response.status);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
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
        }, this.getAllMedia(this.props.accessToken));
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
        <select onChange={() => this.toggleSelect()}>
          <option value="">select page</option>
          <option value="">
            {this.pageid &&
              this.pageid.forEach(element => {
                return element;
              })}
          </option>
          <option value="">{this.pageid && this.pageid[0]}</option>
        </select>
        <select name="" id="">
          {this.pageid && this.pageid.map(ele => <option>{ele}</option>)}
        </select>
        <button
          className="btnmaterial"
          onClick={() => this.getPageDetails(this.props)}
        >
          Page Details
        </button>{" "}
        <br /> <br />
        <button
          className="btnmaterial"
          onClick={() => this.getUserMetrics(this.props)}
        >
          User Metrics
        </button>{" "}
        <br />
        {this.state.userMetrics.profile_picture_url &&
        this.state.userMetrics.name &&
        this.state.userMetrics.biography &&
        this.state.mediaData.length &&
        this.state.userMetrics.followers_count &&
        this.state.userMetrics.follows_count &&
        this.state.likes &&
        this.state.comments ? (
          <div>
            <div>
              <img
                className="profiledisplay"
                src={this.state.userMetrics.profile_picture_url}
                width="200"
                height="200"
                alt="profile display"
              />
            </div>

            <div className="text-info h1">
              Name: {this.state.userMetrics.name}
            </div>
            <div className="text-info h1">
              {" "}
              Biography: {this.state.userMetrics.biography}
            </div>
            <MDBContainer>
              <MDBRow>
                <MDBCol size="4">
                  {/* <div className="text-info h1">
                    Posts: {this.state.mediaData.length}
                  </div>{" "} */}
                  <Cards title="Posts" value={this.state.mediaData.length} />
                </MDBCol>
                <MDBCol size="4">
                  {/* <div className="text-info h1">
                    Followers: {this.state.userMetrics.followers_count}
                  </div>{" "} */}
                  <Cards
                    title="Followers"
                    value={this.state.userMetrics.followers_count}
                  />
                </MDBCol>
                <MDBCol size="4">
                  {/* <div className="text-info h1">
                    {" "}
                    Following: {this.state.userMetrics.follows_count}
                  </div>{" "} */}
                  <Cards
                    title="Following"
                    value={this.state.userMetrics.follows_count}
                  />
                </MDBCol>{" "}
              </MDBRow>
              <MDBRow>
                <MDBCol size="4">
                  {/* <div className="text-info h1"> Likes: {this.state.likes}</div>{" "} */}
                  <Cards title="Likes" value={this.state.likes} />
                </MDBCol>
                <MDBCol size="4">
                  {/* <div className="text-info h1">
                    Comments: {this.state.comments}
                    <br />
                  </div>{" "} */}
                  <Cards title="Comments" value={this.state.comments} />
                </MDBCol>
                <MDBCol size="4">
                  {/* <div className="text-info h1">
                    {" "}
                    Engagement Rate:{" "}
                    {((this.state.likes + this.state.comments) /
                      this.state.userMetrics.followers_count) *
                      100}{" "}
                    %
                  </div>{" "} */}
                  <Cards
                    title="Engagement Rate (%)"
                    value={(
                      ((this.state.likes + this.state.comments) /
                        this.state.userMetrics.followers_count) *
                      100
                    ).toFixed(4)}
                  />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        ) : null}
        <GraphMetrics
          businessAccountId={this.state.instagram_business}
          accessToken={this.props.accessToken}
          followersCount={this.state.userMetrics.followers_count}
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
