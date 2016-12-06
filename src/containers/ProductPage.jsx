import React from 'react';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import ProductPage from '../components/ProductPage.jsx';

function getStateFromFlux() {
  return {
    product: ProductStore.getProduct(),
    error: ProductStore.getError(),
    isLoadingProduct: ProductStore.getLoadingProduct(),
  };
}

class ProductPageContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...getStateFromFlux(),
    };
    this._onChange = ::this._onChange;
    this.handleProductUpdate = ::this.handleProductUpdate;
    this.handleProductDelete = ::this.handleProductDelete;
  }

  componentWillMount() {
    ProductActions.loadProduct(this.props.params.id);
  }

  componentDidMount() {
    ProductStore.addChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      ProductActions.loadProduct(nextProps.params.id);
    }
  }

  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
  }

  handleProductUpdate(...props) {
    ProductActions.updateProduct(this.state.product.id, ...props);
  }

  handleProductDelete() {
    ProductActions.deleteProduct(this.state.product.id);
  }

  render() {
    return (
      <ProductPage
        isLoadingProduct={this.state.isLoadingProduct}
        product={this.state.product}
        error={this.state.error}
        onUpdate={this.handleProductUpdate}
        onDelete={this.handleProductDelete}
      />
    );
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

}

export default ProductPageContainer;
