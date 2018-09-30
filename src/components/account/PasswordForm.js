import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class PasswordForm extends React.Component {


    handleChange = e => {

        this.props.callback(true);
    }

    render() {

        return (
        <React.Fragment>
            <Typography variant="title" gutterBottom>

            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        fullWidth
                        type="password"
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="confirm_password"
                        name="comfirm_password"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
        ;
    }
}

export default PasswordForm;