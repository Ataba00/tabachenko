import React from 'react';

import ProductStore from '../stores/ProductStore';
import ProductActions from '../actions/ProductActions';

import ProductPage from '../components/ProductPage.jsx';

class CreateProductPageContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      creatingProduct: true,
    };
    this.handleProductCreate = ::this.handleProductCreate;
  }

  handleProductCreate(...props) {
    ProductActions.createProduct(...props);
  }

  render() {
    return (
      <ProductPage
        creatingProduct={this.state.creatingProduct}
        onCreateCustormer={this.handleProductCreate}
      />
    );
  }
}

export default CreateProductPageContainer;
