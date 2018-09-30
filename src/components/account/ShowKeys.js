import React from 'react';
import Typography from '@material-ui/core/Typography';

class ShowKeys extends React.Component{

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="subheading" gutterBottom align="center" color="default">
                    <b>Your Aion Address</b>
                </Typography>
                <Typography variant="caption" gutterBottom align="center" color="default">
                    <span className="address"> {this.props.data.address} </span>
                </Typography>
                <Typography variant="subheading" gutterBottom align="center" color="default">
                    <b>12-words Mnemonic</b>
                </Typography>
                <Typography variant="subheading" gutterBottom align="center" color="default">
                    <span className="mnemonic"><b> {this.props.data.mnemonic} </b></span>
                </Typography>
                <Typography variant="subheading" gutterBottom align="center" color="default">
                    <b>Private Key</b>
                </Typography>
                <Typography variant="caption" gutterBottom align="center" color="default">
                    <span className="private-key">{this.props.data.privateKey}</span>
                </Typography>

            </React.Fragment>
        );
    }
}

export default ShowKeys;