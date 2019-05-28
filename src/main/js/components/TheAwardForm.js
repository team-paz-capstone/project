import React, {Component} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Button from "@material-ui/core/Button";
import BaseSelect from "./BaseSelect";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import BaseError from "./BaseError";
import {createAward} from "../actions"

const styles = {
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: 1,
    minWidth: 120,
  },
  grow: {
    flexGrow: 1,
  }
};

class TheAwardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {error: "", created: false};
  }

  createAward = () => {
    console.debug("Create Award Clicked...");
    let selectedGranter = this.props.select.items["Logged In As"];
    let selectedRecipient = this.props.select.items["Recipient"];
    let selectedAwardType = this.props.select.items["Award Type"];

    if (!selectedGranter) {
      console.warn("No selectedGranter");
      this.setState({error: "Login is invalid: Please log out and log back in!"})

    } else if (!selectedRecipient) {
      console.warn("No selectedRecipient");
      this.setState({error: "Please Select a Recipient!"})

    } else if (!selectedAwardType) {
      console.warn("No selectedAwardType");
      this.setState({error: "Please Select an Award Type!"})

    } else {
      this.setState({error: "", created: "Created Award!"});
      console.debug("Creating award!");

      let granterID = selectedGranter.id;
      let recipientID = selectedRecipient.id;
      let awardTypeID = selectedAwardType.id;

      this.props.dispatch(createAward({
        granterID: granterID,
        recipientID: recipientID,
        awardTypeID: awardTypeID
      }))
    }

    console.debug(selectedGranter);
    console.debug(selectedRecipient);
    console.debug(selectedAwardType);
  };

  render() {
    const {classes} = this.props;
    let users = this.props.users.items.map(user => {
      user.display = user["firstName"] + " " + user["lastName"];
      return user;
    });

    let error = this.props.awards.error?  this.props.awards.error : this.state.error;
    let created = !this.props.awards.error && this.state.created
        ? this.state.created
        : null;

    return (
        <FormGroup className={classes.root}>
          <h2>Recognize Hard Work!</h2>
          <h3>{created}</h3>
          <BaseError error={error}/>
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
        </FormGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  awards: state.awards,
  awardTypes: state.awardTypes,
  offices: state.offices,
  select: state.select,
  users: state.users,
});

export default connect(mapStateToProps)(withStyles(styles)(TheAwardForm));