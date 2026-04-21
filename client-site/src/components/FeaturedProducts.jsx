export default function FeaturedProducts({name, price, product_pic}) {
  return (
    <article className="card">
      {
        <div className="item">
            <img src={product_pic} alt={name} height="150" />
                <h3>{name}</h3>
                <p>${price.toFixed(2)}  </p>
                <button onClick={() => navigate('/products')}>View Details</button>
            </div>
      }
    </article>
  );
}