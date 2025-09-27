import "../app.css";

function Footer() {
    return (
        <footer className="footer-section">
            <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 200px", margin: "20px" }}>
                    <h5>About MovieBrain</h5>
                    <p>
                        MovieBrain helps you explore movies, discover casts and crews, 
                        and find recommendations you’ll enjoy. Built with modern web technologies.
                    </p>
                </div>
                <div style={{ flex: "1 1 200px", margin: "20px" }}>
                    <h5>Quick Links</h5>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li><a href="/" style={{ color: "#ffffff" }}>Home</a></li>
                        <li><a href="/about" style={{ color: "#ffffff" }}>About</a></li>
                        <li><a href="/contact" style={{ color: "#ffffff" }}>Contact</a></li>
                        <li><a href="/privacy" style={{ color: "#ffffff" }}>Privacy Policy</a></li>
                    </ul>
                </div>
                <div style={{ flex: "1 1 200px", margin: "20px" }}>
                    <h5>Follow Us</h5>
                    <p>
                        <a href="https://twitter.com" style={{ color: "#ffffff" }}>Twitter</a><br />
                        <a href="https://facebook.com" style={{ color: "#ffffff" }}>Facebook</a><br />
                        <a href="https://instagram.com" style={{ color: "#ffffff" }}>Instagram</a>
                    </p>
                </div>
            </div>
            <div style={{
                textAlign: "center",
                paddingTop: "20px",
                borderTop: "1px solid #33415c"
            }}>
                <p>© {new Date().getFullYear()} MovieBrain. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
