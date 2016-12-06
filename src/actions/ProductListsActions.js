import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

import api from '../api';

const ProductListsActions = {

  loadProductLists() {
    api.loadProductLists()
    .then(data => {
      AppDispatcher.dispatch({
        type: AppConstants.PRODUCT_LISTS_LOAD_SUCCESS,
        products: data,
      });
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.PRODUCT_LISTS_LOAD_FAIL,
        error: err,
      });
    });
  },

};

export default ProductListsActions;
