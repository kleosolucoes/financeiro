import React from 'react'
import Lancamento from './components/Lancamento'
import {connect} from 'react-redux';
import { 
	Container, 
	ListGroup, 
	Alert, 
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap'

class App extends React.Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		const { lancamentos } = this.props
		return (
			<Container>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">Financeiro</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="/components/">Components</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
				<Alert>Lançamentos</Alert>
				<ListGroup>
					{
						lancamentos &&
							lancamentos.map((lancamento, indice) => 
								<Lancamento 
									key={indice} 
									lancamento={lancamento}
								/>
							)
					}
				</ListGroup>
			</Container>
		)
	}
}

function mapStateToProps({ lancamentos }){
	return {
		lancamentos,
	}
}

export default connect(mapStateToProps, null)(App)
