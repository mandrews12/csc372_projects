export default function Benefits({className, name, description}) {
  return (
    <article className="card">
      {
        <div className="benefit">
            <i className={className}></i>
            <div>
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </div>
      }
    </article>
  );
}