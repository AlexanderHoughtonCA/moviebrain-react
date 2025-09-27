import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { validate_username, validate_password  } from "../InputValidator";
import { render_form_control } from "../components/CommonComponents";
import { MOVIE_BRAIN_URL } from "../Constants";

function LoginView({on_login}) {
    const [username, set_username] = useState("");
    const [password, set_password] = useState("");
    const [error, set_error] = useState("");
    const navigate = useNavigate();

    const handle_submit = async (e) => {
        e.preventDefault();
        set_error(null);

        const username_valid = validate_username(username);
        if (!username_valid.valid) {
            set_error("Username invalid: " + username_valid.error);
            return;
        }
        else{
            set_error(null);
        }

        const password_valid = validate_password(password);
        if (!password_valid.valid) {
            set_error("Password invalid: " + password_valid.error);
        } else {
            set_error(null);
        }

        try {
            const response = await axios.post(MOVIE_BRAIN_URL + "/auth/login", {
                username: username,
                password: password
            });

            if (response.status === 200 && response.data.token) {
                localStorage.setItem("token", response.data.token);
                on_login();
                navigate("/");
            } else {
                set_error("Login failed");
            }
        } catch (err) {
            set_error(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handle_submit}>
                        {render_form_control({
                            id: "username",
                            label: "Username",
                            value: username,
                            onChange: (e) => set_username(e.target.value),
                            placeholder: "Enter username",
                            required: true
                        })}
                        {render_form_control({
                            id: "password",
                            label: "Password",
                            type: "password",
                            value: password,
                            onChange: (e) => set_password(e.target.value),
                            placeholder: "Enter password",
                            required: true
                        })}
                        <div className="d-grid mt-3">
                            <Button variant="primary" type="submit" className="movie-brain-button">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

}

export default LoginView;
