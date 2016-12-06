import EventEmmiter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

const CHANGE_EVENT = 'change';

let _customerLists = [];
let _error = null;

const CustomerListsStore = Object.assign({}, EventEmmiter.prototype, {

    getCustomerLists() {
      return _customerLists;
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
    case AppConstants.CUSTOMER_LISTS_LOAD_SUCCESS:
      _customerLists = action.customers;
      CustomerListsStore.emitChange();
      break;

    case AppConstants.CUSTOMER_LISTS_LOAD_FAIL:
      _customerLists = [];
      _error = action.error;
      CustomerListsStore.emitChange();
      break;

    default:
  }
});

export default CustomerListsStore;
