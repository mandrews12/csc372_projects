<!-- Meghan Andrews - 2/2/2026 -->
<!-- This is the contact page for Critter Haven Crafts, providing contact information and a form for customers to reach out with inquiries or feedback. -->
<!DOCTYPE html>
<html lang="en">
<?php
$pageTitle = 'Contact | Critter Haven Crafts';
$ogTitle = 'Critter Haven Crafts - Handmade Artisan Products';
$activePage = 'contact';
include 'includes/head.php';
?>

<body>
    <?php include 'includes/login_modal.php'; ?>
    <?php include 'includes/header.php'; ?>

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

    <?php include 'includes/footer.php'; ?>