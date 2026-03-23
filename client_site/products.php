<!-- Meghan Andrews - 2/2/2026 -->
<!-- This is the products page for Criter Heaven Crafts, showcasing the handmade products with detailed descriptions and purchase options. -->
<?php
    // PHP object class for items that will be displayed on the products page, with properties for name, price, description, stock status, and quantity available. 
    // The class includes methods for purchasing an item and checking stock status.
    class Item {
        public string $name;
        public float $price;
        public string $description;
        public bool $stock;

        public int $quantity;

        function __construct(string $name, float $price, string $description, bool $stock, int $quantity) {
            $this->name = $name;
            $this->price = $price;
            $this->description = $description;
            $this->stock = $stock;
            $this->quantity = $quantity;
        }

        function purchase() 
        {
            if ($this->stock === "In Stock" && $this->quantity > 0) {
                $this->quantity--;
                if ($this->quantity === 0) {
                    $this->stock = false;
                }
                return true;
            }
            return false;
        }

        function inStock() {
            if($this->stock === true && $this->quantity > 0) {
                return "In Stock";
            }
            return "Out of Stock";
        }
    }

    $items = [
        new Item("Assorted Cards", 10.00, "Assorted greeting cards with unique designs.", true, 10),
        new Item("Papercraft Item", 15.00, "Handmade papercraft items with intricate designs.", true, 5),
        new Item("Alcohol Ink Flower", 30.00, "Stunning alcohol ink flower artwork on canvas.", true, 3),
        new Item("Alcohol Ink Tile", 25.00, "Alcohol ink flower designs on decorative tiles.", true, 7),
        new Item("Shadowbox", 40.00, "Elegant shadowbox displays for your cherished items.", true, 2),
        new Item("Cardinal Lantern", 25.00, "A beautiful handmade cardinal lantern, perfect for home decor.", true, 4)
    ];
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
             <?php foreach ($items as $item) { ?>
                <div class="item" data-description="<?php echo $item->description; ?>" data-stock="<?php echo $item->inStock(); ?>">
                    <img src="images/product_placeholder.png" alt="<?php echo $item->name; ?>" height="150">
                    <h3><?php echo $item->name; ?></h3>
                    <p>$<?php echo $item->price; ?></p>
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

        <!-- Footer Section - copyright and contact information-->
        <footer>
            <h1> Critter Haven Crafts</h1>
            <p>© 2026 All rights reserved. Handmade with love.</p>
        </footer>

        <script src="js/products.js"></script>

    </body>
</html>