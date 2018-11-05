import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
    members_list: {
        width: "100%"
    }
});

@withStyles(styles)
export default class MembersUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };

    }

    memberList = (members, classes) => {
        if  (members.length === 0) {
            return('');
        }
        const listItems = members.map((user) =>
            <span key={user.id.toString()}>
                <ListItem>
                    <Avatar>
                        <AccountCircle/>
                    </Avatar>
                    <ListItemText primary={user.firstname ? user.firstname : user.email} secondary={ user.firstname ? user.email: "online"}/>
                </ListItem>
                <li>
                    <Divider inset/>
                </li>
            </span>
        );
        return ( <List className={classes.members_list}> {listItems}</List>) ;
    };

    render() {
        const {classes, members} = this.props;

        return (
            <Grid className={`MembersUsers`} >
                    {members.length !== 0 ? this.memberList(members, classes) : ''}
            </Grid>
        );
    }
}
