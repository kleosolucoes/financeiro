import React from 'react'
import Menu from './components/Menu'
import Lancamentos from './components/Lancamentos'
import Empresas from './components/Empresas'
import ExtratoAdministracao from './components/ExtratoAdministracao'
import Categorias from './components/Categorias'
import ExtratoEmpresa from './components/ExtratoEmpresa'
import LancarVarios from './components/LancarVarios'
import LancarUm from './components/LancarUm'
import Usuarios from './components/Usuarios'
import Login from './components/Login'
import {
	Container,
} from 'reactstrap'
import { connect } from 'react-redux'
import { 
	salvarUsuarioLogado, 
} from './actions'
import {
	TELA_EXTRATO_ADMINISTRACAO,
	TELA_EXTRATO_EMPRESA,
} from './helpers/constantes'

class App extends React.Component {

	state = {
		tela: 'login',
	}

	alterarTela = (tela) => {
		this.setState({tela})
	}

	sair = () => {
		this.props.salvarUsuarioLogado({
			usuario_id: null,
			empresa_id: null,
			token: null,
		})
		this.alterarTela('login')
	}

	render() {
		const { tela } = this.state
		const { empresa_id } = this.props
		return (
			<Container>
				{
					empresa_id &&
						<Menu 
							alterarTela={this.alterarTela} 
							nomeDaTela={tela} 
							sair={this.sair}
						/>
				}
				<div>
					{
						tela === 'login' &&
							<Login
								alterarTela={this.alterarTela}
							/>
					}
					{
						tela === TELA_EXTRATO_EMPRESA &&
							<ExtratoEmpresa />
					}
					{
						tela === 'lancarVarios' &&
							<LancarVarios
								alterarTela={this.alterarTela}
							/>
					}
					{
						tela === 'usuarios' &&
							<Usuarios 
								empresa_id={empresa_id}
							/>
					}
					{
						tela === TELA_EXTRATO_ADMINISTRACAO &&
							<ExtratoAdministracao /> 
					}
					{
						tela === 'lancarUm' &&
							<LancarUm
								alterarTela={this.alterarTela}
							/>
					}
					{
						tela === 'lancamentos' && 
							<Lancamentos />
					}
					{
						tela === 'categorias' &&
							<Categorias />
					}
					{
						tela === 'empresas' &&
							<Empresas />
					}
				</div>
			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		empresa_id: state.usuarioLogado.empresa_id,
		token: state.usuarioLogado.token,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarUsuarioLogado: (elemento) => dispatch(salvarUsuarioLogado(elemento)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
