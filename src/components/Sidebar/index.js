import './index.scss'
import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faEnvelope, faFolderOpen, faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import LogoA from '../../assets/images/A.svg'
import { faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'

const Sidebar = () => {
    const [showNav, setShowNav] = useState(false)
    return(
        <div className = 'nav-bar'> 
            <Link className = "logo" to="/"> 
                <img src = {LogoA} alt="logo" />
                <span className="author-name">Ali J.</span>
            </Link>
            <nav className={showNav ? 'mobile-show' : ""}>
                <NavLink exact="true" activeclassname = "active" to="/">
                    <FontAwesomeIcon icon = {faHome} color = "#4d4d4e" onClick={() => setShowNav(false)} />
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "about-link" to="/about">
                    <FontAwesomeIcon icon = {faUser} color = "#4d4d4e" onClick={() => setShowNav(false)}/>
                </NavLink>

                <NavLink exact="true" activeclassname = "active" className = "projects-link" to="/projects">
                    <FontAwesomeIcon icon = {faFolderOpen} color = "#4d4d4e" onClick={() => setShowNav(false)}/>
                </NavLink>

                <NavLink exact="true" activeclassname = "active" className = "contact-link" to="/contact">
                    <FontAwesomeIcon icon = {faEnvelope} color = "#4d4d4e" onClick={() => setShowNav(false)}/>
                </NavLink>
                <FontAwesomeIcon icon = {faClose} color="#ffd700" size = "3x" className="close-icon" onClick={() => setShowNav(false)} />
            </nav>
            <ul>
                <li>
                    <a target = "_blank" rel = "noreferrer" href = "https://www.linkedin.com/in/ali-jamil-dev/">
                        <FontAwesomeIcon icon={faLinkedin} color = "#4d4d4e" />
                    </a>
                </li>
                <li>
                    <a target = "_blank" rel = "noreferrer" href = "https://github.com/ALIJAMIL-dev">
                        <FontAwesomeIcon icon={faGithub} color = "#4d4d4e" />
                    </a>
                </li>
                <li>
                    <a target = "_blank" rel = "noreferrer" href = "https://www.youtube.com/@alijamil-dev">
                        <FontAwesomeIcon icon={faYoutube} color = "#4d4d4e" />
                    </a>
                </li>
            </ul>
            <FontAwesomeIcon onClick={() => setShowNav(true)} icon={faBars} color="#ffd700" size="3x" className="hamburger-icon" />
        </div>
    )
}

export default Sidebar 