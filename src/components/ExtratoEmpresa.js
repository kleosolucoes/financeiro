import React from 'react'
import {
	Row,
	Col,
	Card,
	CardTitle,
	CardText,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { SITUACAO_RECEBIDO, SITUACAO_NAO_RECEBIDO } from '../helpers/constantes'
import './aux.css';

// ICONS
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faFileInvoiceDollar, faFileAlt, faPowerOff, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { CabecalhoExtrato } from './Cabecalho';
library.add(faUser)
library.add(faFileInvoiceDollar)
library.add(faFileAlt)
library.add(faPowerOff)
library.add(faQuestionCircle)

class ExtratoEmpresa extends React.Component {

	componentDidMount(){
		this.props.puxarTodosDados()
	}

	render() {
		const { 
			saldo,
			naoRecebidoCredito,
			naoRecebidoDebito,
		} = this.props
		return (
			<div style={{marginTop: 80}}>
				<CabecalhoExtrato 
					nomeUsuario="Diego Kort"
					onClick={() => this.props.puxarTodosDados()}
					saldo= {saldo}
					naoRecebidoCredito={naoRecebidoCredito}
					naoRecebidoDebito={naoRecebidoDebito}
				/>

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
			</div>
		)
	}
}

const mapStateToProps = ({situacoes, usuarioLogado, lancamentos, lancamentoSituacao, categorias}) => {
	let saldo = 0.00
	let naoRecebidoCredito = 0.00
	let naoRecebidoDebito = 0.00
	
	const lancamentosFiltrados = lancamentos && usuarioLogado && 
		lancamentos.filter(lancamento => lancamento.empresa_id === usuarioLogado.empresa_id)

	lancamentosFiltrados
		.filter(lancamento => lancamento.data_inativacao === null)
		.forEach(lancamento => {
			const lancamentoSituacaoAtiva = lancamentoSituacao && 
				lancamentoSituacao.find(lancamentoSituacao => lancamento._id === lancamentoSituacao.lancamento_id && lancamentoSituacao.data_inativacao === null)

			if(lancamentoSituacaoAtiva){	
				const situacaoAtiva = situacoes && 
					situacoes.find(situacao => lancamentoSituacaoAtiva.situacao_id === situacao._id)
				const categoriaAtiva = categorias && categorias.find(categoria => lancamento.categoria_id === categoria._id)


				const valorFormatado = parseFloat(lancamento.valor.toFixed(2))
				if(situacaoAtiva._id === SITUACAO_RECEBIDO){
					if(categoriaAtiva.credito_debito === 'C'){
						saldo += valorFormatado
					}else{
						saldo -= valorFormatado
					}
				}
				saldo = parseFloat(saldo.toFixed(2))
				if(situacaoAtiva._id === SITUACAO_NAO_RECEBIDO){
					if(categoriaAtiva.credito_debito === 'C'){
						naoRecebidoCredito += valorFormatado
					}else{
						naoRecebidoDebito += valorFormatado
					}
					naoRecebidoCredito = parseFloat(naoRecebidoCredito.toFixed(2))
					naoRecebidoDebito = parseFloat(naoRecebidoDebito.toFixed(2))
				}
			}
		})

	return {
		saldo,
		naoRecebidoCredito,
		naoRecebidoDebito,
		usuarioLogado,
	}
}

export default connect(mapStateToProps, null)(ExtratoEmpresa)
