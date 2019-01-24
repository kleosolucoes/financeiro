import React from 'react'
import { capitalizeFirstLetter } from './helpers/funcoes'
import Listagens from './components/Listagens'
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
		//tela: 'principal',
		tela: 'lancamentos',
	}

	alterarTela = (tela) => this.setState({tela})

	render() {
		const { tela } = this.state
		return (
			<Container style={FolhaDeEstilo.containerStyle}>
				<Menu alterarTela={this.alterarTela} nomeDaTela={tela} />
				<div>
		      <Breadcrumb>
		        <BreadcrumbItem active><h5>{capitalizeFirstLetter(tela)}</h5></BreadcrumbItem>
		      </Breadcrumb>
				</div>
				{
					tela === STRING_PRINCIPAL &&
						<p>{tela}</p>
				}
				{
					tela !== STRING_PRINCIPAL &&
					<Listagens tipo={tela} />
				}
			</Container>
		)
	}
}

export default App
