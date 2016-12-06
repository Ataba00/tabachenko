import EventEmmiter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

const CHANGE_EVENT = 'change';

let _customer = { id: null };
let _error = null;
let _isLoading = true;

const CustomerStore = Object.assign({}, EventEmmiter.prototype, {

    getCustomer() {
      return _customer;
    },

    getError() {
      return _error;
    },

    getLoadingCustomer() {
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
    case AppConstants.CUSTOMER_LOAD_REQUEST:
      _isLoading = true;
      _customer = { id: null };
      CustomerStore.emitChange();
      break;

    case AppConstants.CUSTOMER_LOAD_SUCCESS:
      _isLoading = false;
      _customer = action.customer;
      _error = null;
      CustomerStore.emitChange();
      break;

    case AppConstants.CUSTOMER_LOAD_FAIL:
      _isLoading = false;
      _customer = { id: null };
      _error = action.error;
      CustomerStore.emitChange();
      break;

    default:
  }
});

export default CustomerStore;
