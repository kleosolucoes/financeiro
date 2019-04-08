import React from 'react'
import {
	Row,
	Col,
	Button,
	Table,
	Alert,
} from 'reactstrap'
import { connect } from 'react-redux'
import { 
	SITUACAO_RECEBIDO, 
	SITUACAO_NAO_RECEBIDO,
	CATEGORIA_DIZIMO_DEBITO,
	CATEGORIA_DIZIMO_CREDITO,
	CATEGORIA_OFERTA_DEBITO,
	CATEGORIA_OFERTA_CREDITO,
	CATEGORIA_OFERTA_ESPECIAL_DEBITO,
	CATEGORIA_OFERTA_ESPECIAL_CREDITO,
	CATEGORIA_OFERTA_DEBITO_INSTITUTO_DE_VENCEDORES,
	CATEGORIA_OFERTA_CREDITO_INSTITUTO_DE_VENCEDORES,
	CATEGORIA_CARTAO,
	STRING_DEBITO,
	STRING_CREDITO,
} from '../helpers/constantes'
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
		console.log(this.props)
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
							listaDeNaoRecebidoPorCategorias &&
								listaDeNaoRecebidoPorCategorias.map(item => {
									const categoria = categorias.find(categoria => categoria._id === item._id)
									return (
										<tbody key={`categoriaNaoRecebido${item._id}`}>
											<tr>
												<td>
													<Button className="botaoTipoCategoria"
														onClick={() => this.props.alterarTela('lancamentos', item._id)}
														style={{textAlign: 'left'}}
													>
														{categoria.credito_debito === 'C' ? STRING_CREDITO : STRING_DEBITO } - {categoria.nome}
													</Button>
												</td>
												<td>
													R$ {item.valor}
												</td>
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
	let somaCartao = 0
	if(
		state.categorias 
		&& state.lancamentoSituacao
		&& state.lancamentos
		&& state.situacoes
	){
		state.categorias
			.forEach(categoria => {
				if(
					categoria._id !== CATEGORIA_DIZIMO_DEBITO &&
					categoria._id !== CATEGORIA_DIZIMO_CREDITO &&
					categoria._id !== CATEGORIA_OFERTA_DEBITO &&
					categoria._id !== CATEGORIA_OFERTA_CREDITO &&
					categoria._id !== CATEGORIA_OFERTA_ESPECIAL_DEBITO &&
					categoria._id !== CATEGORIA_OFERTA_ESPECIAL_CREDITO &&
					categoria._id !== CATEGORIA_OFERTA_DEBITO_INSTITUTO_DE_VENCEDORES &&
					categoria._id !== CATEGORIA_OFERTA_CREDITO_INSTITUTO_DE_VENCEDORES
				){
					const item = {}
					item._id = categoria._id
					item.valor = '0.00'
					listaDeNaoRecebidoPorCategorias.push(item)
				}
			})
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

					let valorFormatado = parseFloat(lancamento.valor.toFixed(2))
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
						let item = null
						if(
							categoriaAtiva._id === CATEGORIA_DIZIMO_DEBITO ||
							categoriaAtiva._id === CATEGORIA_DIZIMO_CREDITO ||
							categoriaAtiva._id === CATEGORIA_OFERTA_DEBITO ||
							categoriaAtiva._id === CATEGORIA_OFERTA_CREDITO ||
							categoriaAtiva._id === CATEGORIA_OFERTA_ESPECIAL_DEBITO ||
							categoriaAtiva._id === CATEGORIA_OFERTA_ESPECIAL_CREDITO ||
							categoriaAtiva._id === CATEGORIA_OFERTA_DEBITO_INSTITUTO_DE_VENCEDORES ||
							categoriaAtiva._id === CATEGORIA_OFERTA_CREDITO_INSTITUTO_DE_VENCEDORES
						){
							somaCartao += valorFormatado
							valorFormatado = somaCartao
							item = listaDeNaoRecebidoPorCategorias
								.find(item => item._id === CATEGORIA_CARTAO)
						}else{
							item = listaDeNaoRecebidoPorCategorias
								.find(item => item._id === categoriaAtiva._id)
						}
						item.valor = valorFormatado.toFixed(2)
						listaDeNaoRecebidoPorCategorias = listaDeNaoRecebidoPorCategorias
							.map(itemNaLista => {
								if(itemNaLista._id === item._id){
									return item
								}else{
									return itemNaLista
								}
							})
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
