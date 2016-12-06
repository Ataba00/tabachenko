import React from 'react';

import { ButtonToolbar, Button, Glyphicon, Modal } from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './ProductPage.less';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      showModal: false,
    };
    this.handleEditOpen = ::this.handleEditOpen;
    this.handleEditClose = ::this.handleEditClose;
    this.saveProduct = ::this.saveProduct;
    this.handleDelete = ::this.handleDelete;
    this.closeModal = ::this.closeModal;
    this.openModal = ::this.openModal;
    this.createProduct = ::this.createProduct;
    this.renderProduct = ::this.renderProduct;
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

  saveProduct() {
    let props = {
      name: this.name.value || 'Not specified',
      price: this.price.value || '0',
    };
    this.props.onUpdate({
      ...props,
    });
  }

  handleEditClose() {
    this.setState({ isEditing: false });
  }

  createProduct() {
    let props = {
      name: this.createName.value || 'Not specified',
      price: this.createPrice.value || '0',
    };
    this.props.onCreateCustormer({
      ...props,
    });
  }

  renderProduct() {
    let { id, name, price, createdAt, updatedAt } = this.props.product;
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
            <div className='product__title'>
              <h2>Edit Info</h2>
              <Button onClick={this.openModal}><Glyphicon glyph="trash"/></Button>
            </div>
            <div className='title'><div>Name: </div>
              <input type='text' defaultValue={name} ref={c => this.name = c}/>
            </div>
            <div className='title'><div>Price: </div>
              <input type='number' defaultValue={price} min='0' ref={c => this.price = c}/>
            </div>
            <ButtonToolbar className='product__toolbar'>
              <Button bsStyle="success" className='' onClick={this.saveProduct}>Save</Button>
              <Button bsStyle="danger" onClick={this.handleEditClose}>Cancel</Button>
            </ButtonToolbar>
          </div>
          :
          <div>
            <div className='product__title'>
              <h2>Product Info</h2>
              <ButtonToolbar>
                <Button onClick={this.handleEditOpen}><Glyphicon glyph="cog"/></Button>
                <Button onClick={this.openModal}><Glyphicon glyph="trash"/></Button>
              </ButtonToolbar>
            </div>
            <div className='title'><div>Name: </div><b>{name}</b></div>
            <div className='title'><div>Price: </div><b>{price}</b></div>
          </div>
        }
        <div className='title'><div>CreatedAt: </div><b>{createdAt}</b></div>
        <div className='title'><div>UpdatedAt: </div><b>{updatedAt}</b></div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to delete Product (<span className='product_delete'>{name}</span>)</h4>
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
    if (this.props.creatingProduct) {
      let { router } = this.context;
      return (
        <div className='product__info'>
          <div className='product__title'>
            <h2>Create Product</h2>
          </div>
          <div className='title'><div>Name: </div>
            <input type='text' ref={c => this.createName = c}/>
          </div>
          <div className='title'><div>Price: </div>
            <input type='number' min='0' ref={c => this.createPrice = c}/>
          </div>
          <ButtonToolbar className='product__toolbar'>
            <Button bsStyle="success" className='' onClick={this.createProduct}>Save</Button>
            <Button bsStyle="danger" onClick={router.push.bind('null', '/products/')}>Cancel</Button>
          </ButtonToolbar>
        </div>
      );
    }

    return (
      <div className='product__info'>
        {
          this.props.isLoadingProduct
          ?
          <MuiThemeProvider>
            <CircularProgress size={80} thickness={5} />
          </MuiThemeProvider>
          :
          this.renderProduct()
        }
      </div>
    );
  }
}

ProductPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default ProductPage;
