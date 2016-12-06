import { hashHistory } from 'react-router';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

import ProductListsActions from './ProductListsActions.js';

import api from '../api';

const ProductActions = {

  loadProduct(idProduct) {

    AppDispatcher.dispatch({
      type: AppConstants.PRODUCT_LOAD_REQUEST,
    });
    api.loadProduct(idProduct)
    .then(data => {
      AppDispatcher.dispatch({
        type: AppConstants.PRODUCT_LOAD_SUCCESS,
        product: data,
      });
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.PRODUCT_LOAD_FAIL,
        error: err,
      });
    });
  },

  createProduct(props) {
    api.createProduct(props)
    .then((data) => {
      ProductListsActions.loadProductLists();
      hashHistory.replace(`/products/${data.id}`);
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.PRODUCT_LOAD_FAIL,
        error: err,
      });
    });
  },

  updateProduct(idProduct, props) {
    api.updateProduct(idProduct, props)
    .then((data) => {
      ProductListsActions.loadProductLists();
      this.loadProduct(idProduct);
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.PRODUCT_LOAD_FAIL,
        error: err,
      });
    });
  },

  deleteProduct(idProduct) {
    api.deleteProduct(idProduct)
    .then(() => {
      hashHistory.replace('/products/');
      ProductListsActions.loadProductLists();
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.PRODUCT_LOAD_FAIL,
        error: err,
      });
    });
  },

};

export default ProductActions;
