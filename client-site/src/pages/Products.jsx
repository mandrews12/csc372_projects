// Component to display the Products page with a list of products fetched from the Supabase database, along with filtering options by category and a modal to view product details
import product_pic from '../assets/product_placeholder.png';
import ProductCards from '../components/Product';
import { supabase } from '../utils/supabase';
import { useState, useEffect } from 'react';

export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState('all');

    // Function to handle the "View Details" button click for a product card, which sets the selected product and opens the modal to display its details
    function handleViewDetails(product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }

    // Function to close the product details modal and reset the selected product state variable
    function closeModal() {
        setIsModalOpen(false);
        setSelectedProduct(null);
    }
    const [products, setProducts] = useState([]);

    // API call to fetch products from the Supabase database and update the products state variable with the retrieved data, with error handling and sorting by product name in ascending order
    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('product_name', { ascending: true });

            if (error) {
                console.error('Error fetching products:', error);
            } else {
                setProducts(data);
            }
        }

        fetchProducts();
    }, []);

    // Filter the products based on the selected category, showing all products if the "all" category is selected or filtering by the specific category otherwise
    const filteredProducts = category === 'all'? products : products.filter(p => p.category === category);

    return (
        <section>
            <div className="header-card">
                <h1>Our Shop</h1>
            </div>

            <div className="card" id="filters">
                <h1>Filter by Category</h1>
                <hr />
                <div className="cat-options">
                    <button onClick={() => setCategory('all')}>All</button>
                    <button onClick={() => setCategory('papercrafts')}>Papercrafts</button>
                    <button onClick={() => setCategory('ink-flowers-paper')}>Ink Flowers (Paper)</button>
                    <button onClick={() => setCategory('ink-flowers-tile')}>Ink Flowers (Tile)</button>
                    <button onClick={() => setCategory('shadowboxes')}>Shadowboxes</button>
                    <button onClick={() => setCategory('cards')}>Cards</button>
                    <button onClick={() => setCategory('miscellaneous')}>Miscellaneous</button>
                </div>
                <p> If you see a product you like but is currently unavailable, please reach out as I may be able to craft another one with a choice of colors depending on the product. Custom orders can also be discussed.</p>
            </div>
            <div className="card">
                <h1>Shop</h1>
                <hr></hr>
                <div id="cards" className="category">
                    {products.length === 0 && <p>Loading products...</p>}
                    {filteredProducts.map((product) => (
                        <ProductCards
                            key={product.id}
                            name={product.product_name}
                            price={product.price}
                            description={product.description}
                            stock={product.in_stock}
                            product_pic={product.image || product_pic}
                            onViewDetails={() => handleViewDetails(product)}
                            in_stock={product.in_stock}
                        />
                    ))}
                </div>
            </div>

            {isModalOpen && selectedProduct && (
                <div id="product-modal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}> x </span>

                        <img
                            src={selectedProduct.image || product_pic}
                            alt={selectedProduct.product_name}
                        />

                        <div className="text-content">
                            <h2>{selectedProduct.product_name}</h2>
                            <p>${selectedProduct.price.toFixed(2)}</p>
                            <p>{selectedProduct.description}</p>
                            <p style={{ color: selectedProduct.in_stock ? 'green' : 'red' }}>
                                {selectedProduct.in_stock ? 'In Stock' : 'Out of Stock'}
                            </p>

                            <button>Buy Now</button>
                            <button>Contact Seller</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}