import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import poster1 from "../assets/posters/poster1.jpg";
import poster2 from "../assets/posters/poster2.jpg";
import poster3 from "../assets/posters/poster3.jpg";
import poster4 from "../assets/posters/poster4.jpg";
import poster5 from "../assets/posters/poster5.jpg";

function ShowcaseView() {
    const initial_movies = [
        { poster: poster1 },
        { poster: poster2 },
        { poster: poster3 },
        { poster: poster4 },
        { poster: poster5 },
    ];

    const features = [
        "Uncover hidden gems tailored to your tastes",
        "Experience smarter, AI-driven recommendations",
        "Build your own watchlist and rate every movie",
        "See what other movie lovers are watching right now",
        "Dive into detailed cast, crew, and trivia insights"
    ];

    const [sample_movies, set_sample_movies] = useState(initial_movies);
    const [current_movie, set_current_movie] = useState(0);
    const [current_feature, set_current_feature] = useState(0);

    useEffect(() => {

        const shuffled = [...initial_movies].sort(() => Math.random() - 0.5);
        set_sample_movies(shuffled);

        const movie_timer = setInterval(() => {
            set_current_movie((prev) => (prev + 1) % sample_movies.length);
        }, 5000);

        const feature_timer = setInterval(() => {
            set_current_feature((prev) => (prev + 1) % features.length);
        }, 4000);

        return () => {
            clearInterval(movie_timer);
            clearInterval(feature_timer);
        };
    }, []);

    const movie = sample_movies[current_movie];
    const feature = features[current_feature];

    return (
        <div
            style={{
                backgroundImage: `url(${movie.poster})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textShadow: "0 0 10px rgba(0,0,0,0.8)",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.6)"
                }}
            />
            <Container style={{ zIndex: 1 }}>
                <Row className="text-center">
                    <Col>
                        <h1 className="mb-4">Welcome to Movie Brain</h1>
                        <h3 className="mb-5">{feature}</h3>                      
                        <div className="mt-4">
                            <Link to="/auth/register">
                                <Button variant="primary" className="movie-brain-button" size="lg">
                                    Register to Begin
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ShowcaseView;
