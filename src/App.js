import React from 'react'
import { capitapzeFirstLetter } from './helpers/funcoes'
import Menu from './components/Menu'
import {FolhaDeEstilo} from './components/FolhaDeEstilo'
import {
	Container,
	Breadcrumb,
	BreadcrumbItem,
} from 'reactstrap'
import {
	STRING_PRINCIPAL,
} from './helpers/constantes'

class App extends React.Component {

	state = {
		tela: null,
	}

	alterarTela = (tela) => this.setState({tela})

	render() {
		const { tela } = this.state
		return (
			<Container style={FolhaDeEstilo.containerStyle}>
				<Menu alterarTela={this.alterarTela} nomeDaTela={tela} />
				<div>
					<h1>Empresa Igreja</h1>
					<p>Extrato</p>
					<p>Lançamento varios</p>
					<h1>Administrativo</h1>
					<p>Extrato por categoria e total</p>
					<p>Lançamento 1</p>
					<p>Categoria</p>
					<p>Empresa</p>
					<p>usuarios</p>
				</div>
			</Container>
		)
	}
}

export default App
