import React from 'react';

import { ButtonToolbar, Button, Glyphicon, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './InvoicePage.less';

class InvoicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleDelete = ::this.handleDelete;
    this.closeModal = ::this.closeModal;
    this.openModal = ::this.openModal;
    this.handleChangeProduct = ::this.handleChangeProduct;
    this.handleChangeInvoice = ::this.handleChangeInvoice;
    this.handleChangeDiscount = ::this.handleChangeDiscount;
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  handleDelete() {
    this.props.onDelete();
    this.setState({ showModal: false });
  }

  handleChangeProduct(e) {
    let { options, selectedIndex, value } = e.target;
    let idProduct = options[selectedIndex].id;
    this.props.onAddInvoceItem(e.target.value, {
      product_id: idProduct,
      quantity: 1,
    });
  }

  handleChangeInvoice() {
    this.props.onUpdate({
      customer_id: this.customer.value || null,
      discount: this.discount.value || 0,
    });
  }

  handleChangeDiscount(e) {
    this.props.onChangeDiscount(e.target.value)
  }

  render() {
    let { id, customer_id, discount, total } = this.props.invoice;
    return (
      <div className='invoice__info'>
        <div className='invoice__title'>
          <h2>Invoice Info</h2>
          <ButtonToolbar>
            <Button onClick={this.openModal}><Glyphicon glyph="trash"/></Button>
          </ButtonToolbar>
        </div>
        <div className='title'><div>№: </div><b>{id}</b></div>
        <div className='title'>
          <div>Select Customer: </div>
          <select
            onChange={this.handleChangeInvoice}
            value={customer_id}
            ref={c => this.customer = c}
            >
            <option value=""></option>
            {
              this.props.customerLists.map(item =>
                <option key={item.id} value={item.id}>{item.name}</option>
              )
            }
          </select>
        </div>
        <div className='title'>
          <div>Add Product: </div>
          <select onChange={this.handleChangeProduct}>
            <option value=""></option>
            {
              this.props.differenceProductLists.map(item =>
              <option
                key={item.id}
                id={item.id}
                value={item.price}
                >
                {item.name} (price:{item.price})
              </option>
              )
            }
          </select>
        </div>
        <div className='title'>
          <div>Discount %: </div>
          <input
            type='number'
            min='0'
            max='100'
            value={discount}
            ref={c => this.discount = c}
            onBlur={this.handleChangeInvoice}
            onChange={this.handleChangeDiscount}
          />
        </div>
        <div className='title'><div>Total: </div><b>{(total - total * discount / 100).toFixed(2)}</b></div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to delete Product (<span className='product_delete'>№: {id}</span>)</h4>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button onClick={this.closeModal}>Cancel</Button>
              <Button onClick={this.handleDelete} bsStyle="danger">Delete</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default InvoicePage;
