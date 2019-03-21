import React from 'react'
import {
	Row,
	Col,
	Button,
	Table,
	Alert,
} from 'reactstrap'
import { connect } from 'react-redux'
import { SITUACAO_RECEBIDO, SITUACAO_NAO_RECEBIDO } from '../helpers/constantes'
import { STRING_DEBITO, STRING_CREDITO, } from '../helpers/constantes'
import './aux.css';

// ICONS
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faFileAlt, faPowerOff, faQuestionCircle, faBriefcase, faList, faFileInvoiceDollar, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import CabecalhoExtrato from './Cabecalho'
library.add(faUser)
library.add(faBriefcase)
library.add(faFileInvoiceDollar)
library.add(faFileAlt)
library.add(faPowerOff)
library.add(faQuestionCircle)
library.add(faList)
library.add(faSyncAlt)

class ExtratoAdministracao extends React.Component {

	state = {
		carregando: false,
	}

	componentDidMount(){
		this.atualizar()
	}

	atualizar = () => {
		this.setState({
			carregando: true,
		})
		this.props.puxarTodosDados()
			.then(() => {
				this.setState({
					carregando: false,
				})
			})

	}

	render() {
		const { 
			saldo,
			naoRecebidoCredito,
			naoRecebidoDebito,
			listaDeNaoRecebidoPorCategorias,
			categorias,
		} = this.props
		const {
			carregando,
		} = this.state
		return (
			<div style={{marginTop: 80}}>
				<div style={{background: '#f9f7f7'}}>
					{
						carregando &&
						<Alert color='info' className='text-center'>
							Carregando ...
						</Alert>
					}
					{
						!carregando && 
						<CabecalhoExtrato 
							onClick={() => this.atualizar()}
							saldo= {saldo}
							naoRecebidoCredito={naoRecebidoCredito}
							naoRecebidoDebito={naoRecebidoDebito}
						/>
					}
				</div>	
				<div style={{marginTop: 15, backgroundColor: '#f9f7f7'}}>
					<Row style={{margin: 0}}>
						<Col style={{textAlign: 'center', backgroundColor: '#2f8c7c', padding: 5, color: '#fff'}}>
							Não Aceitos
						</Col>
					</Row>
					{
						carregando &&
							<Alert color='info' className='text-center'>
								Carregando ...
							</Alert>
					}

					<Table>
						<thead style={{background: '#7CC9BC', color: '#fff'}}>
							<tr>
								<th>Categoria</th>
								<th style={{paddingRight: 30, paddingLeft: 30, verticalAlign: 'middle'}}>Valor</th>
							</tr>
						</thead>
						{
							!carregando && 
							categorias &&
								categorias.map(categoria => {
									return (
										<tbody key={categoria._id}>
											<tr>
												<td>
													<Button className="botaoTipoCategoria"
														onClick={() => this.props.alterarTela('lancamentos', categoria._id)}
														style={{textAlign: 'left'}}
													>
														{categoria.credito_debito === 'C' ? STRING_CREDITO : STRING_DEBITO } - {categoria.nome}
													</Button>
												</td>
												<td>R$ {listaDeNaoRecebidoPorCategorias[categoria._id].toFixed(2).replace(".",",")}</td>
											</tr>
										</tbody>
									)
								})
						}
					</Table>
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
	let saldo = 0.00
	let naoRecebidoCredito = 0.00
	let naoRecebidoDebito = 0.00
	let listaDeNaoRecebidoPorCategorias = []
	if(
		state.categorias 
		&& state.lancamentoSituacao
		&& state.lancamentos
		&& state.situacoes
	){
		state.categorias.forEach(categoria => listaDeNaoRecebidoPorCategorias[categoria._id.toString()] = 0)
		state.lancamentos
			.filter(lancamento => lancamento.data_inativacao === null)
			.forEach(lancamento => {
				const lancamentoSituacaoAtiva = state.lancamentoSituacao
					.find(lancamentoSituacao => lancamento._id.toString() === lancamentoSituacao.lancamento_id 
						&& lancamentoSituacao.data_inativacao === null)

				if(lancamentoSituacaoAtiva){
					const situacaoAtiva = state.situacoes
						.find(situacao => lancamentoSituacaoAtiva.situacao_id === situacao._id.toString())

					const categoriaAtiva = state.categorias
						.find(categoria => lancamento.categoria_id === categoria._id.toString())

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
						listaDeNaoRecebidoPorCategorias[categoriaAtiva._id] += valorFormatado
						naoRecebidoCredito = parseFloat(naoRecebidoCredito.toFixed(2))
						naoRecebidoDebito = parseFloat(naoRecebidoDebito.toFixed(2))
						listaDeNaoRecebidoPorCategorias[categoriaAtiva._id] = parseFloat(listaDeNaoRecebidoPorCategorias[categoriaAtiva._id].toFixed(2))
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
