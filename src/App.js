import React from 'react'
import Menu from './components/Menu'
import Lancamentos from './components/Lancamentos'
import Empresas from './components/Empresas'
import ExtratoAdministracao from './components/ExtratoAdministracao'
import Usuarios from './components/Usuarios'
import Categorias from './components/Categorias'
import ExtratoEmpresa from './components/ExtratoEmpresa'
import LancarVarios from './components/LancarVarios'
import LancarUm from './components/LancarUm'
import { FolhaDeEstilo } from './components/FolhaDeEstilo'
import {
	Container,
} from 'reactstrap'
import { connect } from 'react-redux'

class App extends React.Component {

	state = {
		tela: 'lancarUm',
	}

	alterarTela = (tela) => {
		this.setState({tela})
	}

	render() {
		const { tela } = this.state
		return (
			<Container style={FolhaDeEstilo.containerStyle}>
				<Menu alterarTela={this.alterarTela} nomeDaTela={tela} />
				<div>
					{
						tela === 'extratoEmpresa' &&
							<ExtratoEmpresa />
					}
					{
						tela === 'lancarVarios' &&
							<LancarVarios />
					}
					{
						tela === 'extratoAdministracao' &&
							<ExtratoAdministracao /> 
					}
					{
						tela === 'lancarUm' &&
							<LancarUm alterarTela={this.alterarTela} />
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
					{
						tela === 'usuarios' &&
							<Usuarios />
					}
				</div>
			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps, null)(App)
