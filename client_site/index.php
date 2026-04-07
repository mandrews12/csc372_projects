<!-- Meghan Andrews - 2/2/2026 -->
<?php
    session_start();
    require_once __DIR__ . '/includes/database.php';

    // Handle login form submission
    if (isset($_POST['username'])) {
        $username = $_POST['username'];

        // Store in session
        $_SESSION['username'] = $username;

        // Store in cookie
        setcookie("username", $username, time() + 86400, "/");

        // Store last visit cookie
        setcookie("lastVisit", date("Y-m-d H:i:s"), time() + 86400, "/");
    }

    // Handle logout
    if (isset($_GET['logout'])) {
        session_unset();
        session_destroy();

        setcookie("username", "", time() - 3600, "/");

        header("Location: index.php");
        exit();
    }

    

    // Example query
    $stmt = $pdo->query("SELECT * FROM users");
    $users = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<?php
$pageTitle = 'Home | Critter Haven Crafts';
$activePage = 'home';
include 'includes/head.php';
?>

    <body>
        <!-- LOGIN MODAL -->
        <div id="loginModal" class="login-modal" style="display: none;">
            <div class="login-modal-content">
                <span class="close" id="close-login-btn"> x </span>
                <h2>Welcome </h2>
                <!-- Login View -->
                <div id="login-view">
                    <form method="POST" action="index.php">
                        <input type="text" name="username" placeholder="User Name" required />
                        <input type="password" name="password" placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
                <!-- Signup View -->
                <div id="signup-view" style="display: none;">
                    <form method="POST" action="index.php">
                        <input type="text" name="username" placeholder="User Name" required />
                        <input type="text" name="email" placeholder="Your Email" required />
                        <input type="password" name="password" placeholder="Password" />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <hr>
                <div id="loginToggle">
                    <p id="toggle-text">New User?</p>
                    <button id="toggle-btn"> Sign Up </button>
                </div>
            </div>
        </div>

        <?php include 'includes/header.php'; ?>

        <!-- Main Content Sections -->
        <div class = "header-card" id="welcome-card">
            <p> HANDCRAFTED GOODS </p>
            <h1>Critter Haven Crafts</h1>
            <h3>Handmade pieces that bring warmth and personality into your everyday life</p>
            <button onclick="location.href='products.html'">Explore Collection</button>
        </div>

        <!-- A brief overview of the brand that links to the About page -->
        <div class = "card" id="about">
            <div class="about-content">
                <h1>Our Story</h1>
                <hr>
                <p>Critter Haven Crafts creates handmade, one-of-a-kind pieces designed to bring warmth, creativity, and personality into everyday life. Each item is thoughtfully crafted with care and attention to detail, offering unique gifts and décor you won’t find in mass-produced stores.   </p>
                <button onclick="location.href='about.html'">Learn More</button>
            </div>
        </div>

        <!-- Place for featured items that are new to the site -->
        <div class = "card">
            <h1>Featured Items</h1>
            <div class="featured-items">
                <div class="item">
                <img src="images/product_placeholder.png" alt="Cardinal Lantern Img" height="150">
                    <h3>Cardinal Lantern</h3>
                    <p>$25.00</p>
                    <button onclick="location.href='products.html'">View Details</button>
                </div>
                <div class="item">
                <img src="images/product_placeholder.png" alt="Cardinal Lantern Img" height="150">
                <h3>Cardinal Lantern</h3>
                <p>$25.00</p>
                <button onclick="location.href='products.html'">View Details</button>
            </div>
            <div class="item">
                <img src="images/product_placeholder.png" alt="Cardinal Lantern Img" height="150">
                <h3>Cardinal Lantern</h3>
                <p>$25.00</p>
                <button onclick="location.href='products.html'">View Details</button>
            </div>
            <div class="item">
                <img src="images/product_placeholder.png" alt="Alcohol Ink Flower Img" height="150">
                    <h3>Alcohol Ink Flower</h3>
                    <p>$30.00</p>
                    <button onclick="location.href='products.html'">View Details</button>
                </div>
                <div class="item">
                <img src="images/product_placeholder.png" alt="Asorted Cards Img" height="150">
                <h3>Asorted Cards</h3>
                    <p>$10.00</p>
                    <button onclick="location.href='products.html'">View Details</button>
                </div>
            </div>
        </div>

        <!-- A section highlighting the benefits of shopping with Critter Haven Crafts -->
        <div class="card" id="benefits">
            <h1>Why Choose Us</h1>
            <hr>
            <div class="benefit-grid">
                <div class="benefit">
                    <i class="fa-solid fa-paintbrush"></i>
                    <div>
                        <h3>Unique Designs</h3>
                        <p>Each item is crafted with care, ensuring you receive a one-of-a-kind piece.</p>
                    </div>
                </div>
                <div class="benefit">
                    <i class="fa-solid fa-gem"></i>
                    <div>
                        <h3>Quality Materials</h3>
                        <p>We use only the finest materials to create durable and beautiful crafts.</p>
                    </div>
                </div>
                <div class="benefit">
                    <i class="fa-solid fa-heart"></i>
                    <div>
                        <h3>Support Local Crafters</h3>
                        <p>By shopping with us, you support local artisans and their craft.</p>
                    </div>
                </div>
                <div class="benefit">
                    <i class="fa-solid fa-gift"></i>
                    <div>
                        <h3>Perfect Gifts</h3>
                        <p>We prioritize your satisfaction and strive to provide excellent customer service.</p>
                    </div>
                </div>
            </div>
        </div>

        <script src="js/api.js"></script> 

        <?php include 'includes/footer.php'; ?>