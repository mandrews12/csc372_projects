export default function FeaturedProducts({name, price, product_pic}) {
  return (
    <article className="card">
      {
        <div className="item">
            <img src={product_pic} alt={name} />
                <h3>{name}</h3>
                <button onClick={() => navigate('/products')}>View Details</button>
            </div>
      }
    </article>
  );
}