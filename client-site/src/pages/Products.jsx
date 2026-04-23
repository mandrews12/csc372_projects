import product_pic from '../assets/product_placeholder.png';
import ProductCards from '../components/Product';
import { supabase } from '../utils/supabase';
import { useState, useEffect } from 'react';

export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState('all');

    function handleViewDetails(product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setSelectedProduct(null);
    }
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from('products')
                .select('*');

            if (error) {
                console.error('Error fetching products:', error);
            } else {
                setProducts(data);
            }
        }

        fetchProducts();
    }, []);

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
                    <button onClick={() => setCategory('ink-flowers')}>Ink Flowers</button>
                    <button onClick={() => setCategory('shadowboxes')}>Shadowboxes</button>
                    <button onClick={() => setCategory('cards')}>Cards</button>
                </div>
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
                            height="300"
                        />

                        <div className="text-content">
                            <h2>{selectedProduct.product_name}</h2>
                            <p>${selectedProduct.price.toFixed(2)}</p>
                            <p>{selectedProduct.description}</p>
                            <p>
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