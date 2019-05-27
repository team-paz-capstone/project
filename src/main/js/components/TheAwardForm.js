import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import BaseSelect from "./BaseSelect";
import {connect} from "react-redux";

class TheAwardForm extends Component {
  createAward = (event) => {
    console.debug(event);
    console.debug("Create Award Clicked...")
  };

  render() {
    let users = this.props.users.items.map(user => {
      user.display = user["firstName"] + " " + user["lastName"];
      return user;
    });

    return (
        <div>
          <h2>Recognize Hard Work!</h2>
          <BaseSelect
              name={"Recipient"}
              items={users}
              nameKey={"display"}
              valueKey={"id"}/>
          <br/>
          <BaseSelect
              name={"Office Filter"}
              items={this.props.offices.items}
              nameKey={"name"}
              valueKey={"id"}/>
          <br/>
          <BaseSelect
              name={"Award Type"}
              items={this.props.awardTypes.items}
              nameKey={"name"}
              valueKey={"id"}/>
          <br/>
          <Button
              variant="contained"
              color="primary"
              onClick={this.createAward}>
            Send Award
          </Button>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  awards: state.awards,
  awardTypes: state.awardTypes,
  offices: state.offices,
  users: state.users,
});

export default connect(mapStateToProps)(TheAwardForm);