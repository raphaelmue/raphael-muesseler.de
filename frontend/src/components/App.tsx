import React                                 from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage                           from './landingPage/LandingPage';
import ProjectPage                           from './projectsPage/ProjectPage';
import {configureI18N}                       from '../translations';
import AOS                                   from 'aos';

import '../style/main.scss';
import 'aos/dist/aos.css';

AOS.init({
    duration: 800,
    easing: 'ease-out-back'
});

configureI18N();

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
