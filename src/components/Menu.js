import React from 'react'
import {
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap'
import { capitalizeFirstLetter } from '../helpers/funcoes'

class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this)
	}

	state = {
		isOpen: false,
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	alterarTela(tela){
		const { alterarTela } = this.props
		this.toggle()
		alterarTela(tela)
	}
		render() {
		const { nomeDaTela } = this.props
		return (
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">Financeiro - {capitalizeFirstLetter(nomeDaTela)}</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink
								onClick={() => {this.alterarTela('lancamentos')} }
								href='#'>
								Lançamentos
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								onClick={() => {this.alterarTela('categorias')} }
								href='#'>
								Categorias
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								onClick={() => {this.alterarTela('empresas')} }
								href='#'>
								Empresas
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								onClick={() => {this.alterarTela('fornecedores')} }

								href='#'>
								Fornecedores
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								onClick={() => {this.alterarTela('clientes')} }
								href='#'>
								Clientes
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								onClick={() => {this.alterarTela('usuarios')} }
								href='#'>
								Usuários
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		)
	}
}

export default Menu
