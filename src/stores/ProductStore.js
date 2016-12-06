import EventEmmiter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

const CHANGE_EVENT = 'change';

let _product = { id: null };
let _error = null;
let _isLoading = true;

const ProductStore = Object.assign({}, EventEmmiter.prototype, {

    getProduct() {
      return _product;
    },

    getError() {
      return _error;
    },

    getLoadingProduct() {
      return _isLoading;
    },

    emitChange() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
  });

AppDispatcher.register(action => {
  switch (action.type) {
    case AppConstants.PRODUCT_LOAD_REQUEST:
      _isLoading = true;
      _product = { id: null };
      ProductStore.emitChange();
      break;

    case AppConstants.PRODUCT_LOAD_SUCCESS:
      _isLoading = false;
      _product = action.product;
      _error = null;
      ProductStore.emitChange();
      break;

    case AppConstants.PRODUCT_LOAD_FAIL:
      _isLoading = false;
      _product = { id: null };
      _error = action.error;
      ProductStore.emitChange();
      break;

    default:
  }
});

export default ProductStore;
