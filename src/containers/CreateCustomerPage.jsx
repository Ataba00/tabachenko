import React from 'react';

import CustomerStore from '../stores/CustomerStore';
import CustomerActions from '../actions/CustomerActions';

import CustomerPage from '../components/CustomerPage.jsx';

class CreateCustomerPageContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      creatingCustomer: true,
    };
    this.handleCustomerCreate = ::this.handleCustomerCreate;
  }

  handleCustomerCreate(...props) {
    CustomerActions.createCustomer(...props);
  }

  render() {
    return (
      <CustomerPage
        creatingCustomer={this.state.creatingCustomer}
        onCreateCustormer={this.handleCustomerCreate}
      />
    );
  }
}

export default CreateCustomerPageContainer;
