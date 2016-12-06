import React from 'react';

import InvoiceStore from '../stores/InvoiceStore';
import InvoiceActions from '../actions/InvoiceActions';

import InvoicePage from '../components/InvoicePage.jsx';
import InvoiceItemPage from '../components/InvoiceItemPage.jsx';

function getStateFromFlux() {
  let { _invoice: invoice, _customerLists: customerLists, _productLists: productLists, _invoiceItem: invoiceItem } = InvoiceStore.getInvoice();

  let differenceProductLists = productLists.filter(j =>
    invoiceItem.map(i => i.product_id).indexOf(j.id) == -1);

  let extendedInvoiceItem = invoiceItem.map(i => {
    let product = productLists.find((item) => item.id == i.product_id);
    let product_name = product.name || '';
    let product_price = product.price || 0;
    return Object.assign({}, i, { product_name,  product_price, discount: invoice.discount });
  });
  return {
    invoice,
    customerLists,
    differenceProductLists,
    extendedInvoiceItem,
    error: InvoiceStore.getError(),
    isLoadingInvoice: InvoiceStore.getLoadingInvoice(),
  };
}

class InvoicePageContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...getStateFromFlux(),
    };
    this._onChange = ::this._onChange;
    this.handleInvoiceUpdate = ::this.handleInvoiceUpdate;
    this.handleInvoiceDelete = ::this.handleInvoiceDelete;
    this.handleInvoceItemAdd = ::this.handleInvoceItemAdd;
    this.handleQuantityUpdate = ::this.handleQuantityUpdate;
    this.handleDeleteInvoiceItem = ::this.handleDeleteInvoiceItem;
    this.handleCount = ::this.handleCount;
    this.handleDiscount = ::this.handleDiscount;
  }

  componentWillMount() {
    InvoiceActions.loadInvoice(this.props.params.id);
  }

  componentDidMount() {
    InvoiceStore.addChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      InvoiceActions.loadInvoice(nextProps.params.id);
    }
  }

  componentWillUnmount() {
    InvoiceStore.removeChangeListener(this._onChange);
  }

  handleInvoiceUpdate(...props) {
    InvoiceActions.updateInvoice(this.state.invoice.id, ...props);
  }

  handleInvoiceDelete() {
    InvoiceActions.deleteInvoice(this.state.invoice.id);
    InvoiceActions.updateInvoice(this.state.invoice.id, { total: this.state.invoice.total || 0 });
  }

  handleInvoceItemAdd(productPrice, ...props) {
    InvoiceActions.addInvoceItem(this.state.invoice.id, ...props);
    InvoiceActions.updateInvoice(this.state.invoice.id, { total: Number(this.state.invoice.total) + Number(productPrice) || 0 });
  }

  handleQuantityUpdate(idInvoiceItem, quantity, total) {
    InvoiceActions.updateInvoceItem(this.state.invoice.id, idInvoiceItem, quantity);
    InvoiceActions.updateInvoice(this.state.invoice.id, total);
  }

  handleDeleteInvoiceItem(idInvoiceItem, total) {
    InvoiceActions.deleteInvoiceItem(this.state.invoice.id, idInvoiceItem);
    InvoiceActions.updateInvoice(this.state.invoice.id, total);
  }

  handleDiscount(discount) {
    let invoice = this.state.invoice;
    invoice.discount = discount;
    this.setState({ invoice });
  }

  handleCount(total) {
    let invoice = this.state.invoice;
    invoice.total = total;
    this.setState({ invoice });
  }

  render() {
    return (
      <div>
        <InvoicePage
          isLoadingInvoice={this.state.isLoadingInvoice}
          invoice={this.state.invoice}
          customerLists={this.state.customerLists}
          error={this.state.error}
          onUpdate={this.handleInvoiceUpdate}
          onDelete={this.handleInvoiceDelete}
          onAddInvoceItem={this.handleInvoceItemAdd}
          differenceProductLists={this.state.differenceProductLists}
          onChangeDiscount={this.handleDiscount}
          />
        <InvoiceItemPage
          extendedInvoiceItem={this.state.extendedInvoiceItem}
          onUpdateQuantity={this.handleQuantityUpdate}
          onDeleteInvoiceItem={this.handleDeleteInvoiceItem}
          onCount={this.handleCount}
         />
      </div>
    );
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

}

export default InvoicePageContainer;
