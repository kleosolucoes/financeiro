import React from 'react'
import { capitalizeFirstLetter } from '../helpers/funcoes'
import { 
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap'
import { connect } from 'react-redux'
import { EMPRESA_ADMINISTRACAO_ID } from '../helpers/constantes'

class Menu extends React.Component {
	state = {
		menuAberto: false,
		tela: null,
	};

	toggleMenu = () => {
		this.setState({menuAberto: !this.state.menuAberto})
	}

	alterarTela(tela){
		const { alterarTela } = this.props
		this.toggleMenu()
		this.setState({ tela });
		alterarTela(tela)
	}

	render() {
		const { listaDoMenu } = this.props;
		const { menuAberto } = this.state;

		return (
			<Navbar fixed="top" color="success" light={true} expand="lg">
				<NavbarBrand href="#">Financeiro</NavbarBrand>
				<NavbarToggler onClick={this.toggleMenu} />
				<Collapse isOpen={menuAberto} navbar>
					<Nav className="ml-auto" navbar>
						{
							listaDoMenu &&
								listaDoMenu.map(item => (
									<NavItem>
										<NavLink 
											onClick={() => {this.alterarTela(item)} } 
											href='#'>
											{capitalizeFirstLetter(item)}
										</NavLink>
									</NavItem>
								))
						}
						<NavItem>
							<NavLink 
								onClick={() => {this.props.sair()} } 
								href='#'>
								Sair
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		)
	}
}

function mapStateToProps({usuarioLogado}){
	let listaDoMenu = []
	if(usuarioLogado){
		const empresa_id = usuarioLogado.empresa_id
		if(empresa_id === EMPRESA_ADMINISTRACAO_ID){
			listaDoMenu.push('extratoAdministracao')
			listaDoMenu.push('lancarUm')
			listaDoMenu.push('lancamentos')
			listaDoMenu.push('categorias')
			listaDoMenu.push('empresas')
			listaDoMenu.push('usuarios')
			listaDoMenu.push('contasFixas')
		}else{
			listaDoMenu.push('extratoEmpresa')
			listaDoMenu.push('lancarVarios')
			listaDoMenu.push('lancamentos')
			listaDoMenu.push('usuarios')
		}
	}
	return{
		listaDoMenu,
	}
}

export default connect(mapStateToProps, null)(Menu)
