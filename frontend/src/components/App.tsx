import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './landingPage/LandingPage';
import ProjectsPage from './projectsPage/ProjectsPage';
import {configureI18N} from '../translations';
import AOS from 'aos';

import '../style/main.scss';
import 'aos/dist/aos.css';
import Project from "./projectsPage/Project";

AOS.init({
    duration: 800,
    easing: 'ease-out-back'
});

configureI18N();

function App(): React.ReactElement {
    return (
        <HashRouter>
            <Switch>
                <Route path={'/projects/:projectId'} render={props => <Project {...props}/>} />
                <Route path={'/projects'} render={props => <ProjectsPage {...props}/>}/>
                <Route path={'/'} render={props => <LandingPage {...props}/>}/>
            </Switch>
        </HashRouter>
    );
}

export default App;
