import { hashHistory } from 'react-router';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

import InvoiceListsActions from './InvoiceListsActions.js';

import api from '../api';

const InvoiceActions = {

  loadInvoice(idInvoice) {
    api.loadInvoice(idInvoice)
    .then(data => {
      AppDispatcher.dispatch({
        type: AppConstants.INVOICE_LOAD_SUCCESS,
        invoice: data[0],
        customerLists: data[1],
        productLists: data[2],
        uploadedItems: data[3],
      });
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.INVOICE_LOAD_FAIL,
        error: err,
      });
    });
  },

  createInvoice() {
    api.createInvoice({ customer_id: null, discount: 0, total: 0 })
    .then((data) => {
      InvoiceListsActions.loadInvoiceLists();
      hashHistory.replace(`/invoices/${data.id}`);
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.INVOICE_LOAD_FAIL,
        error: err,
      });
    });
  },

  updateInvoice(idInvoice, props) {
    api.updateInvoice(idInvoice, props)
    .then((data) => {
      this.loadInvoice(idInvoice);
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.INVOICE_LOAD_FAIL,
        error: err,
      });
    });
  },

  deleteInvoice(idInvoice) {
    api.deleteInvoice(idInvoice)
    .then(() => {
      hashHistory.replace('/invoices/');
      InvoiceListsActions.loadInvoiceLists();
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.INVOICE_LOAD_FAIL,
        error: err,
      });
    });
  },

  addInvoceItem(idInvoice, props) {
    api.addInvoceItem(idInvoice, props)
    .then((data) => {
      this.loadInvoice(idInvoice);
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.INVOICE_LOAD_FAIL,
        error: err,
      });
    });
  },

  updateInvoceItem(idInvoice, idInvoiceItem, ...props) {
    api.updateInvoceItem(idInvoice, idInvoiceItem, ...props)
    .then((data) => {
      this.loadInvoice(idInvoice);
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.INVOICE_LOAD_FAIL,
        error: err,
      });
    });
  },

  deleteInvoiceItem(idInvoice, idInvoiceItem) {
    api.deleteInvoiceItem(idInvoice, idInvoiceItem)
    .then(() => {
      this.loadInvoice(idInvoice);
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.INVOICE_LOAD_FAIL,
        error: err,
      });
    });
  },

};

export default InvoiceActions;
