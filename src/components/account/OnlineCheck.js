import React from 'react'
import Typography from "@material-ui/core/Typography/Typography";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

class OnlineCheck extends React.Component {

    constructor(props) {
        super(props);

        this.url  = "http://www.google.com"
        this.state = {
            isOnline:  true,
            ignoreOnline: false
        };

        this.onlineCheck = this.onlineCheck.bind(this);
        this.handleIgnoreOnline = this.handleIgnoreOnline.bind(this);
    }

    componentDidMount() {
        this.onlineCheck();
    }

    onlineCheck() {
        if (navigator.onLine) {
            // Has connection, go do something
            this.setState({isOnline: true});

            this.props.callback(false);
        } else {
            this.setState({isOnline: false});

            this.props.callback(true);
        }

        // alert(this.url);
        // let xhr = new XMLHttpRequest();
        // return new Promise((resolve, reject)=>{
        //     xhr.onload = () => {
        //         // Set online status
        //         this.setState({isOnline: true})
        //         resolve(true);
        //     };
        //     xhr.onerror = () => {
        //         // Set online status
        //         this.setState({isOnline: false});
        //
        //         this.props.callback(true);
        //
        //         reject(false);
        //     };
        //     xhr.open('GET', this.url, true);
        //     xhr.send();
        }

     handleIgnoreOnline(event) {
         this.setState({ ignoreOnline: event.target.checked });

         if(event.target.checked) {
             this.props.callback(true);
         } else {
             this.props.callback(false);
         }
     }


    render() {

        return (
            <React.Fragment>
                {this.state.isOnline ? (
                    <div>
                        <Typography variant="headline" gutterBottom color="secondary">
                            You are currently connected to internet.
                        </Typography>
                        <Typography variant="subheading" gutterBottom>
                            It is recommended to use this tool in offline mode.
                        </Typography>
                        <Typography variant="subheading" gutterBottom align="center" color="error">
                            Please <b>disconnect</b> your internet connection (Example: Disable your WIFI connection) and <b> reload </b> the page.
                        </Typography>

                        If you still want to proceed while connected, click here
                        <Checkbox checked={this.state.ignoreOnline}
                                  onChange={this.handleIgnoreOnline}
                                  value="ignoreOnline"
                                  // indeterminate
                        />
                    </div>
                ) : (
                    <div>
                        <Typography variant="headline" gutterBottom color="primary">
                            <b>Good !!!</b> You are not connected to internet.
                        </Typography>
                        <Typography variant="subheading" gutterBottom color="primary">
                            You are ready to generate a new wallet. Please click <b>"Next"</b> to proceed.
                        </Typography>
                    </div>
                )

                }
            </React.Fragment>
        );
    }
}

export default OnlineCheck;