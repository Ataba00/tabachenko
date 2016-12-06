import React from 'react';

import { ButtonToolbar, Button, Glyphicon, Modal } from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './CustomerPage.less';

class CustomerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      showModal: false,
    };
    this.handleEditOpen = ::this.handleEditOpen;
    this.handleEditClose = ::this.handleEditClose;
    this.saveCustomer = ::this.saveCustomer;
    this.handleDelete = ::this.handleDelete;
    this.closeModal = ::this.closeModal;
    this.openModal = ::this.openModal;
    this.createCustomer = ::this.createCustomer;
    this.renderCustomer = ::this.renderCustomer;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isEditing: false });
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

  handleEditOpen() {
    this.setState({ isEditing: true });
  }

  saveCustomer() {
    let props = {
      name: this.name.value || 'Not specified',
      address: this.address.value || 'Not specified',
      phone: this.phone.value || 'Not specified',
    };
    this.props.onUpdate({
      ...props,
    });
  }

  handleEditClose() {
    this.setState({ isEditing: false });
  }

  createCustomer() {
    let props = {
      name: this.createName.value || 'Not specified',
      address: this.createAddress.value || 'Not specified',
      phone: this.createPhone.value || 'Not specified',
    };
    this.props.onCreateCustormer({
      ...props,
    });
  }

  renderCustomer() {
    let { id, name, address, phone, createdAt, updatedAt } = this.props.customer;
    let dateOption = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    createdAt = new Date(Date.parse(createdAt)).toLocaleString("en-US", dateOption);
    updatedAt = new Date(Date.parse(updatedAt)).toLocaleString("en-US", dateOption);
    if (this.props.error) {
      return (
        <div>{`${this.props.error}`}</div>
      );
    }

    return (
      <div>
        {
          this.state.isEditing
          ?
          <div>
            <div className='customer__title'>
              <h2>Edit Info</h2>
              <Button onClick={this.openModal}><Glyphicon glyph="trash"/></Button>
            </div>
            <div className='title'><div>Name: </div>
              <input type='text' defaultValue={name} ref={c => this.name = c}/>
            </div>
            <div className='title'><div>Address: </div>
              <input type='text' defaultValue={address} ref={c => this.address = c}/>
            </div>
            <div className='title'><div>Phone: </div>
              <input type='text' defaultValue={phone} ref={c => this.phone = c}/>
            </div>
            <ButtonToolbar className='customer__toolbar'>
              <Button bsStyle="success" className='' onClick={this.saveCustomer}>Save</Button>
              <Button bsStyle="danger" onClick={this.handleEditClose}>Cancel</Button>
            </ButtonToolbar>
          </div>
          :
          <div>
            <div className='customer__title'>
              <h2>Customer Info</h2>
              <ButtonToolbar>
                <Button onClick={this.handleEditOpen}><Glyphicon glyph="cog"/></Button>
                <Button onClick={this.openModal}><Glyphicon glyph="trash"/></Button>
              </ButtonToolbar>
            </div>
            <div className='title'><div>Name: </div><b>{name}</b></div>
            <div className='title'><div>Address: </div><b>{address}</b></div>
            <div className='title'><div>Phone: </div><b>{phone}</b></div>
          </div>
        }
        <div className='title'><div>CreatedAt: </div><b>{createdAt}</b></div>
        <div className='title'><div>UpdatedAt: </div><b>{updatedAt}</b></div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to delete Customer (<span className='customer_delete'>{name}</span>)</h4>
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

  render() {
    if (this.props.creatingCustomer) {
      let { router } = this.context;
      return (
        <div className='customer__info'>
          <div className='customer__title'>
            <h2>Create Customer</h2>
          </div>
          <div className='title'><div>Name: </div>
            <input type='text' ref={c => this.createName = c}/>
          </div>
          <div className='title'><div>Address: </div>
            <input type='text' ref={c => this.createAddress = c}/>
          </div>
          <div className='title'><div>Phone: </div>
            <input type='text' ref={c => this.createPhone = c}/>
          </div>
          <ButtonToolbar className='customer__toolbar'>
            <Button bsStyle="success" className='' onClick={this.createCustomer}>Save</Button>
            <Button bsStyle="danger" onClick={router.push.bind('null', '/customers/')}>Cancel</Button>
          </ButtonToolbar>
        </div>
      );
    }

    return (
      <div className='customer__info'>
        {
          this.props.isLoadingCustomer
          ?
          <MuiThemeProvider>
            <CircularProgress size={80} thickness={5} />
          </MuiThemeProvider>
          :
          this.renderCustomer()
        }
      </div>
    );
  }
}

CustomerPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default CustomerPage;
