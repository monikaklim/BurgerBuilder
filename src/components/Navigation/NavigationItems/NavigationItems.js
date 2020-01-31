import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
         {props.isAuthenticated ? <NavigationItem link="/logout">Logout</NavigationItem>
            : <NavigationItem link="/auth">Authenticate</NavigationItem> }
    </ul>
);


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
  };

export default connect(mapStateToProps)(navigationItems);