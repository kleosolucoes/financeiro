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

const mapStateToProps = ({situacoes, usuarioLogado, lancamentos, lancamentoSituacao, categorias}) => {
	let saldo = 0
	let naoRecebido = 0
	const lancamentosFiltrados = lancamentos && usuarioLogado && 
		lancamentos.filter(lancamento => lancamento.empresa_id === usuarioLogado.empresa_id)

	lancamentosFiltrados.forEach(lancamento => {
		const lancamentoSituacaoAtiva = lancamentoSituacao && 
			lancamentoSituacao.find(lancamentoSituacao => lancamento._id === lancamentoSituacao.lancamento_id && lancamentoSituacao.data_inativacao === null)

		if(lancamentoSituacaoAtiva){	
			const situacaoAtiva = situacoes && 
				situacoes.find(situacao => lancamentoSituacaoAtiva.situacao_id === situacao._id)
			const categoriaAtiva = categorias && categorias.find(categoria => lancamento.categoria_id === categoria._id)
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

	return {
		saldo,
		naoRecebido,
		usuarioLogado,
	}
}

export default connect(mapStateToProps, null)(ExtratoEmpresa)
