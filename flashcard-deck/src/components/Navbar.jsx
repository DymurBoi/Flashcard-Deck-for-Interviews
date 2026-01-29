import { Link } from "react-router-dom";
import "../styles/home.css";
import Typography from "@mui/material/Typography";
function Navbar(){
    return (
        <nav className="navbar">
            <Typography sx={{marginLeft: '4rem', fontSize: 30, fontWeight:'bold'}}>Flashcards</Typography>
            <div className="nav-links">
                <Link className="no-style-link" to="/">Home</Link>
            </div>
        </nav>
    );
}

export default Navbar