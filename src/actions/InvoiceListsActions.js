import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

import api from '../api';

const InvoiceListsActions = {

  loadInvoiceLists() {
    api.loadInvoiceLists()
    .then(data => {
      AppDispatcher.dispatch({
        type: AppConstants.INVOICE_LISTS_LOAD_SUCCESS,
        invoices: data,
      });
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.INVOICE_LISTS_LOAD_FAIL,
        error: err,
      });
    });
  },

};

export default InvoiceListsActions;
