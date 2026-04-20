function Header(props) {
    const active_page = props.active_page;
    return (
        <div class="header">
            <img src="documentation/logo.png" alt="Criter Heaven Crafts Logo" height="200"> </img>
            <nav>
                <a href="index.html" class={active_page === 'home' ? 'active' : ''}>Home</a>
                <a href="about.html" class={active_page === 'about' ? 'active' : ''}>About</a>
                <a href="products.html" class={active_page === 'products' ? 'active' : ''}>Shop</a>
                <a href="contact.html" class={active_page === 'contact' ? 'active' : ''}>Contact</a>
                <div id="user-info">
                    <img id="profile-pic" src="images/product_placeholder.png" alt="Profile Picture" height="30" style="display: none;"></img>
                    <span id="username" style="display: none;"></span>
                </div>
            </nav>
        </div>
    );
}
export default Header;