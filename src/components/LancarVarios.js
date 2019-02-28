import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'
import { formatReal, getMoney } from '../helpers/funcoes'

class LancarVarios extends React.Component {

	state = {
		dizimoDinheiro: '0.00',
		dizimoDebito: '0.00',
		dizimoCredito: '0.00',
		dizimoMoeda: '0.00',
		ofertaDinheiro: '0.00',
		ofertaDebito: '0.00',
		ofertaCredito: '0.00',
		ofertaMoeda: '0.00',
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name

		const valorFormatado = formatReal(getMoney(valor).toString().padStart(3, '0'))

		this.setState({[name]: valorFormatado})
	}

	render() {
		return (
			<div>
				<div style={{padding: 10, backgroundColor: 'lightcyan'}}>
					<Row>
						<Col>
							Dizimo
						</Col>
					</Row>
					<Row>
						<Col>
							Dinheiro
						</Col>
						<Col>
							<input
								type='number'
								name='dizimoDinheiro'
								value={this.state.dizimoDinheiro}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Cartão Débito
						</Col>
						<Col>
							<input
								type='number'
								name='dizimoDebito'
								value={this.state.dizimoDebito}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Cartão Crédito
						</Col>
						<Col>
							<input
								type='number'
								name='dizimoCredito'
								value={this.state.dizimoCredito}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Moeda
						</Col>
						<Col>
							<input
								type='number'
								name='dizimoMoeda'
								value={this.state.dizimoMoeda}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
				</div>
				<div style={{padding: 10, backgroundColor: 'lightblue'}}>
					<Row>
						<Col>
							Oferta
						</Col>
					</Row>
					<Row>
						<Col>
							Dinheiro
						</Col>
						<Col>
							<input
								type='number'
								name='ofertaDinheiro'
								value={this.state.ofertaDinheiro}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Cartão Débito
						</Col>
						<Col>
							<input
								type='number'
								name='ofertaDebito'
								value={this.state.ofertaDebito}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Cartão Crédito
						</Col>
						<Col>
							<input
								type='number'
								name='ofertaCredito'
								value={this.state.ofertaCredito}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Moeda
						</Col>
						<Col>
							<input
								type='number'
								name='ofertaMoeda'
								value={this.state.ofertaMoeda}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
				</div>
				<div style={{padding: 10, backgroundColor: 'lightcyan'}}>
					<Row>
						<Col>
							<button type='button' style={{width: '100%'}}>
								Salvar
							</button>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {

	}
}

function mapDispatchToProps(dispatch){
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LancarVarios)
