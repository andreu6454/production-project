import React from 'react';
import {Link} from 'react-router-dom';
import './styles/index.scss'


import {useTheme} from "app/providers/ThemeProvider";
import {classNames} from "shared/lib/classNames/classNames";
import {AppRouter} from "app/providers/router";


const App = () => {
    const {theme, toggleTheme} = useTheme()


    return (
        <div className={classNames('app',{},[theme])}>
            <button onClick={toggleTheme}> Сменить тему</button>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>о сайте</Link>

            <AppRouter/>
        </div>
    );
};

export default App;