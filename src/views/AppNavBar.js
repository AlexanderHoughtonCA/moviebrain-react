import {  Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const register_route = "/auth/register";
const login_route = "/auth/login";
const search_route = "/search";

function AppNavBar({is_logged_in, is_registered, on_logout}) {
    const location = useLocation();
    const navigate = useNavigate();

    const render_register_login_link = ()=> {
        if(!is_registered && location.pathname !== register_route){
            return <Nav.Link as={Link} to={register_route}>Register</Nav.Link>;
        }

        if(!is_logged_in && 
            (location.pathname !== register_route) &&
            (location.pathname !== login_route)){
            return <Nav.Link as={Link} to={login_route}>Login</Nav.Link>;
        }

        if(is_logged_in){
            return render_logout_link();
        }
        return null;
    };

    const render_search_link = ()=>{
         if(is_logged_in){
            return <Nav.Link as={Link} to="/search">Search Movie</Nav.Link>
         }
    }

    const render_logout_link = ()=>{
            return <Nav.Link onClick={on_logout}>Logout</Nav.Link>
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">MovieBrain</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {render_search_link()}
                    </Nav>
                    <Nav className="ms-auto">
                        {render_register_login_link()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavBar;
