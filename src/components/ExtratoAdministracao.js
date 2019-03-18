import React from 'react'
import {
	Row,
	Col,
	Card,
	CardTitle,
	CardText,
} from 'reactstrap'
import { connect } from 'react-redux'
import { SITUACAO_RECEBIDO, SITUACAO_NAO_RECEBIDO } from '../helpers/constantes'
import { STRING_DEBITO, STRING_CREDITO, } from '../helpers/constantes'
import './aux.css';

// ICONS
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faFileAlt, faPowerOff, faQuestionCircle, faBriefcase, faList, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
library.add(faUser)
library.add(faBriefcase)
library.add(faFileInvoiceDollar)
library.add(faFileAlt)
library.add(faPowerOff)
library.add(faQuestionCircle)
library.add(faList)

class ExtratoAdministracao extends React.Component {

	render() {
		const { 
			saldo,
			naoRecebidoCredito,
			naoRecebidoDebito,
			listaDeNaoRecebidoPorCategorias,
			categorias,
		} = this.props
		return (
			<div style={{marginTop: 80}}>
				<div style={{background: '#f9f7f7'}}>
					<h5 style={{padding: 10, fontWeight: '300', color: '#2f8c7c'}}>Olá, Diego Kort!</h5>

					<Row style={{justifyContent: 'center'}}>
						<Col> 
							<Card className="card-saldo">
								<CardTitle style={{color: '#2f8c7c'}}>R$ {saldo}</CardTitle>
								<CardText style={{fontSize: 12}}>Saldo</CardText>
							</Card> 
						</Col>
						<Col>
							<Card className="card-saldo">
								<CardTitle style={{color: 'brown'}}>R$ {naoRecebidoCredito}</CardTitle>
								<CardText style={{fontSize: 12}}>Não Aceitos - Creditos</CardText>
							</Card>
						</Col>
						<Col>
							<Card className="card-saldo">
								<CardTitle style={{color: 'brown'}}>R$ {naoRecebidoDebito}</CardTitle>
								<CardText style={{fontSize: 12}}>Não Aceitos - Debitos</CardText>
							</Card>
						</Col>
					</Row>
				</div>	

				<div style={{backgroundColor: 'lightcyan', padding: 20}}>
					<Row>
						<Col style={{textAlign: 'center', backgroundColor: '#AAA'}}>
							Não Aceitos
						</Col>
					</Row>
					{
						categorias &&
							categorias.map(categoria => {
								return (
									<Row key={categoria._id}>
										<Col>
											<a href='#' onClick={() => this.props.alterarTela('lancamentos', categoria._id)}>
												{categoria.credito_debito === 'C' ? STRING_CREDITO : STRING_DEBITO } - {categoria.nome}
											</a>
										</Col>
										<Col> 
											{listaDeNaoRecebidoPorCategorias[categoria._id]}
										</Col>
									</Row>
								)
							})
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	let token = null
	if(state.usuarioLogado){
		token = state.usuarioLogado.token
	}
	let saldo = 0
	let naoRecebidoCredito = 0
	let naoRecebidoDebito = 0
	let listaDeNaoRecebidoPorCategorias = []
	if(
		state.categorias 
		&& state.lancamentoSituacao
		&& state.lancamentos
		&& state.situacoes
	){
		state.categorias.forEach(categoria => listaDeNaoRecebidoPorCategorias[categoria._id.toString()] = 0)
		state.lancamentos.forEach(lancamento => {
			const lancamentoSituacaoAtiva = state.lancamentoSituacao
				.find(lancamentoSituacao => lancamento._id.toString() === lancamentoSituacao.lancamento_id 
					&& lancamentoSituacao.data_inativacao === null)

			if(lancamentoSituacaoAtiva){
				const situacaoAtiva = state.situacoes
					.find(situacao => lancamentoSituacaoAtiva.situacao_id === situacao._id.toString())

				const categoriaAtiva = state.categorias
					.find(categoria => lancamento.categoria_id === categoria._id.toString())

				const valorFormatado = parseFloat(lancamento.valor)
				if(situacaoAtiva._id.toString() === SITUACAO_RECEBIDO){
					if(categoriaAtiva.credito_debito === 'C'){
						saldo += valorFormatado
					}else{
						saldo -= valorFormatado
					}
				}
				if(situacaoAtiva._id.toString() === SITUACAO_NAO_RECEBIDO){
					if(categoriaAtiva.credito_debito === 'C'){
						naoRecebidoCredito += valorFormatado
					}else{
						naoRecebidoDebito += valorFormatado
					}
					listaDeNaoRecebidoPorCategorias[categoriaAtiva._id] += valorFormatado
				}
			}
		})
	}

	return {
		saldo,
		naoRecebidoCredito,
		naoRecebidoDebito,
		listaDeNaoRecebidoPorCategorias,
		categorias: state.categorias,
		lancamentos: state.lancamentos,
		token,
	}
}

export default connect(mapStateToProps, null)(ExtratoAdministracao)
