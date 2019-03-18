import React from 'react'
import {
	Row,
	Col,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { salvarContaFixa } from '../actions'
import Responsive from 'react-responsive';
import { pegarDataEHoraAtual } from '../helpers/funcoes'
import { STRING_DEBITO, STRING_CREDITO, } from '../helpers/constantes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserMinus, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faUserMinus)
library.add(faTrash)

class ContaFixa extends React.Component {

	removerContaFixa = () => {
		if(window.confirm('Realmente deseja remover essa conta fixa?')){
			let contaFixa = this.props.contaFixa
			contaFixa.data_inativacao = pegarDataEHoraAtual()[0]
			contaFixa.hora_inativacao = pegarDataEHoraAtual()[1]
			contaFixa.quem_inativou_id = this.props.usuario_id
			this.props.salvarContaFixa(contaFixa)
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
