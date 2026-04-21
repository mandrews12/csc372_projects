import { useNavigate } from 'react-router-dom';
import productPlaceholder from '../assets/product_placeholder.png';
import FeaturedProducts from '../components/FeaturedProducts';
import Benefits from '../components/Benefits';

export default function Index () {
    const navigate = useNavigate();
    return (
    <section>
        <div className="header-card" id="welcome-card">
            <p> HANDCRAFTED GOODS </p>
            <h1>Critter Haven Crafts</h1>
            <h3>Handmade pieces that bring warmth and personality into your everyday life</h3>
            <button onClick={() => navigate('/products')}>Explore Collection</button>
        </div>

        <div class = "card" id="about">
            <div class="about-content">
                <h1>Our Story</h1>
                <hr></hr>
                <p>Critter Haven Crafts creates handmade, one-of-a-kind pieces designed to bring warmth, creativity, and personality into everyday life. Each item is thoughtfully crafted with care and attention to detail, offering unique gifts and décor you won’t find in mass-produced stores.   </p>
                <button onClick={() => navigate('/about')}>Learn More</button>
            </div>
        </div>

        <div className="card">
            <h1>Featured Items</h1>
            <div className="featured-items">
                <FeaturedProducts name="Cardinal Lantern" price={25.00} product_pic={productPlaceholder} />
                <FeaturedProducts name="Alcohol Ink Flower" price={30.00} product_pic={productPlaceholder} />
                <FeaturedProducts name="Asorted Cards" price={10.00} product_pic={productPlaceholder} />
                <FeaturedProducts name="Shadowbox" price={40.00} product_pic={productPlaceholder} />
                <FeaturedProducts name="Alcohol Ink Tile" price={25.00} product_pic={productPlaceholder} />
                <FeaturedProducts name="Papercraft Item" price={15.00} product_pic={productPlaceholder} />
             </div>
        </div>

        <div className="card" id="benefits">
            <h1>Why Choose Us</h1>
            <hr></hr>
            <div className="benefit-grid">
                < Benefits className="fa-solid fa-paintbrush" name="Unique Designs" description="Each item is crafted with care, ensuring you receive a one-of-a-kind piece." />
                < Benefits className="fa-solid fa-gem" name="Quality Materials" description="We use only the finest materials to create durable and beautiful crafts." />
                < Benefits className="fa-solid fa-heart" name="Support Local Crafters" description="By shopping with us, you support local artisans and their craft." />
                < Benefits className="fa-solid fa-gift" name="Perfect Gifts" description="We prioritize your satisfaction and strive to provide excellent customer service." />
             </div>
         </div>
    </section>
    );
}