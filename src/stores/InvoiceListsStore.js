import EventEmmiter from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

const CHANGE_EVENT = 'change';

let _invoiceLists = [];
let _error = null;

const InvoiceListsStore = Object.assign({}, EventEmmiter.prototype, {

    getInvoiceLists() {
      return _invoiceLists;
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
    case AppConstants.INVOICE_LISTS_LOAD_SUCCESS:
      _invoiceLists = action.invoices;
      InvoiceListsStore.emitChange();
      break;

    case AppConstants.INVOICE_LISTS_LOAD_FAIL:
      _invoiceLists = [];
      _error = action.error;
      InvoiceListsStore.emitChange();
      break;

    default:
  }
});

export default InvoiceListsStore;
