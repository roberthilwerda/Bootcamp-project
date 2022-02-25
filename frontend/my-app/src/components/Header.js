import React from 'react'

const Header = () => {
    return (
        <header>
            <div id="brand"><a href="/">MyCompany</a></div>
            <nav>
                <ul>
                <li><a href="/home">Contact</a></li>
                <li><a href="/products">About</a></li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;