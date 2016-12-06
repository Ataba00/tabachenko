import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = ::this.handleSelect;
  }

  handleSelect(eventKey) {
    const { router } = this.context;
    router.push.call(null, `${eventKey}`);
  }

  render() {
    const { router } = this.context;
    return (
      <div className='App'>
        <Navbar collapseOnSelect onSelect={this.handleSelect}>
          <Navbar.Header>
            <Navbar.Brand >
              <span style={{ cursor: 'pointer' }} onClick={router.push.bind(null, `/`)}
                >Invoice App</span>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey="/products" >Products</NavItem>
              <NavItem eventKey="/customers" >Customers</NavItem>
              <NavItem eventKey="/invoices" >Invoices</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default App;
