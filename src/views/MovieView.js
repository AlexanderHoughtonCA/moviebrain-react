import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Utils from "../Utils";

import { MOVIE_BRAIN_URL } from "../Constants";
import poster_placeholder from "../assets/movie-clapboard.png";
import banner_placeholder from "../assets/movie-brain-banner-placeholder.jpg";

function MovieView({is_logged_in}) {
    const navigate = useNavigate();
    if(!is_logged_in){
       navigate("/"); 
       return;
    }

    const { id } = useParams(); 
    const [movie, set_movie] = useState(null);
    
    const [cast, set_cast] = useState(null);
    var [cast_page, set_cast_page] = useState(0);
    const [cast_per_page, set_per_cast_page] = useState(12);

    const [crew, set_crew] = useState(null);
    var [crew_page, set_crew_page] = useState(0);
    const [crew_per_page, set_crew_per_page] = useState(12);

    const [also_liked, set_also_liked] = useState(null);
    var [crew_also_liked_limit, set_also_liked_limit] = useState(0);

    const screen_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    useEffect(() => {
        Utils.scroll_to_top(true);
        fetch_movie(id);
    }, [id]);

    const fetch_movie = async(movie_id)=>{
        const url = MOVIE_BRAIN_URL + "/movie/"+movie_id;
        const response = await axios.get(url);
        const movie = response.data;
        if((response != null) && (movie != null)){
            set_movie(movie);
            fetch_cast(movie.id);
            fetch_crew(movie.id);
            fetch_also_liked(movie.id);
        }
    }

    const fetch_cast = async(movie_id)=>{
        const response = await axios.get(
            MOVIE_BRAIN_URL + "/movie/cast/" + movie_id,{
                params: {
                    page: cast_page,
                    per_page: cast_per_page
                }
            }
        );

        const found_cast = response.data;
        if(response.status === 200) {
            localStorage.setItem("cast", found_cast);
            set_cast(found_cast);
            return found_cast;

        } else {
            set_error("Cast not found");
        }
    }

    const fetch_crew = async(movie_id)=>{
        const response = await axios.get(
            MOVIE_BRAIN_URL + "/movie/crew/" + movie_id,{
                params: {
                    page: crew_page,
                    per_page: crew_per_page
                }
            }
        );

        const found_crew = response.data;
        if(response.status === 200) {
            localStorage.setItem("crew", found_crew);
            set_crew(found_crew);
            return found_crew;

        } else {
            set_error("Crew not found");
        }
    }

    const fetch_also_liked = async(movie_id)=>{
        const response = await axios.get(
            MOVIE_BRAIN_URL + "/movie/also_liked/" + movie_id,{
                params: {
                    page: crew_page,
                    limit: 12
                }
            }
        );

        const found_also_liked = response.data;
        if(response.status === 200) {
            localStorage.setItem("also_liked", found_also_liked);
            set_also_liked(found_also_liked);
            return found_also_liked;

        } else {
            set_error("Also Liked not found");
        }
    }

    const on_movie_click = (movie_id)=>{
        navigate("/movie/" + movie_id);
    }

    const on_cast_click = (person_id)=>{
        navigate("/person/" + person_id);
    }

    const on_crew_click = (person_id)=>{
        navigate("/person/" + person_id);
    }

    const render_movie_header = () => {
        if(screen_width >= 790){
            const banner_url = movie.backdrop_url ? movie.backdrop_url : banner_placeholder ;
            if(movie.backdrop_url != null){
                return (
                    <div 
                        className="movie-header"
                        style={{
                            backgroundImage:"url(" + banner_url + ")"
                        }}
                    />
                );
            }
        }
    };

    const render_movie_poster = () => {
        return (
            <div className="movie-poster">
                <img
                    src={movie.poster_url || poster_placeholder}
                    alt={movie.title}
                    onError={(e) => { e.currentTarget.src = poster_placeholder; }}
                />
            </div>
        );
    };

    const render_movie_overview = () => {
        return (
            <div className="movie-overview">
                <h2>{movie.title}</h2>
                {Utils.render_overview_paragraphs(movie.overview)}
            </div>
        );
    };

    const render_movie_data = () => {
        if(screen_width >= 800){
            return (
                <div className="movie-data">
                    <h3>Movie Data</h3>
                    <p><strong>Release Date:</strong> {movie.release_date?.substring(0, 10)}</p>
                    <p><strong>Language:</strong> {movie.language}</p>
                    <p><strong>IMDB:</strong> {movie.imdb_id}</p>
                    <p><strong>Popularity:</strong> {movie.popularity}</p>
                    <p><strong>Average Vote:</strong> {movie.vote_average}</p>
                    <p><strong>Vote Count:</strong> {movie.vote_count}</p>
                </div>
            );
        }
    };

    const render_cast_card = (item) => {
        return (
            <div className="movie-card" key={item.id || item.name} onClick={() => on_cast_click(item.id)}>
                <img
                    src={item.profile_th_url || poster_placeholder}
                    alt={item.name}
                    onError={(e) => { e.currentTarget.src = poster_placeholder; }}
                />
                <div className="movie-card-name">{item.name}</div>
                {item.character && <div className="movie-card-role">{item.character}</div>}
            </div>
        );
    };

    const render_featured_cast = () => {
        if(cast != null){
            return (
                <div className="section movie-data-row">
                    <h3>Featured Cast</h3>
                    <div className="movie-card-list">
                        {cast.map((c) => render_cast_card(c))}
                    </div>
                </div>
            );
        }
    };

    const render_crew_card = (item) => {
        return (
            <div className="movie-card" key={item.id || item.name} onClick={() => on_crew_click(item.id)}>
                <img
                    src={item.profile_th_url || poster_placeholder}
                    alt={item.name}
                    onError={(e) => { e.currentTarget.src = poster_placeholder; }}
                />
                <div className="movie-card-name">{item.name}</div>
                {item.job && <div className="movie-card-role">{item.job}</div>}
            </div>
        );
    };

    const render_featured_crew = () => {
        if(crew != null){
            return (
                <div className="section movie-data-row">
                    <h3>Featured Crew</h3>
                    <div className="movie-card-list">
                        {crew.map((c) => render_crew_card(c))}
                    </div>
                </div>
            );
        }
    };

    const render_also_liked_card = (item) => {
        return (
            <div className="movie-card" key={item.id || item.name} onClick={() => on_movie_click(item.id)}>
                <img
                    src={item.poster_th_url || poster_placeholder}
                    alt={item.title}
                    onError={(e) => { e.currentTarget.src = poster_placeholder; }}
                />
                <div className="movie-card-name">{item.title}</div>
            </div>
        );
    };


    const render_people_also_liked = () => {
        if((also_liked != null) && (also_liked.length > 0)){
            return (
                <div className="section movie-data-row">
                    <h3>People Also Liked</h3>
                    <div className="movie-card-list">
                        {also_liked.map((m) => render_also_liked_card(m))}
                    </div>
                </div>
            );
        }
    };

    // <div className="movie-view">

    /*

    */

    if(movie != null){
        return (

            <div className="movie-view-background">
                    {render_movie_header()}
                    <Container className="mt-4 fluid movie-view">
                        <Row className="movie-title-header">
                            <Col md={3}>{render_movie_poster()}</Col>
                            <Col md={6}>{render_movie_overview()}</Col>
                            <Col md={3}>{render_movie_data()}</Col>
                        </Row>
                      
                        <Row className="movie-data-rows">
                            {render_featured_cast()}
                            {render_featured_crew()}
                            {render_people_also_liked()}
                        </Row>
                    </Container>
                    

            </div>
        );
    }
    return <div/>
}

export default MovieView;

