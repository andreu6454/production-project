import React, {Suspense} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import './styles/index.scss'


import {useTheme} from "app/providers/ThemeProvider";
import {classNames} from "shared/lib/classNames/classNames";
import {AboutPage} from "pages/AboutPage";
import {MainPage} from "pages/MainPage";


const App = () => {
    const {theme, toggleTheme} = useTheme()


    return (
        <div className={classNames('app',{},[theme])}>
            <button onClick={toggleTheme}> Сменить тему</button>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>о сайте</Link>

            <Suspense fallback={<div> loading...</div>}>
                <Routes>
                    <Route path={'/'} element={<MainPage/>}/>
                    <Route path={'/about'} element={<AboutPage/>}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;