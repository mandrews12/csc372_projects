<!-- Meghan Andrews - 2/2/2026 -->
<!-- This is the contact page for Criter Heaven Crafts, providing contact information and a form for customers to reach out with inquiries or feedback. -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="Criter Heaven Crafts - Unique handmade crafts and artisan products. Discover one-of-a-kind jewelry, home decor, and gifts crafted with care.">
    <meta property="og:title" content="Criter Heaven Crafts - Handmade Artisan Products">
    <meta property="og:description" content="Explore unique handmade crafts and artisan products at Criter Heaven Crafts. From jewelry to home decor, find the perfect gift crafted with love.">
    <meta property="og:image" content="documentation/logo.png">
    <meta property="og:url" content="https://criterheavencrafts.com">
    <meta property="og:type" content="website">

    <title>Criter Heaven Crafts</title> 
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>


<body>

    <!-- Header with Logo and Navigation -->
    <div class="header">
        <img src="documentation/logo.png" alt="Criter Heaven Crafts Logo" height="200">
        <nav>
            <a href="index.php">Home</a>
            <a href="about.php">About</a> 
            <a href="products.php">Gallery</a>
            <a href="contact.php" class="active">Contact</a>
            <a href="update_prod.php" >Update Products</a>
        </nav>
    </div>

    <!-- Main Content Sections -->
    <div class = "header-card">
    <h1>Contact Us</h1>
    </div>
    <div class="card" id="contact-form">
        <h1> Get in Touch</h1>
        <hr>
        <p> Have a question, custom order request, or just want to say hello? We'd love to hear from you!</p>
        <form action="mailto:charm_tails@yahoo.com" method="post" enctype="text/plain">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Full Name" name="name" required>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required>
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
            <input type="submit" value="Send Message">
        </form>
    </div>

        <!-- Footer Section - copyright and contact information-->
        <footer>
            <h1> Critter Haven Crafts</h1>
            <p>© 2026 All rights reserved. Handmade with love.</p>
        </footer>
    </body>
</html>