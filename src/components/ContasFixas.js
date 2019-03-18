import React from 'react'
import {
	Row,
	Table,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import Responsive from 'react-responsive';
import ContaFixa from './ContaFixa'
import ContaFixaSalvar from './ContaFixaSalvar'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus)

class ContasFixas extends React.Component {

	state = {
		mostrarSalvarContaFixa: false,
	}

	alternarMostrarSalvarContaFixa = () => this.setState({mostrarSalvarContaFixa: !this.state.mostrarSalvarContaFixa})

	render() {
		const { 
			contaFixa,
		} = this.props
		const Desktop = props => <Responsive {...props} minWidth={992} />;

		return (
			<div style={{padding: 5}}>
				{
					this.state.mostrarSalvarContaFixa &&
						<ContaFixaSalvar
							empresa_id={this.props.empresa_id}
							alternarMostrarSalvarContaFixa={this.alternarMostrarSalvarContaFixa}
						/>
				}
				{
					!this.state.mostrarSalvarContaFixa &&
						<div>
							<Row style={{justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
								<h5 style={{margin: 0}}>Contas Fixas</h5>
								<div>
									<Row style={{justifyContent: 'flex-end', padding: 10}}>
										<Button 
											type='button' 
											className="botao-lancar"
											onClick={this.alternarMostrarSalvarContaFixa}
										>
											<FontAwesomeIcon icon="user-plus" size="sm" style={{marginRight: 5}} />
											Adicionar
										</Button>
									</Row>
								</div>
							</Row>
							<Table style={{textAlign: 'center'}}>
								<thead style={{background: '#7CC9BC', color: '#fff'}}>
									<tr>
										<Desktop><th>Data</th></Desktop>
										<th>Gerar dia</th>
										<Desktop><th>Notificar dia</th></Desktop>
										<th>Categoria</th>
										<Desktop><th>Credito/Debito</th></Desktop>
										<th></th>
									</tr>
								</thead>
							{
								contaFixa &&
									contaFixa
									.map(contaFixa => {
										return (
											<ContaFixa
												key={contaFixa._id}
												contaFixa_id={contaFixa._id}
											/>
										)
									})
							}
							</Table>
						</div>
				}
			</div>
		)
	}
}

const mapStateToProps = ({contaFixa}, { empresa_id }) => {
	const contaFixaSelecionada = contaFixa && contaFixa.filter(contaFixa => contaFixa.empresa_id === empresa_id && contaFixa.data_inativacao === null)
	return {
		contaFixa: contaFixaSelecionada,
	}
}

export default connect(mapStateToProps, null)(ContasFixas)
