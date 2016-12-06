import React from 'react';

import CustomerStore from '../stores/CustomerStore';
import CustomerActions from '../actions/CustomerActions';

import CustomerPage from '../components/CustomerPage.jsx';

function getStateFromFlux() {
  return {
    customer: CustomerStore.getCustomer(),
    error: CustomerStore.getError(),
    isLoadingCustomer: CustomerStore.getLoadingCustomer(),
  };
}

class CustomerPageContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...getStateFromFlux(),
    };
    this._onChange = ::this._onChange;
    this.handleCustomerUpdate = ::this.handleCustomerUpdate;
    this.handleCustomerDelete = ::this.handleCustomerDelete;
  }

  componentWillMount() {
    CustomerActions.loadCustomer(this.props.params.id);
  }

  componentDidMount() {
    CustomerStore.addChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      CustomerActions.loadCustomer(nextProps.params.id);
    }
  }

  componentWillUnmount() {
    CustomerStore.removeChangeListener(this._onChange);
  }

  handleCustomerUpdate(...props) {
    CustomerActions.updateCustomer(this.state.customer.id, ...props);
  }

  handleCustomerDelete() {
    CustomerActions.deleteCustomer(this.state.customer.id);
  }

  render() {
    return (
      <CustomerPage
        isLoadingCustomer={this.state.isLoadingCustomer}
        customer={this.state.customer}
        error={this.state.error}
        onUpdate={this.handleCustomerUpdate}
        onDelete={this.handleCustomerDelete}
      />
    );
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

}

export default CustomerPageContainer;
