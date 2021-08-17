import React                          from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage                    from './landingPage/LandingPage';
import ProjectPage                    from './projectsPage/ProjectPage';

import '../style/main.scss';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path={'/projects'} component={ProjectPage}/>
                    <Route path={'/'} component={LandingPage}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
