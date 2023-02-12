// Write your code here
import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const statusConstant = {
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {
    count: 1,
    productDetails: {},
    similarProductDetails: [],
    status: statusConstant.inProgress,
    errorMessage: '',
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const productId = match.params.id
    const apiUrl = `https://apis.ccbp.in/products/${productId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.id,
        imageUrl: fetchedData.image_url,
        title: fetchedData.title,
        price: fetchedData.price,
        description: fetchedData.description,
        brand: fetchedData.brand,
        totalReviews: fetchedData.total_reviews,
        rating: fetchedData.rating,
        availability: fetchedData.availability,
      }
      const similarProducts = fetchedData.similar_products.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        title: each.title,
        style: each.style,
        price: each.price,
        description: each.description,
        brand: each.brand,
        totalReviews: each.total_reviews,
        rating: each.rating,
        availability: each.availability,
      }))
      this.setState({
        status: statusConstant.success,
        productDetails: updatedData,
        similarProductDetails: similarProducts,
      })
    } else if (response.status === 404) {
      const resultedData = await response.json()
      this.setState({
        status: statusConstant.failure,
        errorMessage: resultedData.error_msg,
      })
    }
  }

  renderProduct = () => {
    const {count, productDetails} = this.state
    const {
      id,
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
    } = productDetails
    return (
      <div className="product-container">
        <img src={imageUrl} alt={title} className="product" />
        <div className="details-container">
          <h1>{title}</h1>
          <p className="bold">Rs. {price}/-</p>
          <br />
          <div className="rating-and-review">
            <div className="rating">
              <p>{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
            <p>{totalReviews} Reviews</p>
          </div>
          <p>{description}</p>
          <p>
            <span className="bold">Available: </span>
            {availability}
          </p>
          <p>
            <span className="bold">Brand: </span>
            {brand}
          </p>
          <div className="count-container">
            <button
              type="button"
              testid="minus"
              onClick={this.onDecrement}
              className="count-button"
            >
              <BsDashSquare />
            </button>
            <p>{count}</p>
            <button
              type="button"
              testid="plus"
              onClick={this.onIncrement}
              className="count-button"
            >
              <BsPlusSquare />
            </button>
          </div>
          <button type="button" id={id} className="add-to-cart-button">
            ADD TO CART
          </button>
        </div>
      </div>
    )
  }

  renderSimilarProducts = () => {
    const {similarProductDetails} = this.state
    return (
      <div className="similar-products-container">
        <h1>Similar Products</h1>
        <ul className="similar-list">
          {similarProductDetails.map(each => (
            <SimilarProductItem eachProduct={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrement = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  continueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => (
    <div className="container">
      {this.renderProduct()}
      {this.renderSimilarProducts()}
    </div>
  )

  renderFailureView = () => {
    const {errorMessage} = this.state
    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1>{errorMessage}</h1>
        <button
          type="button"
          onClick={this.continueShopping}
          className="failure-button"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  renderResult = () => {
    const {status} = this.state
    switch (status) {
      case statusConstant.success:
        return this.renderSuccessView()
      case statusConstant.failure:
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderResult()}
      </div>
    )
  }
}

export default ProductItemDetails
