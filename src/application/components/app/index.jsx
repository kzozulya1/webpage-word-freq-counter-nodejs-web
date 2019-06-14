import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MenuComponent from '../menu';
import routes, { JOBS_ROUTE } from '../../routes';
import '../common/styles/reset.css';
import './styles.scss';

/**
 * Main app component
 */
class AppComponent extends Component {
    /*
    *  Render main app
    */
    render() {
        return (
            <div className="main-container">
                <div className="header">
                    <div className="container">
                        <div className="wrapper">
                            <MenuComponent />
                        </div>
                    </div>
                </div>
                <div className={'content'}>
                    <div className="container">
                        <div className="wrapper">
                            <Switch>
                                {routes.map(route => <Route key={route.path} {...route} />)}
                                {<Redirect to={JOBS_ROUTE} />}
                            </Switch>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <span>Copyright &copy; 2019. Page Word Frequency Counter. All rights reserved</span>
                </div>
            </div>
        );
    }
}

export default AppComponent