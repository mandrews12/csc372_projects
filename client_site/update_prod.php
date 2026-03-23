<?php
// Include validation functions
require_once 'validation.php';

// Initial values
$values = [
    'product_name' => '',
    'category' => '',
    'price' => '',
    'description' => '',
    'featured' => 0,
    'stocked' => 0
];

// Error messages
$errors = [
    'product_name' => '',
    'category' => '',
    'price' => '',
    'description' => ''
];

$message = "";

// Allowed categories
$allowedCategories = ['cards', 'papercrafts', 'shadowboxes', 'ink-flowers', 'misc'];

// Check if form submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Collect data
    $values['product_name'] = $_POST['product_name'] ?? '';
    $values['category'] = $_POST['category'] ?? '';
    $values['price'] = $_POST['price'] ?? '';
    $values['description'] = $_POST['description'] ?? '';
    $values['featured'] = isset($_POST['featured']) ? 1 : 0;
    $values['stocked'] = isset($_POST['stocked']) ? 1 : 0;

    // Validate inputs
    if (!validateText($values['product_name'], 2, 50)) {
        $errors['product_name'] = "Product name must be between 2 and 50 characters.";
    }

    if (!validateNumber($values['price'], 0, 1000)) {
        $errors['price'] = "Price must be a number between 0 and 1000.";
    }

    if (!validateOption($values['category'], $allowedCategories)) {
        $errors['category'] = "Invalid category selected.";
    }

    if (!validateText($values['description'], 5, 500)) {
        $errors['description'] = "Description must be at least 5 characters.";
    }

    // Check if form is valid
    if (implode("", $errors) === "") {
        $message = "Product added successfully!";
    } else {
        $message = "Please fix the errors below.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update Products</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
     <!-- Header with Logo and Navigation -->
    <div class="header">
        <img src="documentation/logo.png" alt="Criter Heaven Crafts Logo" height="200">
        <nav>
            <a href="index.php">Home</a>
            <a href="about.php" >About</a> 
            <a href="products.php">Gallery</a>
            <a href="contact.php">Contact</a>
            <a href="update_prod.php" class="active">Update Products</a>
        </nav>
    </div>

    <div class = "header-card">
        <h1>Our Shop</h1>
    </div>

    <div class="card" id="filters">
        <h1>Filter by Category</h1>
        <hr>
        <div class="cat-options">
            <button class="cat-btn" category="add"> Add New Item</button>
            <button class="cat-btn" data-category="update">Update Item</button>
            <button class="cat-btn" data-category="delete">Delete Item</button>
        </div>
    </div>

    <div class="card">
        <h2>Add a New Product</h2>

        <!-- Message -->
        <?php if ($message): ?>
            <p><?= htmlspecialchars($message) ?></p>
        <?php endif; ?>

        <form method="POST" action="update_prod.php">

            <!-- Product Name -->
            <label>Product Name</label>
            <input type="text" name="product_name"
                value="<?= htmlspecialchars($values['product_name']) ?>">
            <p class="error"><?= $errors['product_name'] ?></p>

            <!-- Category -->
            <label>Category</label>
            <select name="category">
                <?php foreach ($allowedCategories as $cat): ?>
                    <option value="<?= $cat ?>"
                        <?= ($values['category'] === $cat) ? 'selected' : '' ?>>
                        <?= $cat ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <p class="error"><?= $errors['category'] ?></p>

            <!-- Price -->
            <label>Price</label>
            <input type="number" name="price" step="0.01"
                value="<?= htmlspecialchars($values['price']) ?>">
            <p class="error"><?= $errors['price'] ?></p>

            <!-- Description -->
            <label>Description</label>
            <textarea name="description"><?= htmlspecialchars($values['description']) ?></textarea>
            <p class="error"><?= $errors['description'] ?></p>

            <!-- Checkboxes -->
            <label>Featured </label>
                <input type="checkbox" name="featured" <?= $values['featured'] ? 'checked' : '' ?>>

            <label>In Stock</label>
                <input type="checkbox" name="stocked" <?= $values['stocked'] ? 'checked' : '' ?>>
                
            <input type="submit" value="Add Product">

        </form>
    </div>

</body>
</html>