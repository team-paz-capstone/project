import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: 20
  },
  footer: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1)
  }
});

function TheFooter(props) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <hr />
      <Typography variant="body1" align="center" gutterBottom>
        <b>Team PAZ</b>
      </Typography>
      <Typography variant="body2" align="center" color="textSecondary" component="p">
        Thank you for visiting our site.
      </Typography>
    </footer>
  );
}

const mapStateToProps = state => ({
  auth: state.authentication.auth
});

export default connect(mapStateToProps)(withStyles(styles)(TheFooter));
