import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from 'react-swipeable-views';
import Typography from "@material-ui/core/Typography/Typography";
import * as PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import MembersUsers from "./membersUsers";

function TabContainer({children, dir}) {
    return (
        <Typography component="div" dir={dir} >
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
});

function mapStateToProps(state) {
    return state.socket;
}

@connect(mapStateToProps)
@withStyles(styles, {withTheme: true})
export default class MembersMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {classes, theme, membersOnline} = this.props;

        return (
            <Grid className={`Members`}
                  container
                  direction="row"
                  alignItems="stretch">
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Users online"/>
                        <Tab label="Chats"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                    style={{width: '100%'}}
                >
                    <TabContainer dir={theme.direction} >
                        <MembersUsers members={membersOnline}/>
                    </TabContainer>
                    <TabContainer dir={theme.direction}>Item Two</TabContainer>
                </SwipeableViews>
            </Grid>
        );
    }
}
