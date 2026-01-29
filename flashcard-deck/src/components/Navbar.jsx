import { Link } from "react-router-dom";
import "../styles/home.css";
import Typography from "@mui/material/Typography";
function Navbar(){
    return (
        <nav className="navbar">
            <Typography sx={{marginLeft: '4rem', fontSize: 30, fontWeight:'bold',fontFamily: "Raleway, sans-serif" }}>Flashcards</Typography>
            <div className="nav-links">
                <Link className="no-style-link" to="/"><Typography sx={{fontFamily: "Raleway, sans-serif",fontWeight: 600,fontSize:20}}>Home</Typography></Link>
            </div>
        </nav>
    );
}

export default Navbar