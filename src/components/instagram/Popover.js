import React from "react";
import {
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";

const Popover = props => {
  return (
    <div>
      {/* <Button id={this.props.id} type="button">
        Launch Popover
      </Button> */}

      <UncontrolledPopover
        trigger="legacy"
        placement="top"
        target={this.props.id}
      >
        <PopoverHeader>{this.props.data}</PopoverHeader>
        <PopoverBody></PopoverBody>
      </UncontrolledPopover>
    </div>
  );
};

export default Popover;
