import React           from 'react';
import {BrowserRouter} from 'react-router-dom';
import LandingPage     from './landingPage/LandingPage';
import '../style/main.scss'

function App() {
    return (
        <div>
            <BrowserRouter>
                <LandingPage/>
            </BrowserRouter>
        </div>
    );
}

export default App;
