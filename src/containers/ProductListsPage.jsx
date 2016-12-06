import React from 'react';

import ProductListsStore from '../stores/ProductListsStore';
import ProductListsActions from '../actions/ProductListsActions';

import ProductListsPage from '../components/ProductListsPage.jsx';

function getStateFromFlux() {
  return {
    productLists: ProductListsStore.getProductLists(),
  };
}

class ProductListsPageContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...getStateFromFlux(),
    };
    this._onChange = ::this._onChange;
  }

  componentWillMount() {
    ProductListsActions.loadProductLists();
  }

  componentDidMount() {
    ProductListsStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    ProductListsStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <ProductListsPage
        productLists={this.state.productLists}
        page={this.props.children}
        selectedListId={this.props.params.id || 'newProduct'}
      />
    );
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

}

export default ProductListsPageContainer;
