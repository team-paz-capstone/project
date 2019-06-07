import 'babel-polyfill';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import AwardList from './AwardList';
import { fetchAwards, fetchUsers } from '../actions';
import BaseLoadingBar from './BaseLoadingBar';

class AwardsGranted extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // if award data needs fetching, fetch it from database
    this.props.dispatch(fetchUsers());
    if (this.props.awards.needFetch === true && this.props.awards.loading === false) {
      this.props.dispatch(fetchAwards());
    }

    const awards = this.props.awards.items;
    const currentUser = this.props.user;

    // get all awards granted by current user
    let currentUserAwards;
    if (currentUser != null) {
      currentUserAwards = awards.filter(award => award.granter.id === currentUser.id);
    } else {
      currentUserAwards = awards;
    }

    const title = <Typography variant="h5">Awards Granted</Typography>;
    const list = <AwardList awards={currentUserAwards} />;

    return (
      <React.Fragment>
        {this.props.awards.loading === true && <BaseLoadingBar />}
        {this.props.awards.loading === false && (
          <Grid container direction="row" justify="center" alignItems="center">
            <div>
              <br />
              {title}

              <br />
              {list}

              <br />
              <br />
              <br />
            </div>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  awards: state.awards,
  offices: state.offices,
  views: state.views,
  select: state.select
});

export default connect(mapStateToProps)(AwardsGranted);
