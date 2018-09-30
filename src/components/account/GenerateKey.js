import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button/Button";
import CryptoUtil from "../../lib/CryptoUtil";

class GenerateKey extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            privateKey: "",
            address: "",
            mnemonic: ""
        }
        this.handleGenerate = this.handleGenerate.bind(this);
    }

    componentDidMount  () {

        this.props.callback(false);

    }

    handleGenerate = () => {
        // alert("demo");
        (async() => {

            let mnemonic = CryptoUtil.generateMnemonic();
            let seed = CryptoUtil.mnemonicToSeed(mnemonic);

            let privateKey = CryptoUtil.privateKey(seed);
            // alert(privateKey);

            let address = CryptoUtil.generateAddress(privateKey);
            // alert(publicKey);

            this.setState({mnemonic: mnemonic, privateKey: privateKey, address: address});

            this.props.data.address = address;
            this.props.data.privateKey = privateKey;
            this.props.data.mnemonic = mnemonic;

            this.props.callback(true); //callback to enable button
        })();
    };

    render() {
        return (
            <React.Fragment>
                {/*<Typography variant="title" gutterBottom>*/}
                {/*Generate Key*/}
                {/*</Typography>*/}
                {!this.state.privateKey ? (
                    <Button variant="contained" color="secondary" onClick={this.handleGenerate}>
                        Generate a New Wallet
                    </Button>) : (
                        <div>
                            <Typography variant="headline" gutterBottom>
                                Congratulations!!! A new Aion blockchain address has been generated.
                            </Typography>
                            <Typography variant="subheading" gutterBottom>
                                Please click <b>"Next"</b> button to see the details.
                            </Typography>
                        </div>
                    )
                }

            </React.Fragment>
        );
    }
}

export default GenerateKey;