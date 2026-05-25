import './index.scss'
import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faEnvelope, faFolderOpen, faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import LogoA from '../../assets/images/profile.jpg'
import { faGithub, faLinkedin, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
import socials from '../../data/socials.json'

const Sidebar = () => {
    const [showNav, setShowNav] = useState(false)
    
    const handleBackdropClick = () => {
        setShowNav(false);
    };
    
    return(
        <>
            {showNav && <div className="mobile-backdrop" onClick={handleBackdropClick}></div>}
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
                <FontAwesomeIcon icon = {faClose} color="#ff6b6b" size = "3x" className="close-icon" onClick={() => setShowNav(false)} />
            </nav>
            <ul>
                {socials.socials.map((s) => {
                    const icon = {
                        linkedin: faLinkedin,
                        github: faGithub,
                        youtube: faYoutube,
                        twitter: faTwitter
                    }[s.name];

                    return s.url ? (
                        <li key={s.name}>
                            <a target="_blank" rel="noreferrer" href={s.url}>
                                <FontAwesomeIcon icon={icon} color="#4d4d4e" />
                            </a>
                        </li>
                    ) : null;
                })}
            </ul>
            <FontAwesomeIcon onClick={() => setShowNav(true)} icon={faBars} color="#ff6b6b" size="3x" className="hamburger-icon" />
        </div>
        </>
    )
}

export default Sidebar 