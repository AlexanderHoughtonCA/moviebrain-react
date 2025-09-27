import React from 'react';
import { Form } from 'react-bootstrap';

export function render_form_control({ id, label, type = "text", value, onChange, placeholder = "", required = false }) {
    return (
        <Form.Group controlId={id} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </Form.Group>
    );
}
