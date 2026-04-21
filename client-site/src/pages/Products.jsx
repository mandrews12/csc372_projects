import product_pic from '../assets/product_placeholder.png';
import ProductCards from '../components/Product';
export default function Products() {
    return (
        <section>
            <div className="header-card">
                <h1>Our Shop</h1>
            </div>

            <div className="card" id="filters">
                <h1>Filter by Category</h1>
                <hr />
                <div className="cat-options">
                    <button className="cat-btn" data-category="all">All</button>
                    <button className="cat-btn" data-category="papercrafts">Papercrafts</button>
                    <button className="cat-btn" data-category="ink-flowers">Ink Flowers</button>
                    <button className="cat-btn" data-category="shadowboxes">Shadowboxes</button>
                    <button className="cat-btn" data-category="cards">Cards</button>
                </div>
            </div>
            <div className="card">

            <h1>Shop</h1>
            <div id="cards" className="category">
                <ProductCards name="Assorted Cards" price={10.00} description="Assorted greeting cards with unique designs." stock="In Stock" product_pic={product_pic} />
                <ProductCards name="Papercraft Item" price={15.00} description="Handmade papercraft items with intricate designs." stock="In Stock" product_pic={product_pic} />
                <ProductCards name="Alcohol Ink Flower" price={30.00} description="Stunning alcohol ink flower artwork on canvas." stock="In Stock" product_pic={product_pic} />
                <ProductCards name="Alcohol Ink Tile" price={25.00} description="Alcohol ink flower designs on decorative tiles." stock="In Stock" product_pic={product_pic} />
                <ProductCards name="Shadowbox" price={40.00} description="Elegant shadowbox displays for your cherished items." stock="In Stock" product_pic={product_pic} />
                <ProductCards name="Cardinal Lantern" price={25.00} description="A beautiful handmade cardinal lantern, perfect for home decor." stock="In Stock" product_pic={product_pic} />
            </div>
        </div>
        </section>
    );
}