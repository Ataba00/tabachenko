import { hashHistory } from 'react-router';

import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

import CustomerListsActions from './CustomerListsActions.js';

import api from '../api';

const CustomerActions = {

  loadCustomer(idCustomer) {

    AppDispatcher.dispatch({
      type: AppConstants.CUSTOMER_LOAD_REQUEST,
    });
    api.loadCustomer(idCustomer)
    .then(data => {
      AppDispatcher.dispatch({
        type: AppConstants.CUSTOMER_LOAD_SUCCESS,
        customer: data,
      });
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.CUSTOMER_LOAD_FAIL,
        error: err,
      });
    });
  },

  createCustomer(props) {
    api.createCustomer(props)
    .then((data) => {
      CustomerListsActions.loadCustomerLists();
      hashHistory.replace(`/customers/${data.id}`);
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.CUSTOMER_LOAD_FAIL,
        error: err,
      });
    });
  },

  updateCustomer(idCustomer, props) {
    api.updateCustomer(idCustomer, props)
    .then((data) => {
      CustomerListsActions.loadCustomerLists();
      this.loadCustomer(idCustomer);
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.CUSTOMER_LOAD_FAIL,
        error: err,
      });
    });
  },

  deleteCustomer(idCustomer) {
    api.deleteCustomer(idCustomer)
    .then(() => {
      hashHistory.replace('/customers/');
      CustomerListsActions.loadCustomerLists();
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.CUSTOMER_LOAD_FAIL,
        error: err,
      });
    });
  },

};

export default CustomerActions;
