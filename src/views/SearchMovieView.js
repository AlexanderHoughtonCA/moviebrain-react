

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

import "../app.css";

import Utils from "../Utils";
import { validate_search   } from "../InputValidator";
import poster_placeholder from "../assets/movie-clapboard.png";

import { render_form_control } from "../components/CommonComponents";
import { MOVIE_BRAIN_URL } from "../Constants";

function SearchMovieView({is_logged_in}) {
    const navigate = useNavigate();

    var { query } = useParams();

    const [error, set_error] = useState(null);
    const [search_query, set_search_query] = useState("");
    const [movies, set_movies] = useState([]);
    const [show_more_active, set_show_more_active] = useState(false);

    const [page, set_page] = useState(0);
    const [per_page] = useState(12);
    const [has_searched, set_has_searched] = useState(false);

    useEffect(() => {
        if (query && query.trim().length > 0) {
            const fixed_query = decodeURIComponent(query.trim());
            set_search_query(fixed_query);
            set_page(0);
            run_search(query, 0, true);
            return;
        }
        else{
            localStorage.getItem("search_results", null);
            localStorage.getItem("search_query", null);
        }

        const saved_results = localStorage.getItem("search_results");
        const saved_query = localStorage.getItem("search_query");
        if (saved_results && saved_query) {
            set_search_query(saved_query);
            const parsed = JSON.parse(saved_results);
            set_movies(parsed);
            set_show_more_active(parsed.length > 0);
            set_has_searched(true);
            return;
        }

        set_movies([]);
        set_show_more_active(false);
        set_has_searched(false);
    }, [query]);

    const unique_by_id = (list) => {
        const seen = {};
        const out = [];
        for (let i = 0; i < list.length; i++) {
            const m = list[i];
            if (!m || !m.id) continue;
            if (!seen[m.id]) {
                seen[m.id] = true;
                out.push(m);
            }
        }
        return out;
    };

    const store_search_results = (results, query) => {
        localStorage.setItem("search_results", JSON.stringify(results));
        if (query != null && query !== "") {
            localStorage.setItem("search_query", query);
        }
        set_movies(results);
        set_show_more_active(results.length > 1);
    };

    const fetch_movies = async (query, start_page) => {
        const response = await axios.post(
            MOVIE_BRAIN_URL + "/movie_by_title",
            { search: query, page: start_page, per_page }
        );
        if (response.status === 200 && response.data) {
            const found = [];
            for (let i = 0; i < response.data.length; i++) {
                const m = response.data[i];
                if (m && m.overview != null) {
                    m.overview = Utils.shorten(m.overview, 160);
                }
                found.push(m);
            }
            return found;
        }
        return [];
    };

    const run_search = async (query, start_page = 0, replace_url = false) => {
        set_error(null);
        set_show_more_active(false);

        const search_valid = validate_search(query, 2, 200);
        if (!search_valid.valid) {
            set_error("Search invalid: " + search_valid.message);
            return;
        } else {
            set_search_query(search_valid.value);
            query = search_valid.value;
        }

        console.log("query: ", query);

        const next = await fetch_movies(query, start_page);
        set_has_searched(true);

        if (start_page === 0) {
            store_search_results(next, query);
        } else {
            set_movies(prev => {
                const merged = unique_by_id([...prev, ...next]);
                localStorage.setItem("search_results", JSON.stringify(merged));
                return merged;
            });
            set_show_more_active(next.length > 1);
        }

        if (replace_url) {
            const target = "/search/" + encodeURIComponent(query);
            if (window.location.pathname !== target) {
                navigate(target, { replace: true });
            }
        }
    };

    const handle_search = async (e) => {
        e.preventDefault();
        const query = search_query.trim();
        if (query === "") return;
        set_page(0);
        set_movies([]);
        set_show_more_active(false);
        await run_search(query, 0, true);
    };

    const on_show_more = async () => {
        set_page(prev_page => {
            const next_page = prev_page + 1;
            run_search(search_query, next_page, false);
            return next_page;
        });
    };

    const on_movie_click = (movie_id) => {
        if (movie_id) navigate("/movie/" + movie_id);
    };

    const render_movie_data = (movie) => {
        const release_date = (movie.release_date != null) ? new Date(movie.release_date) : null;
        const date_str = release_date ? release_date.getFullYear().toString() : "";
        return (
            <Row className="movie-row" key={movie.id} onClick={() => on_movie_click(movie.id)}>
                <Col className="movie-row-image-col">
                    <img
                        src={movie.poster_th_url || poster_placeholder}
                        className="movie-row-image"
                        onError={(e) => { e.currentTarget.src = poster_placeholder; }}
                        alt={movie.title}
                    />
                </Col>
                <Col className="movie-row-text-col">
                    <Row>
                        <Col md={12} className="movie-row-title">{movie.title}</Col>
                        <Col md={12}>{date_str}</Col>
                        <Col md={12}>{movie.overview}</Col>
                    </Row>
                </Col>
            </Row>
        );
    };

    //   {movies.map(m => render_movie_data(m))}

    const render_search_section = () => {
       if(has_searched){
        return <React.Fragment>
                    {render_movies()}
                    {render_show_more_button()}
                </React.Fragment>
       }
    };

    const render_movies = () => {
        return (
            <Row className="movie-list">
                {movies.map(m => render_movie_data(m))}
            </Row>
        );
    };

    const render_show_more_button = () => {
        if (show_more_active) {
            return <button onClick={on_show_more} className="show-more-button">Show more</button>;
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h2>{has_searched && search_query ? `Search Results for "${search_query}"` : "Search Movies"}</h2>
                     {error && <div className="alert alert-danger">{error}</div>}
                    <Form onSubmit={handle_search}>
                        {render_form_control({
                            id: "search_query",
                            value: search_query,
                            onChange: (e) => set_search_query(e.target.value),
                            placeholder: "Enter movie title",
                            required: true
                        })}
                        <Button type="submit" className="mt-3 movie-brain-button search-button">Search</Button>
                    </Form>

                    <div className="search-section">
                        {render_search_section()}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default SearchMovieView;
