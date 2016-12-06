import AppDispatcher from '../dispatcher/AppDispatcher.js';
import AppConstants from '../constants/AppConstants.js';

import api from '../api';

const CustomerListsActions = {

  loadCustomerLists() {
    api.loadCustomerLists()
    .then(data => {
      AppDispatcher.dispatch({
        type: AppConstants.CUSTOMER_LISTS_LOAD_SUCCESS,
        customers: data,
      });
    })
    .catch((err) => {
      AppDispatcher.dispatch({
        type: AppConstants.CUSTOMER_LISTS_LOAD_FAIL,
        error: err,
      });
    });
  },

};

export default CustomerListsActions;
