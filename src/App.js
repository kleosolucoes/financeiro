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
import { salvarUsuarioLogado, } from './actions'

class App extends React.Component {

	state = {
		tela: 'login',
	}

	alterarTela = (tela) => {
		this.setState({tela})
	}

	sair = () => {
		this.props.salvarUsuarioLogado({usuario_id: null})
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
						tela === 'extratoEmpresa' &&
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
						tela === 'extratoAdministracao' &&
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
	let empresa_id = null
	if(state.usuarioLogado.usuario_id){
		const usuarioLogado = state.usuarioLogado
		const usuario = state.usuarios.find(usuario => usuario.id === usuarioLogado.usuario_id)
		empresa_id = usuario.empresa_id
	}
	return {
		empresa_id,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarUsuarioLogado: (elemento) => dispatch(salvarUsuarioLogado(elemento)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
