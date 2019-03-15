import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'
import ContaFixa from './ContaFixa'
import ContaFixaSalvar from './ContaFixaSalvar'

class ContasFixas extends React.Component {

	state = {
		mostrarSalvarContaFixa: false,
	}

	alternarMostrarSalvarContaFixa = () => this.setState({mostrarSalvarContaFixa: !this.state.mostrarSalvarContaFixa})

	render() {
		const { 
			contaFixa,
		} = this.props
		return (
			<div style={{padding: 5, backgroundColor: 'lightgreen'}}>
				<p>Contas Fixas</p>
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
							<div style={{padding: 10, backgroundColor: 'lightblue'}}>
								<Row>
									<Col>
										<button 
											type='button' 
											style={{width: '100%'}}
											onClick={this.alternarMostrarSalvarContaFixa}
										>
											Adicionar Conta Fixa
										</button>
									</Col>
								</Row>
							</div>
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
