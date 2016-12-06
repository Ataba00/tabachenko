import EventEmmiter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

const CHANGE_EVENT = 'change';

let _invoice = {
  id: null,
  customer_id: null,
  discount: 0,
  total: 0,
};
let _invoiceItem = [];
let _customerLists = [];
let _productLists = [];
let _error = null;
let _isLoading = true;

const InvoiceStore = Object.assign({}, EventEmmiter.prototype, {

    getInvoice() {
      return {
        _invoice,
        _customerLists,
        _productLists,
        _invoiceItem,
      };
    },

    getError() {
      return _error;
    },

    getLoadingInvoice() {
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

    case AppConstants.INVOICE_LOAD_SUCCESS:
      _isLoading = false;
      _invoice = action.invoice;
      _customerLists = action.customerLists;
      _productLists = action.productLists;
      _invoiceItem = action.uploadedItems;
      _error = null;
      InvoiceStore.emitChange();
      break;

    case AppConstants.INVOICE_LOAD_FAIL:
      _isLoading = false;
      _invoice = {
        id: null,
        customer_id: null,
        discount: 0,
        total: 0,
      };
      _error = action.error;
      InvoiceStore.emitChange();
      break;

    default:
  }
});

export default InvoiceStore;
