import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'
import { formatReal, getMoney } from '../helpers/funcoes'

class LancarUm extends React.Component {

	state = {
		categoria_id: 0,
		valor: '0.00',
		taxa: '0.00',
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name

		if(name === 'valor' || name === 'taxa'){
			const valorInteiro = getMoney(valor) + ''
			const valorComZerosAEsquerda = valorInteiro.padStart(3, '0')
			valor = formatReal(valorComZerosAEsquerda)
		}
		this.setState({[name]: valor})
	}

	render() {
		const {
			categorias,
		} = this.props
		return (
			<div style={{padding: 10, backgroundColor: 'lightcyan'}}>
				<Row>
					<Col>
						Categoria
					</Col>
					<Col>
						<select
							type='select'
							name='categoria_id'
							value={this.state.categoria_id}
							onChange={this.ajudadorDeCampo}
						>
							<option value={0}>Selecione</option>
							{
								categorias &&
									categorias.map(categoria => {
										return (
											<option value={categoria.id}>{categoria.nome}</option>
										)
									})
							}
						</select>
					</Col>
				</Row>

				<Row>
					<Col>
						Valor
					</Col>
					<Col>
						<input
							type='number'
							name='valor'
							value={this.state.valor}
							onChange={this.ajudadorDeCampo}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						Taxa
					</Col>
					<Col>
						<input
							type='number'
							name='taxa'
							value={this.state.taxa}
							onChange={this.ajudadorDeCampo}
						/>
					</Col>
				</Row>
				<div style={{padding: 10, backgroundColor: 'lightblue'}}>
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
		categorias: state.categorias,
	}
}

function mapDispatchToProps(dispatch){
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LancarUm)
