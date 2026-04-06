<!-- Meghan Andrews - 2/2/2026 -->
<!-- This is the products page for Criter Heaven Crafts, showcasing the handmade products with detailed descriptions and purchase options. -->
<?php
    require_once './includes/database.php';

    function get_all_products(PDO $pdo) {
        $stmt = pdo($pdo, "SELECT * FROM products");
        return $stmt->fetchAll();
    }
    $products = get_all_products($pdo);
?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="description" content="Criter Heaven Crafts - Unique handmade crafts and artisan products. Discover one-of-a-kind jewelry, home decor, and gifts crafted with care.">
        <meta property="og:title" content="Criter Heaven Crafts - Gallery">
        <meta property="og:description" content="Explore unique handmade crafts and artisan products at Criter Heaven Crafts. From jewelry to home decor, find the perfect gift crafted with love.">
        <meta property="og:image" content="documentation/logo.png">
        <meta property="og:url" content="https://criterheavencrafts.com/products.html">
        <meta property="og:type" content="website">

        <title>Criter Heaven Crafts - Shop</title> 
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
                <a href="products.php" class="active">Shop</a>
                <a href="contact.php">Contact</a>
                <a href="update_prod.php" >Update Products</a>
            </nav>
        </div>

        <div class = "header-card">
            <h1>Our Shop</h1>
        </div>

        <div class="card" id="filters">
            <h1>Filter by Category</h1>
            <hr>
            <div class="cat-options">
                <button class="cat-btn" data-category="all">All</button>
                <button class="cat-btn" data-category="papercrafts">Papercrafts</button>
                <button class="cat-btn" data-category="ink-flowers">Ink Flowers</button>
                <button class="cat-btn" data-category="shadowboxes">Shadowboxes</button>
                <button class="cat-btn" data-category="cards">Cards</button>
            </div>
        </div>
        <div class = "card">
            <h1>Shop</h1>
            <!-- Category Sections -->
             <div id="cards" class="category">
             <?php foreach ($products as $item) { ?>
                <div class="item" data-description="<?php echo $item['description']; ?>" data-stock="<?php if ($item['in_stock'] == 1) { echo 'In Stock'; } else { echo 'Out of Stock'; } ?>">
                    <img src="images/product_placeholder.png" alt="<?php echo $item['product_name']; ?>" height="150">
                    <h3><?php echo $item['product_name']; ?></h3>
                    <p>$<?php echo $item['price']; ?></p>
                    <button class="view-details">View Details</button>
                </div>
            <?php } ?>
            </div>
        </div>

        <!-- Product Modal that is called using JavaScript and is placeholders that will be dynamically filled with information -->
        <div id="product-modal" class="modal">
            <div class="modal-content">
                <span class="close"> x </span>
                <img id="modal-image" src="" alt="" height="300">
                <div class="text-content">
                    <h2 id="modal-title"></h2>
                    <p id="modal-price"></p>
                    <p id="modal-description"></p>
                    <p id="modal-stock"></p>
                    <button id="buy-now">Buy Now</button>
                    <button id="contact-seller">Contact Seller</button>
                </div>
            </div>
        </div>

        <?php include 'includes/footer.php'; ?>