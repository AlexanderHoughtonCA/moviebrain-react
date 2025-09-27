import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation  } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import Footer from "./components/Footer";

import AppNavBar from "./views/AppNavBar";
import ShowcaseView from "./views/ShowcaseView";
import HomeView from "./views/HomeView";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import SearchMovieView from "./views/SearchMovieView";
import MovieView from "./views/MovieView";
import ProfileView from "./views/ProfileView";

import "./app.css";

function App() {
    const [is_logged_in, set_is_logged_in] = useState( localStorage.getItem("token") != null);
    const [is_registered, set_is_registered] = useState( localStorage.getItem("registered") );
    const [showing_login, set_showing_login] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const registered = localStorage.getItem("registered");
        set_is_logged_in(!!token);
        set_is_registered(!!registered);
    }, []);

    const on_logout = () => {
        localStorage.removeItem("token");
        set_is_logged_in(false);        
    };

    const on_register = (registered)=>{
        if(registered){
            set_is_registered(registered);
        }
    }

    const on_login = ()=>{
        set_is_logged_in(true);
    }

    const render_top_navbar = ()=>{
        if(is_logged_in){
            return <AppNavBar is_logged_in={is_logged_in}
                              is_registered={is_registered}
                              on_logout={on_logout} />;
        } 
    }

    const render_root_view = ()=>{
        if(is_logged_in){
            return <HomeView is_logged_in={is_logged_in}/>
        }
        else
        if(is_registered){
            return <LoginView on_login={on_login}/>
        }
        return <ShowcaseView/>
    }

    const render_search_view = ()=>{
        if(is_logged_in){
            return <SearchMovieView is_logged_in={is_logged_in}/>;
        }
    }

    const render_movie_view = ()=>{
        return <MovieView is_logged_in={is_logged_in}/>
    }

    const render_profile_view = ()=>{
        return <ProfileView is_logged_in={is_logged_in}/>
    }


    const render_footer = ()=>{
         if(is_registered && is_logged_in){
            return <Footer className="footer-section"/>
         }
    }
    
    return (
        <Router>

            {render_top_navbar()}

            <div className="app-main">
                <Routes>
                    <Route path="/auth/register" element={<RegisterView on_register={on_register}/>} />
                    <Route path="/auth/login" element={<LoginView on_login={on_login} />} />
                    <Route path="/search/:query?" element={render_search_view()} />
                    <Route path="/search/" element={render_search_view()} />
                    <Route path="/movie/:id" element={render_movie_view()} />
                    <Route path="/person/:id" element={render_profile_view()} />
                    <Route path="/" element={render_root_view()} />
                </Routes>
            </div>

            {render_footer()}
        </Router>
    );
}

export default App;
