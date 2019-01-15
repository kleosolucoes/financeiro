import React from 'react'
import Listagens from './components/Listagens'
import Menu from './components/Menu'
import {
	Container,
	Alert,
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
			<Container style={{backgroundColor: '#f2f2f2'}}>
				<Menu alterarTela={this.alterarTela} />
				<Alert>{tela}</Alert>
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
