<?php
    // Include validation functions
    require_once 'validation.php';
    require_once './includes/database.php';

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

        // Determine the operation
        $operation = $_POST['op'] ?? '';

        if ($operation === "Add Product") {
            // Collect data
            $values['product_name'] = $_POST['product_name'] ?? '';
            $values['category'] = $_POST['category'] ?? '';
            $values['price'] = $_POST['price'] ?? '';
            $values['description'] = $_POST['description'] ?? '';
            $values['featured'] = isset($_POST['featured']) ? 1 : 0;
            $values['stocked'] = isset($_POST['stocked']) ? 1 : 0;
            $values['created_date'] = $_POST['created_date'] ?? '';
            
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

            function add_product(PDO $pdo, array $values) {
                $sql = "INSERT INTO products (product_name, category, price, description, featured, in_stock, created_date) 
                        VALUES (:product_name, :category, :price, :description, :featured, :stocked, :created_date)";
                pdo($pdo, $sql, [
                    ':product_name' => $values['product_name'],
                    ':category' => $values['category'],
                    ':price' => $values['price'],
                    ':description' => $values['description'],
                    ':featured' => $values['featured'],
                    ':stocked' => $values['stocked'],
                    ':created_date' => $values['created_date']
                ]);
            }

            // Check if form is valid
            if (implode("", $errors) === "") {
                add_product($pdo, $values);
                $message = "Product added successfully!";
            } else {
                $message = "Please fix the errors below.";
            }

        } else if ($operation === "Update Product") {
            // Placeholder for update logic
            $message = "Update functionality coming soon!";
        } else if ($operation === "Delete Product") {
            // Placeholder for delete logic
            $values['product_id'] = $_POST['product_id'] ?? '';

            function delete_product(PDO $pdo, int $product_id) {
                $sql = "DELETE FROM products WHERE id = :id";
                pdo($pdo, $sql, [':id' => $product_id]);
            }

            delete_product($pdo, $values['product_id']);
            $message = "Product deleted successfully!";
        }

    function get_all_products(PDO $pdo) {
        $sql = "SELECT id, product_name FROM products";
        return pdo($pdo, $sql)->fetchAll();
    }

    $products = get_all_products($pdo);
    }
?>

<!DOCTYPE html>
<html lang="en">
<?php
$pageTitle = 'Update Products | Critter Haven Crafts';
$activePage = 'update';
include 'includes/head.php';
?>

    <body>
        <?php include 'includes/login_modal.php'; ?>

        <?php include 'includes/header.php'; ?>

        <div class = "header-card">
            <h1>Our Shop</h1>
        </div>

        <div class="card" id="filters">
            <h1>Filter by Category</h1>
            <hr>
            <div class="cat-options">
                <button class="cat-btn" id="add-btn" data-category="add"> Add New Item</button>
                <button class="cat-btn" id="update-btn" data-category="update">Update Item</button>
                <button class="cat-btn" id="delete-btn" data-category="delete">Delete Item</button>
            </div>
        </div>

        <div class="card" style="display: block;" id="add-section">
            <h2>Add a New Product</h2>

            <!-- Message -->
            <?php if ($message): ?>
                <p><?= htmlspecialchars($message) ?></p>
            <?php endif; ?>
            
            <!-- Add New Product Form -->
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

                <!-- Date product was created -->
                 <label>Created Date</label>
                    <input type="date" name="created_date" id = "created_date">
                    
                <input type="submit" name="op" value="Add Product">

            </form>
        </div>

        <div class="card" style="display:none;" id="update-section">
            <h2>Update Existing Product</h2>

            <!-- Update Product Form -->
            <form method="POST" action="update_prod.php">
                <label>Select Product to Update</label>
                <select name="product_id">
                    <?php foreach ($products as $product): ?>
                        <option value="<?= $product['id'] ?>">
                            <?= $product['product_name'] ?>
                        </option>
                    <?php endforeach; ?>
                </select>
                <input type="submit" name = "op" value="Update Product">
            </form>

        </div>

        <div class="card" style="display:none;" id="delete-section">
            <h2>Delete Existing Product</h2>

            <!-- Delete Product Form -->
            <form method="POST" action="update_prod.php">
                <label>Select Product to Delete</label>
                <select name="product_id">
                    <?php foreach ($products as $product): ?>
                        <option value="<?= $product['id'] ?>">
                            <?= $product['product_name'] ?>
                        </option>
                    <?php endforeach; ?>
                </select>
                <input type="submit" name = "op" value="Delete Product">
            </form>

        </div>

        <script src="js/update.js"></script>

    </body>
</html>