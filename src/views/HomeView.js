import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Utils from "../Utils";

import { render_form_control } from "../components/CommonComponents";

import { MOVIE_BRAIN_URL } from "../Constants";
import poster_placeholder from "../assets/movie-clapboard.png";

function HomeView({is_logged_in}) {
    const navigate = useNavigate();
    const location = useLocation();

    if(!is_logged_in){
       navigate("/"); 
       return;
    }

    const [hero_banner, set_hero_banner] = useState(null);
    const [search_query, set_search_query] = useState("");
    const [popular, set_popular] = useState([]);
    const [genres, set_genres] = useState([]);
    const [recommended, set_recommended] = useState([]);

    useEffect(() => {
        Utils.scroll_to_top(true);
        fetch_hero_banner();
        fetch_popular();
        fetch_genres();
        fetch_recommended();
    }, []);

    const fetch_hero_banner = async() => {

        console.log("MOVIE_BRAIN_URL: ", MOVIE_BRAIN_URL);

        const response = await axios.get(MOVIE_BRAIN_URL + "/get-hero-banner");
        const hero_banner = response.data;
        if(response && hero_banner) {
            set_hero_banner(hero_banner);
        }
    };

    const fetch_popular = async() => {
        const response = await axios.get(MOVIE_BRAIN_URL + "/movies/popular", {
            params: { page: 0, per_page: 12 }
        });
        if(response && response.data) {
            set_popular(response.data);
        }
    };

    const fetch_genres = async() => {
        const response = await axios.get(MOVIE_BRAIN_URL + "/genres");
        if(response && response.data) {
            set_genres(response.data);
        }
    };

    const fetch_recommended = async() => {
        const response = await axios.get(MOVIE_BRAIN_URL + "/movies/recommended", {
            params: { page: 0, per_page: 12 }
        });
        if(response && response.data) {
            set_recommended(response.data);
        }
    };

    const handle_search = (e) => {
        e.preventDefault();

        console.log("search_query: ", search_query);
        if(search_query){
             navigate("/search/" + encodeURIComponent(search_query));
        }
    };

    const on_movie_click = (movie_id)=>{
        if(movie_id){
            navigate("/movie/" + movie_id);
        }
    }

    const render_hero_banner = () => {
        if(hero_banner == null) {
            return <div className="hero-banner loading">Loading...</div>;
        }

        return (
            <div
                className="hero-banner"
                style={{
                    backgroundImage: `url(${hero_banner.banner})`
                }}
                onClick={() => on_movie_click(hero_banner.movie_id)}>

                <div className="hero-overlay" onClick={(e) => e.stopPropagation()}>
                    <h1 className="hero-title">Discover Movies</h1>
                    <p className="hero-tagline">Find your next favorite film</p>
                    <Form className="search" onSubmit={handle_search}>
                        
                         {render_form_control({
                            id: "search_query",
                            value: search_query,        
                            onChange: (e) => set_search_query(e.target.value),
                            placeholder: "Enter query",
                            required: true
                        })}
                        <Button type="submit" variant="primary" className="hero-search-btn">
                            Search
                        </Button>
                    </Form>
                </div>
            </div>
        );
    };

    const render_movie_card = (movie) => {
        return (
            <div className="movie-card" key={movie.id} onClick={() => on_movie_click(movie.id)}>
                <img
                    src={movie.poster_th_url || poster_placeholder}
                    alt={movie.title}
                    onError={(e) => { e.currentTarget.src = poster_placeholder; }}
                />
                <div className="movie-card-name">{movie.title}</div>
            </div>
        );
    };

    const render_popular_section = () => {
        if(popular && popular.length > 0) {
            return (
                <div className="section">
                    <h3>Trending Now</h3>
                    <div className="movie-card-list">
                        {popular.map((m) => render_movie_card(m))}
                    </div>
                </div>
            );
        }
    };

    const render_genres_section = () => {
        if(genres && genres.length > 0) {
            return (
                <div className="section">
                    <h3>Explore by Genre</h3>
                    <Row>
                        {genres.map((g) => (
                            <Col md={3} key={g.id} className="genre-col">
                                <div className="genre-card">{g.name}</div>
                            </Col>
                        ))}
                    </Row>
                </div>
            );
        }
    };

    const render_recommended_section = () => {
        if(recommended && recommended.length > 0) {
            return (
                <div className="section">
                    <h3>Recommended</h3>
                    <div className="movie-card-list">
                        {recommended.map((m) => render_movie_card(m))}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="home-view">
            {render_hero_banner()}
            <Container className="mt-4">
                {render_popular_section()}
                {render_genres_section()}
                {render_recommended_section()}
            </Container>
        </div>
    );
}

export default HomeView;
