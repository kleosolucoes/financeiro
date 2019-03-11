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
import { faUser, faFileAlt, faPowerOff, faQuestionCircle, faBriefcase, faList, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
library.add(faUser)
library.add(faBriefcase)
library.add(faFileInvoiceDollar)
library.add(faFileAlt)
library.add(faPowerOff)
library.add(faQuestionCircle)
library.add(faList)

class ExtratoAdministracao extends React.Component {

	state = {
		api: null,
		lancamentos: null,
		categorias: null,
	}

	render() {
		const { 
			saldo,
			naoRecebido,
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
								<CardTitle style={{color: 'brown'}}>R$ {naoRecebido}</CardTitle>
								<CardText style={{fontSize: 12}}>Não Recebido</CardText>
							</Card>
						</Col>
					</Row>
				</div>	

				<div className="container-menu-administracao">
					<div style={{borderTop: '1px solid #2f8c7c', paddingTop: 5, paddingBottom: 5}}>
						<p style={{paddingTop: 18, fontSize: 12, marginBottom: 0, color: '#b1b1b1'}}><u>ACESSO RÁPIDO</u></p>
					</div>
					<div>
						<Row>
							<Col xs="6" style={{paddingTop: 10}}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="briefcase" size="lg" />
									<h6>Empresas</h6>
								</Card>
							</Col>
							<Col xs="6" style={{paddingTop: 10}}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="user" size="lg" />
									<h6>Usuário</h6>
								</Card>
							</Col>
						</Row>

						<Row>

							<Col xs="6" style={{paddingTop: 10}}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="file-alt" size="lg" />
									<h6>Saldo e Extratos</h6>
								</Card>
							</Col>

							<Col xs="6" style={{paddingTop: 10 }}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="list" size="lg" />
									<h6>Categorias</h6>
								</Card>
							</Col>
						</Row>
						<Row>
							<Col xs="6" sm="4" style={{paddingTop: 10 }}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="file-invoice-dollar" size="lg" />
									<h6>Lançar</h6>
								</Card>
							</Col>
							<Col xs="6" sm="4" style={{paddingTop: 10 }}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="power-off" size="lg" />
									<h6>Sair</h6>
								</Card>
							</Col>
							<Col sm="4" style={{ paddingTop: 10 }}>
								<Card className="card-menu">
								<FontAwesomeIcon icon="question-circle" size="lg" />
									<h6>Suporte</h6>
								</Card>
							</Col>
						</Row>
					</div>
				</div>
				{/* <div style={{backgroundColor: 'red', padding: 10}}>
					<Row>
						<Col> Api </Col>
						<Col>
							{
								this.state.api &&
									<p>{this.state.api.data}</p>
							}
							{
								!this.state.api &&
									'carregando api'
							}
						</Col>
					</Row>
				</div>	
				<div style={{backgroundColor: 'lightblue', padding: 10}}>
					<Row> 
						<Col> Saldo </Col>
						<Col> {saldo} </Col>
					</Row>
				</div>	
				<div style={{backgroundColor: 'lightgreen', padding: 10}}>
					<Row>
						<Col> Nao Recebido </Col>
						<Col> {naoRecebido} </Col>
					</Row>
				</div>	
				<div style={{backgroundColor: 'lightcyan', padding: 20}}>
					<Row>
						<Col style={{textAlign: 'center', backgroundColor: '#AAA'}}>
							Nao Recebidos
						</Col>
					</Row>
					{
						categorias &&
							categorias.map(categoria => {
								return (
									<Row key={categoria.id}>
										<Col> {categoria.nome} </Col>
										<Col> {listaDeNaoRecebidoPorCategorias[categoria.id]} </Col>
									</Row>
								)
							})
					}
				</div>	 */}
			</div>
		)
	}
}

const mapStateToProps = state => {
	let saldo = 0
	let naoRecebido = 0
	let listaDeNaoRecebidoPorCategorias = []
	state.categorias.map(categoria => listaDeNaoRecebidoPorCategorias[categoria.id] = 0)
	state.lancamentos.forEach(lancamento => {
		const lancamentoSituacaoAtiva = state.lancamentoSituacao
			.find(lancamentoSituacao => 
				lancamento.id === lancamentoSituacao.lancamento_id 
				&& lancamentoSituacao.data_inativacao === null)
		const situacaoAtiva = state.situacoes
			.find(situacao => lancamentoSituacaoAtiva.situacao_id === situacao.id)

		const categoriaAtiva = state.categorias
			.find(categoria => lancamento.categoria_id === categoria.id)

		const valorFormatado = parseFloat(lancamento.valor)
		if(situacaoAtiva.id === SITUACAO_RECEBIDO){
			if(categoriaAtiva.credito_debito === 'C'){
				saldo += valorFormatado
			}else{
				saldo -= valorFormatado
			}
		}
		if(situacaoAtiva.id === SITUACAO_NAO_RECEBIDO){
			naoRecebido += valorFormatado
			listaDeNaoRecebidoPorCategorias[categoriaAtiva.id] += valorFormatado
		}
	})

	return {
		saldo,
		naoRecebido,
		listaDeNaoRecebidoPorCategorias,
		categorias: state.categorias,
		lancamentos: state.lancamentos,
	}
}

function mapDispatchToProps(dispatch){
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtratoAdministracao)
