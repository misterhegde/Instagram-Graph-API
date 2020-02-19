import React, { Component } from "react";
import axios from "axios";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";

import "react-bootstrap";
import AlertDialog from "./Dialog";

class MediaURLFetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrlArray: "",
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.getPictures = props => {
      let urls = [];

      for (var oneMedia of this.props.mediaDataArray) {
        axios
          .get(
            `https://graph.facebook.com/${oneMedia}?fields=media_url,like_count,comments_count&access_token=${this.props.accessToken}`
          )
          .then(res => {
            let gettingThisPicture = res.data;

            urls.push(gettingThisPicture);
            this.setState({ imageUrlArray: urls });
          });
      }

      console.log("imageurlarray", this.state.imageUrlArray);
    };
  }

  handleClick(e, props) {
    console.log(e.target.id);
    axios
      .get(
        `https://graph.facebook.com/${e.target.id}/insights?metric=engagement,impressions,reach,saved&period=lifetime&access_token=${this.props.accessToken}`
      )
      .then(res => {
        console.log("insights from this post", res.data.data);
        this.setState({
          data: res.data.data,
          open: true
        });
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
  }

  render() {
    return (
      <React.Fragment>
        <button
          onClick={() => this.getPictures(this.props)}
          className="btnmaterial"
        >
          Pictures
        </button>
        <React.Fragment className="wholeroot">
          <GridList cellHeight={307} cols={3} spacing={8} className="gridList">
            {this.state.imageUrlArray.length &&
              this.state.imageUrlArray.map(url => {
                return (
                  <GridListTile key={url.id}>
                    <img
                      src={url.media_url}
                      alt="post"
                      id={url.id}
                      onClick={this.handleClick}
                    />
                    <GridListTileBar
                      title={<span>Likes: {url.like_count}</span>}
                      subtitle={<span>Comments: {url.comments_count}</span>}
                      actionIcon={
                        <IconButton aria-label={"info about"} className="icon">
                          {/* <button onClick={this.handleClick} id={url.id}>
                            insights
                          </button> */}
                          <AlertDialog
                            open={this.state.open}
                            data={
                              this.state.data ? (
                                this.state.data.map(item => {
                                  return (
                                    <React.Fragment key={url.id}>
                                      <h1>{item.title}</h1>:
                                      <h3>
                                        {item.values.map(ele => {
                                          return ele.value;
                                        })}
                                      </h3>
                                    </React.Fragment>
                                  );
                                })
                              ) : (
                                <h3>loading</h3>
                              )
                            }
                          />
                        </IconButton>
                      }
                    />{" "}
                  </GridListTile>
                );
              })}
          </GridList>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default MediaURLFetch;
