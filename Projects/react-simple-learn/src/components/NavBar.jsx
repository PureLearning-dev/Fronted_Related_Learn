import "../css/Navbar.css"
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className={"navbar"}>
            <div className={"navbar-brand"}>
                <Link to={"/"}>Movie App</Link>
            </div>
            <div className={"navbar-links"}>
                <Link to={"/"} className={"navbar-link"}>首页</Link>
                <Link to={"/favorites"} className={"navbar-link"}>我的点赞</Link>
            </div>
        </nav>
    )
}

export default NavBar;