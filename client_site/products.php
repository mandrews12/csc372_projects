<!-- Meghan Andrews - 2/2/2026 -->
<!-- This is the products page for Critter Haven Crafts, showcasing the handmade products with detailed descriptions and purchase options. -->
<?php
    require_once './includes/database.php';

    function get_all_products(PDO $pdo) {
        $stmt = pdo($pdo, "SELECT * FROM products ORDER BY created_date DESC");
        return $stmt->fetchAll();
    }
    $products = get_all_products($pdo);
?>

<!DOCTYPE html>
<html lang="en">
<?php
$pageTitle = 'Shop | Critter Haven Crafts';
$ogTitle = 'Critter Haven Crafts - Gallery';
$ogUrl = 'https://CritterHavencrafts.com/products.html';
$activePage = 'products';
include 'includes/head.php';
?>


    <body>

        <?php include 'includes/header.php'; ?>

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