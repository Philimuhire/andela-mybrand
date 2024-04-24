import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="nav">
            <div className="nav-left">
                <span className="name">PHILBERT MUHIRE</span>
            </div>
            <div className="nav-middle" id="navLinks">
                <a href="/landing-page/index.html">HOME</a>
                <a href="/about-page/about.html">ABOUT ME</a>
                <a href="/skills-page/skills.html">SKILLS</a>
                <a href="/portfolio-page/portfolio.html">PORTFOLIO</a>
                <a href="/blogs-page/blogs.html">BLOG</a>
                <a href="/login-page/login.html">LOGIN</a>
            </div>
            <div className="nav-right">
                <a href="/contact-page/contact.html">CONTACT ME</a>
            </div>
            <div className="menu-icon" id="menuIcon">
                <i className="fas fa-bars"></i>
            </div>
        </header>
    );
}

export default Header;