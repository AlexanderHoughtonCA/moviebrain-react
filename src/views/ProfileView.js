import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { MOVIE_BRAIN_URL } from "../Constants";
import poster_placeholder from "../assets/movie-clapboard.png";
import Utils from "../Utils";

function ProfileView({is_logged_in}) {
    const navigate = useNavigate();
    if(!is_logged_in){
       navigate("/"); 
       return;
    }

    const { id } = useParams();
    const [person, set_person] = useState(null);
    const [filmography, set_filmography] = useState(null);
    const [biography, set_biography] = useState("No biography available.");
    
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState(null);

    useEffect(() => {
        fetch_person();
    }, [id]);

    const fetch_person = async () => {
        try {
            const response = await axios.get(MOVIE_BRAIN_URL + "/person/" + id);
            const person = response.data;
            
            if(person){
                set_biography(person.biography);
               await fetch_person_filmography();
            }

            set_person(person);
            set_loading(false);
        } catch (error) {
            set_error("Failed to load profile");
            set_loading(false);
        }
    };

    const fetch_person_filmography = async () => {
        try {
            const response = await axios.get(MOVIE_BRAIN_URL + "/person/credits/" + id);
            const filmography = response.data;
            set_filmography(filmography);
            set_loading(false);
        } catch (error) {
            set_error("Failed to load profile");
            set_loading(false);
        }
    };

    const on_movie_click = (movie_id)=>{
        if(movie_id){
            navigate("/movie/" + movie_id);
        }
    }

    const render_loading = () => (
        <Container>
            <Row>
                <Col>Loading profile...</Col>
            </Row>
        </Container>
    );

    const render_error = () => (
        <Container>
            <Row>
                <Col>{error}</Col>
            </Row>
        </Container>
    );

    const render_movie_card = (movie) => {
        const release_date = new Date(movie.release_date);

        return (
            <div className="movie-card" 
                    key={movie.id} 
                    onClick={() => on_movie_click(movie.id)}>
                    <img
                        src={movie.poster_th_url || poster_placeholder}
                        alt={movie.title}
                        onError={(e) => { e.currentTarget.src = poster_placeholder; }}
                    />
                    <div className="movie-card-name">{movie.title}</div>
                    {movie.character && (
                        <div className="movie-card-role">{movie.character}</div>
                    )}
                    
                    
                </div>
        );
    }; 

    const render_person = () => (
        <Container className="profile-view mt-4">
            <Row>
                <Col md={3} >
                    <img
                        src={person.profile_url || poster_placeholder}
                        alt={person.name}
                        className="img-fluid"
                        onError={(e) => { e.currentTarget.src = poster_placeholder; }}
                    />
                </Col>
                <Col md={9} className="profile-overview">
                    <h2>{person.name}</h2>
                    {Utils.render_overview_paragraphs(person.biography || biography)}
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <h4>Filmography</h4>
                    <div className="movie-card-list">
                        {filmography && filmography.length > 0 ? (
                            filmography.map((movie) => (
                                render_movie_card(movie)
                            ))
                        ) : (
                            <div>No movies found.</div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );


    if (loading) {
        return render_loading();
    }

    if (error) {
        return render_error();
    }

    return render_person();
}

export default ProfileView;
