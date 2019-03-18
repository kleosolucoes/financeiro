import React from 'react'
import {
	Row,
	Col,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import Responsive from 'react-responsive';
import { removerContaFixaNaApi } from '../actions'
import { STRING_DEBITO, STRING_CREDITO, } from '../helpers/constantes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserMinus, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faUserMinus)
library.add(faTrash)

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
		const Desktop = props => <Responsive {...props} minWidth={992} />;
		return (
			<tbody>
					<tr>
						<Desktop><td> {contaFixa.data_criacao} </td></Desktop>
						<td> {contaFixa.dia_gerar} </td>
						<Desktop><td> {contaFixa.dia_notificacao} </td></Desktop>
						<td> {categoria.nome}  </td>
						<Desktop><td> {categoria.credito_debito === 'C' ? STRING_CREDITO : STRING_DEBITO} </td></Desktop>
						
				<Row style={{padding: 5}}>
					<Col>
						<Button 
							type='button' 
							className="botao-remover"
							style={{width: '100%', borderRadius: 0}}
							onClick={this.removerContaFixa}
			 			>
			 				<FontAwesomeIcon icon="trash" size="sm" style={{marginRight: 5}} />
						</Button> 
					</Col>
			 	</Row>

			</tr>
			</tbody>
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
