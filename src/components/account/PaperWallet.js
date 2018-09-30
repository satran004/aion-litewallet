import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import CloudDownloadRounded from '@material-ui/icons/CloudDownloadRounded';
import domtoimage from 'dom-to-image';

import QRCode from "qrcode.react";

class PaperWallet extends React.Component{

    constructor(props) {
        super(props);

        this.handleDownload = this.handleDownload.bind(this);
    }

    handleDownload() {
        let node = document.getElementById('paperwallet-body');

        let address = this.props.data.address;
        domtoimage.toPng(node)
            .then(function (dataUrl) {
                let link = document.createElement('a');
                link.download = "Aion_paper_wallet_" + address + ".png";
                link.href = dataUrl;
                link.click();
            });

    }

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.handleDownload} variant="contained" color="secondary"  size="small">
                    Download&nbsp;<CloudDownloadRounded />
                </Button>
                <PaperWalletQRComponent data={this.props.data} />
            </React.Fragment>
        );
    }
}

class PaperWalletQRComponent extends React.Component {

    render() {
        return (
            <div id="paperwallet-body" className="paper-wallet">
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subheading" gutterBottom align="center" color="default">
                            <b>Address</b>
                        </Typography>
                        <QRCode value={this.props.data.address} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className="aion-image"><img src="aion-icon.png"></img> </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subheading" gutterBottom align="center" color="default">
                            <b>Private Key</b>
                        </Typography>
                        <QRCode value={this.props.data.privateKey} />
                    </Grid>
                </Grid>

                <Typography variant="subheading" gutterBottom align="center" color="default">
                    <b>Address</b>
                </Typography>
                <Typography variant="caption" gutterBottom align="center" color="default">
                    <span className="address"> {this.props.data.address} </span>
                </Typography>
                <Typography variant="subheading" gutterBottom align="center" color="default">
                    <b>Private Key</b>
                </Typography>
                <Typography variant="caption" gutterBottom align="center" color="default">
                    <span className="private-key"> {this.props.data.privateKey} </span>
                </Typography>
            </div>
        );
    }

}

export default PaperWallet;