// Component to display individual product cards with product information and a button to view more details
export default function ProductCards({name, price, description, stock, product_pic, onViewDetails, in_stock}) {
  return (
    <article className="card">
      <div className="item">
        <img src={product_pic} alt={name} />
        <h3>{name}</h3>
        <p>${price.toFixed(2)}</p>
        <p style={{ color: in_stock ? 'green' : 'red' }}>
          {in_stock ? 'In Stock' : 'Out of Stock'}
        </p>
        <button className="view-details" onClick={onViewDetails}>
          View Details
        </button>
      </div>
    </article>
  );
}