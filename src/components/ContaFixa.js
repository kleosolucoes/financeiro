import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'
import { removerContaFixaNaApi } from '../actions'
import { STRING_DEBITO, STRING_CREDITO, } from '../helpers/constantes'

class ContaFixa extends React.Component {

	removerContaFixa = () => {
		if(window.confirm('Realmente deseja remover essa conta fixa?')){
			const {
				contaFixa,
				usuarioLogado,
				removerContaFixaNaApi,
			} = this.props
			let elemento = {}
			elemento.quem_inativou_id = usuarioLogado.usuario_id
			elemento.conta_fixa_id = contaFixa._id 
			removerContaFixaNaApi(elemento, usuarioLogado.token)
			alert('Conta Fixa Removida com Sucesso!')
		}
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
						{contaFixa._id}
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
						{categoria && categoria.nome}
					</Col>
				</Row>
				<Row>
					<Col>
						Credito/Debito
					</Col>
					<Col>
						{categoria && categoria.credito_debito === 'C' ? STRING_CREDITO : STRING_DEBITO}
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

const mapStateToProps = ({usuarioLogado, contaFixa, categorias}, {contaFixa_id}) => {
	const contaFixaSelecionada = contaFixa && contaFixa.find(contaFixa => contaFixa._id === contaFixa_id)
	const categoria = categorias && categorias.find(categoria => categoria._id === contaFixaSelecionada.categoria_id)
	return {
		contaFixa: contaFixaSelecionada,
		categoria,
		usuarioLogado,
	}
}

function mapDispatchToProps(dispatch){
	return {
		removerContaFixaNaApi: (elemento, token) => dispatch(removerContaFixaNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContaFixa)
