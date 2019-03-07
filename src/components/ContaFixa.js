import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'
import { salvarContaFixa } from '../actions'
import { pegarDataEHoraAtual } from '../helpers/funcoes'

class ContaFixa extends React.Component {

	removerContaFixa = () => {
		let contaFixa = this.props.contaFixa

		contaFixa.data_inativacao = pegarDataEHoraAtual()[0]
		contaFixa.hora_inativacao = pegarDataEHoraAtual()[1]
		contaFixa.quem_inativou_id = this.props.usuario_id
		this.props.salvarContaFixa(contaFixa)
	}

	render() {
		const { 
			contaFixa, 
			categoria,
		} = this.props
		return (
			<div style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
				<Row>
					<Col>
						Id
					</Col>
					<Col>
						{contaFixa.id.toString().padStart(8,0)}
					</Col>
				</Row>
				<Row>
					<Col>
						Data
					</Col>
					<Col>
						{contaFixa.data_criacao}
					</Col>
				</Row>
				<Row>
					<Col>
						Gerar dia
					</Col>
					<Col>
						{contaFixa.dia_gerar}
					</Col>
				</Row>
				<Row>
					<Col>
						Notificar dia
					</Col>
					<Col>
						{contaFixa.dia_notificacao}
					</Col>
				</Row>
				<Row>
					<Col>
						Categoria
					</Col>
					<Col>
						{categoria.nome}
					</Col>
				</Row>
				<Row>
					<Col>
						Credito/Debito
					</Col>
					<Col>
						{categoria.credito_debito === 'C' ? 'Credito' : 'Debito'}
					</Col>
				</Row>
				<Row style={{padding: 5}}>
					<Col>
						<button 
							type='button' 
							style={{width: '100%'}} 
							onClick={this.removerContaFixa}
						>
							Remover
						</button> 
					</Col>
				</Row>

			</div>
		)
	}
}

const mapStateToProps = (state, {contaFixa_id}) => {
	const contaFixa = state.contaFixa
		.find(contaFixa => contaFixa.id === contaFixa_id)
	const categoria = state.categorias
		.find(categoria => categoria.id === contaFixa.categoria_id)
	return {
		contaFixa,
		categoria,
		usuario_id: state.usuarioLogado.usuario_id,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarContaFixa: (elemento, novo) => dispatch(salvarContaFixa(elemento, novo)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContaFixa)
