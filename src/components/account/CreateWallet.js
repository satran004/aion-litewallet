import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GenerateKey from "./GenerateKey";
import ShowKeys from "./ShowKeys";
import PaperWallet from "./PaperWallet";
import OnlineCheck from "./OnlineCheck"

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
    stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },
});



const steps = ['Check Internet Connection', 'Generate Wallet', 'Write down keys', 'Paper Wallet'];

// function getStepContent(step) {
//     switch (step) {
//         case 0:
//             return <PasswordForm password={this.state.data.password}/>;
//         case 1:
//             return <GenerateKey data={this.state.data} />;
//         case 2:
//             return <ShowKeys data={this.state.data} />;
//         case 3:
//             return <PaperWallet data={this.state.data} />;
//         default:
//             throw new Error('Unknown step');
//     }
// }

class CreateWallet extends React.Component {
    state = {
        activeStep: 0,

        data: {
            address: "",
            privateKey: "",
            mnemonic: "",
            password: "",
            isValid: false
        }
    };

    setIsValid = (flag) => {
        this.setState({
            data: {
                ...this.state.data,
                isValid: flag
            }
        });
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <OnlineCheck callback={this.setIsValid} next={this.handleNext}/>;
            case 1:
                return <GenerateKey data={this.state.data} callback={this.setIsValid} />;
            case 2:
                return <ShowKeys data={this.state.data} callback={this.setIsValid}/>;
            case 3:
                return <PaperWallet data={this.state.data} callback={this.setIsValid}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        return (
            <div>
                        <Typography variant="display1" align="center">
                            Create a new Aion Wallet
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    {this.getStepContent(activeStep)}
                                    <Typography variant="headline" gutterBottom>
                                        Thank you for your order.
                                    </Typography>
                                    <Typography variant="subheading">
                                        Your order number is #2001539. We have emailed your order confirmation, and will
                                        send you an update when your order has shipped.
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {this.getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && activeStep !== steps.length - 1 && (
                                            <Button onClick={this.handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}

                                        {activeStep !== steps.length - 1 ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                            disabled={!this.state.data.isValid}
                                        >
                                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                        </Button>
                                            ): (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleReset}
                                                className={classes.button}
                                            >
                                                Reset
                                            </Button>

                                        )}
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
            </div>

        );
    }
}

CreateWallet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateWallet);