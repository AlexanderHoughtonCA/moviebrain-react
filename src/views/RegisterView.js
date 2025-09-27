import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { validate_username, validate_password  } from "../InputValidator";
import { render_form_control } from "../components/CommonComponents";
import { MOVIE_BRAIN_URL } from "../Constants";

function RegisterView({on_register}) {
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [confirm_password, set_confirm_password] = useState('');
    const [error, set_error] = useState(null);
    const navigate = useNavigate();

    const handle_submit = async (e) => {
        e.preventDefault();
        set_error(null);

        if (password !== confirm_password) {
            set_error("Passwords do not match");
            return;
        }

        const username_valid = validate_username(username);
        if (!username_valid.valid) {
            set_error("Username invalid: " + username_valid.message);
            return;
        }
        else{
            set_error(null);
        }

        const password_valid = validate_password(password);
        if (!password_valid.valid) {
            set_error("Password invalid: " + password_valid.message);
        } else {
            set_error(null);
        }

        try {
            const response = await axios.post(MOVIE_BRAIN_URL + "/auth/register", {
                username: username,
                password: password
            });

            const registered = (response.status === 200) && (response.data.result != "user_already_registered");
            if(registered) {
                set_error(null);
                localStorage.setItem("registered", true);
                on_register(registered);
                navigate("/auth/login");
            } else {

                if(response.data.result == "user_already_registered"){
                    set_error('Username already registered - please pick another!');
                }
                else
                if(response.data.result != null){
                    set_error(response.data.result);
                }
                else{
                    set_error("Registration failed");
                }
            }
        } catch (err) {
            set_error(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row>
                <Col>
                    <Card style={{ width: '24rem', padding: '1.5rem' }}>
                        <Card.Body>
                            <Card.Title className="mb-4 text-center">Register</Card.Title>
                            {error && <div className="alert alert-danger">{error}</div>}
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
                                {render_form_control({
                                    id: "confirm_password",
                                    label: "Confirm Password",
                                    type: "password",
                                    value: confirm_password,
                                    onChange: (e) => set_confirm_password(e.target.value),
                                    placeholder: "Confirm password",
                                    required: true
                                })}
                                <Button type="submit" variant="primary" className="w-100 movie-brain-button">
                                    Register
                                </Button>
                            </Form>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterView;
