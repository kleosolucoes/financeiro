import React from 'react'
import {
	Row,
	Col,
	Card,
	CardTitle,
	CardText,
} from 'reactstrap'
import { connect } from 'react-redux'
// import Lancamentos from './Lancamentos'
import { SITUACAO_RECEBIDO, SITUACAO_NAO_RECEBIDO } from '../helpers/constantes'
import { 
	pegarUsuarioDaApi,
	pegarUsuarioTipoDaApi,
	pegarUsuarioSituacaoDaApi,
	pegarSituacaoDaApi,
	pegarCategoriaDaApi,
	pegarEmpresaDaApi,
	pegarEmpresaTipoDaApi,
	pegarContaFixaDaApi,
	pegarLancamentoDaApi,
	pegarLancamentoSituacaoDaApi,
	salvarUsuarioLogado, 
} from '../actions'
import './aux.css';

// ICONS
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faFileInvoiceDollar, faFileAlt, faPowerOff, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faUser)
library.add(faFileInvoiceDollar)
library.add(faFileAlt)
library.add(faPowerOff)
library.add(faQuestionCircle)

class ExtratoEmpresa extends React.Component {

	puxarTodosDados(){
		if(this.props.token && this.props.puxeiUmaVez){
			this.props.pegarUsuarioDaApi(this.props.token)			
			this.props.pegarUsuarioTipoDaApi(this.props.token)
			this.props.pegarUsuarioSituacaoDaApi(this.props.token)
			this.props.pegarSituacaoDaApi(this.props.token)
			this.props.pegarCategoriaDaApi(this.props.token)
			this.props.pegarEmpresaDaApi(this.props.token)
			this.props.pegarEmpresaTipoDaApi(this.props.token)
			this.props.pegarContaFixaDaApi(this.props.token)
			this.props.pegarLancamentoDaApi(this.props.token)
			this.props.pegarLancamentoSituacaoDaApi(this.props.token)
			this.props.salvarUsuarioLogado({puxeiUmaVez: false})
		}
	}

	componentDidMount(){
		this.puxarTodosDados()
	}

	render() {
		const { 
			saldo,
			naoRecebido,
		} = this.props
		return (
			<div style={{marginTop: 80}}>
				<div style={{background: '#f9f7f7'}}>
					<h5 style={{padding: 10, fontWeight: '300', color: '#2f8c7c'}}>Olá, Leonardo Pereira!</h5>
				
					<Row style={{justifyContent: 'center'}}>
						<Col> 
							<Card className="card-saldo">
								<CardTitle style={{color: '#2f8c7c'}}>R$ {saldo}</CardTitle>
								<CardText style={{fontSize: 12}}>Saldo</CardText>
							</Card> 
						</Col>
						<Col>
							<Card className="card-saldo">
								<CardTitle style={{color: 'brown'}}>R$ {naoRecebido}</CardTitle>
								<CardText style={{fontSize: 12}}>Não Recebido</CardText>
							</Card>
						</Col>
					</Row>
				</div>	

				<div className="container-menu-empresa">
					<div style={{borderTop: '1px solid #2f8c7c', paddingTop: 5, paddingBottom: 5}}>
						<p style={{paddingTop: 18, fontSize: 12, marginBottom: 0, color: '#b1b1b1'}}><u>ACESSO RÁPIDO</u></p>
					</div>
					<div>
						<Row>
							<Col xs="6" sm="4" style={{paddingTop: 10}}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="user" size="lg" />
									<h6>Usuário</h6>
								</Card>
							</Col>
							<Col xs="6" sm="4" style={{paddingTop: 10}}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="file-invoice-dollar" size="lg" />
									<h6>Lançar Relatório</h6>
								</Card>
							</Col>
							<Col sm="4" style={{paddingTop: 10}}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="file-alt" size="lg" />
									<h6>Saldo e Extratos</h6>
								</Card>
							</Col>
						</Row>

						<Row style={{justifyContent: 'center'}}>
						<Col style={{paddingTop: 10 }}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="power-off" size="lg" />
									<h6>Sair</h6>
								</Card>
							</Col>
							<Col style={{paddingTop: 10 }}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="question-circle" size="lg" />
									<h6>Suporte</h6>
								</Card>
							</Col>
						</Row>
					</div>
				</div>
				{/* <div style={{backgroundColor: 'lightcyan', padding: 20}}>
					<Row>
						<Col style={{textAlign: 'center', backgroundColor: '#AAA'}}>
							Lancamentos
						</Col>
					</Row>
					<Lancamentos />
				</div>	 */}
			</div>
		)
	}
}

const mapStateToProps = state => {
	let saldo = 0
	let naoRecebido = 0
	const empresa_id = state.usuarioLogado.empresa_id
	if(
		state.categorias 
		&& state.lancamentoSituacao
		&& state.lancamentos
		&& state.situacoes
	){
		const lancamentosFiltrados = state.lancamentos.filter(lancamento => lancamento.empresa_id === empresa_id)
		lancamentosFiltrados.forEach(lancamento => {
			const lancamentoSituacaoAtiva = state.lancamentoSituacao
				.find(lancamentoSituacao => 
					lancamento._id === lancamentoSituacao.lancamento_id 
					&& lancamentoSituacao.data_inativacao === 'null')
			if(lancamentoSituacaoAtiva){
				const situacaoAtiva = state.situacoes
					.find(situacao => lancamentoSituacaoAtiva.situacao_id === situacao._id)

				const categoriaAtiva = state.categorias
					.find(categoria => lancamento.categoria_id === categoria._id)

				const valorFormatado = parseFloat(lancamento.valor)
				if(situacaoAtiva._id === SITUACAO_RECEBIDO){
					if(categoriaAtiva.credito_debito === 'C'){
						saldo += valorFormatado
					}else{
						saldo -= valorFormatado
					}
				}
				if(situacaoAtiva._id === SITUACAO_NAO_RECEBIDO){
					naoRecebido += valorFormatado
				}
			}
		})
	}
	let token = null
	let puxeiUmaVez = null
	if(state.usuarioLogado){
		token = state.usuarioLogado.token
		puxeiUmaVez = state.usuarioLogado.puxeiUmaVez
	}

	return {
		saldo,
		naoRecebido,
		token,
		puxeiUmaVez,
	}
}

function mapDispatchToProps(dispatch){
	return {
		pegarUsuarioDaApi: (elemento) => dispatch(pegarUsuarioDaApi(elemento)),
		pegarUsuarioSituacaoDaApi: (elemento) => dispatch(pegarUsuarioSituacaoDaApi(elemento)),
		pegarUsuarioTipoDaApi: (elemento) => dispatch(pegarUsuarioTipoDaApi(elemento)),
		pegarSituacaoDaApi: (elemento) => dispatch(pegarSituacaoDaApi(elemento)),
		pegarCategoriaDaApi: (elemento) => dispatch(pegarCategoriaDaApi(elemento)),
		pegarEmpresaDaApi: (elemento) => dispatch(pegarEmpresaDaApi(elemento)),
		pegarEmpresaTipoDaApi: (elemento) => dispatch(pegarEmpresaTipoDaApi(elemento)),
		pegarContaFixaDaApi: (elemento) => dispatch(pegarContaFixaDaApi(elemento)),
		pegarLancamentoDaApi: (elemento) => dispatch(pegarLancamentoDaApi(elemento)),
		pegarLancamentoSituacaoDaApi: (elemento) => dispatch(pegarLancamentoSituacaoDaApi(elemento)),
		salvarUsuarioLogado: (elemento) => dispatch(salvarUsuarioLogado(elemento)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtratoEmpresa)
