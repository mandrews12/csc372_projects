export default function ProductCards({name, price, description, stock, product_pic}) {
  return (
    <article className="card">
      {
        <div className="item" data-description={description} data-stock={stock}>
            <img src={product_pic} alt={name} height="150" />
            <h3>{name}</h3>
            <p>${price.toFixed(2)}</p>
            <button className="view-details">View Details</button>
        </div>
      }
    </article>
  );
}