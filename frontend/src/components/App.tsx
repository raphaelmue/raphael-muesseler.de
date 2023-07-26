import React from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './landingPage/LandingPage';
import ProjectPage from './projectsPage/ProjectPage';
import {configureI18N} from '../translations';
import AOS from 'aos';

import '../style/main.scss';
import 'aos/dist/aos.css';

AOS.init({
    duration: 800,
    easing: 'ease-out-back'
});

configureI18N();

function App(): React.ReactElement {
    return (
        <Router>
            <Routes>
                <Route path={'/projects'} element={<ProjectPage/>}/>
                <Route path={'/'} element={<LandingPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
