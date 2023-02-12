// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {eachProduct} = props
  const {id, imageUrl, title, price, brand, rating} = eachProduct
  return (
    <li key={id} className="similar-container">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-image"
      />
      <h1>{title}</h1>
      <p>by {brand}</p>
      <div className="price-and-rating">
        <p>Rs. {price}/-</p>
        <div className="similar-rating">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
