import EventEmmiter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

const CHANGE_EVENT = 'change';

let _productLists = [];
let _error = null;

const ProductListsStore = Object.assign({}, EventEmmiter.prototype, {

    getProductLists() {
      return _productLists;
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
    case AppConstants.PRODUCT_LISTS_LOAD_SUCCESS:
      _productLists = action.products;
      ProductListsStore.emitChange();
      break;

    case AppConstants.PRODUCT_LISTS_LOAD_FAIL:
      _productLists = [];
      _error = action.error;
      ProductListsStore.emitChange();
      break;

    default:
  }
});

export default ProductListsStore;
