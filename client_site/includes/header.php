<?php
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}
$activePage = $activePage ?? '';
function navClass(string $page): string {
    global $activePage;
    return $activePage === $page ? ' class="active"' : '';
}
?>
<div class="header">
    <img src="documentation/logo.png" alt="Critter Haven Crafts Logo" height="200">
    <nav>
        <a href="index.php"<?= navClass('home') ?>>Home</a>
        <a href="about.php"<?= navClass('about') ?>>About</a>
        <a href="products.php"<?= navClass('products') ?>>Shop</a>
        <a href="contact.php"<?= navClass('contact') ?>>Contact</a>
        <a href="update_prod.php"<?= navClass('update') ?>>Update Products</a>
        <?php if (isset($_SESSION['username'])): ?>
            <div id="user-info">
                <span>Welcome, <?= htmlspecialchars($_SESSION['username']) ?></span>
                <a href="index.php?logout=true">Logout</a>
            </div>
        <?php else: ?>
            <button id="nav-login-btn">
                <i class="fa-solid fa-right-to-bracket"></i> Login
            </button>
        <?php endif; ?>
    </nav>
</div>
