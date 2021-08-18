import React                                 from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage                           from './landingPage/LandingPage';
import ProjectPage                           from './projectsPage/ProjectPage';

import '../style/main.scss';

function App() {
    return (
        <Router>
            <Switch>
                <Route path={'/projects'} component={ProjectPage}/>
                <Route path={'/'} component={LandingPage}/>
            </Switch>
        </Router>
    );
}

export default App;
