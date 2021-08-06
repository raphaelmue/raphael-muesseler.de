import React           from 'react';
import {BrowserRouter} from 'react-router-dom';
import Home            from './home/Home';
import '../style/main.scss'

function App() {
    return (
        <div>
            <BrowserRouter>
                <Home/>
            </BrowserRouter>
        </div>
    );
}

export default App;
