import { useNavigate } from 'react-router-dom';
import productPlaceholder from '../assets/product_placeholder.png';
import product_pic from '../assets/product_placeholder.png';
import FeaturedProducts from '../components/FeaturedProducts';
import Benefits from '../components/Benefits';
import LoginModal from '../components/LoginModal';
import { supabase } from '../utils/supabase';
import { useState, useEffect } from 'react';

export default function Index () {
    const navigate = useNavigate();
        const [products, setProducts] = useState([]);
    
        useEffect(() => {
            async function fetchProducts() {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('featured', true);

                if (error) {
                    console.error('Error fetching products:', error);
                } else {
                    setProducts(data);
                }
            }
    
            fetchProducts();
        }, []);

    return (
    <section>
        <LoginModal />
        <div className="header-card" id="welcome-card">
            <p> HANDMADE CRAFTS </p>
            <h1>Critter Haven Crafts</h1>
            <h3>Handmade pieces that bring warmth and personality into your everyday life</h3>
            <button onClick={() => navigate('/products')}>Explore Collection</button>
        </div>

        <div className="card">
            <h1>Featured Items</h1>
            <hr></hr>
            <div className="featured-items">
                {products.map((product) => (
                <FeaturedProducts 
                    key={product.id}
                    name={product.product_name}
                    price={product.price}
                    product_pic={product.image || product_pic}
                />
                ))}
             </div>
        </div>

        <div className="card" id="about">
            <div className="about-content">
                <h1>Our Story</h1>
                <hr></hr>
                <p>Critter Haven Crafts creates handmade, one-of-a-kind pieces designed to bring warmth, creativity, and personality into everyday life. Each item is thoughtfully crafted with care and attention to detail, offering unique gifts and décor you won’t find in mass-produced stores.   </p>
                <button onClick={() => navigate('/about')}>Learn More</button>
            </div>
        </div>

        <div className="card" id="benefits">
            <h1>Why Choose Us</h1>
            <hr></hr>
            <div className="benefit-grid">
                < Benefits className="fa-solid fa-paintbrush" name="Unique Designs" description="Each item is crafted with care, ensuring you receive a one-of-a-kind piece." />
                < Benefits className="fa-solid fa-gem" name="Quality Materials" description="We strive to use high quality materials while also bringing affordability to each piece." />
                < Benefits className="fa-solid fa-heart" name="Support Local Crafters" description="By shopping with us, you support local artisans and their craft." />
                < Benefits className="fa-solid fa-gift" name="Perfect Gifts" description="We prioritize your satisfaction and strive to provide excellent customer service." />
             </div>
         </div>
    </section>
    );
}