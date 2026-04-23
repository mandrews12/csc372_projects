export default function ProductCards({name, price, description, stock, product_pic, onViewDetails}) {
  return (
    <article className="card">
      <div className="item">
        <img src={product_pic} alt={name} />
        <h3>{name}</h3>
        <p>${price.toFixed(2)}</p>
        <button className="view-details" onClick={onViewDetails}>
          View Details
        </button>
      </div>
    </article>
  );
}