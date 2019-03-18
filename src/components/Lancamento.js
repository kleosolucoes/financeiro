import React from 'react'
import {
	Row,
	Col,
	Input,
	Alert,
	Label,
	FormGroup,
	Table,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import Responsive from 'react-responsive';
import { formatReal, getMoney, } from '../helpers/funcoes'
import { 
	alterarLancamentoNaApi, 
} from '../actions'
import { 
	EMPRESA_ADMINISTRACAO_ID,
	STRING_DEBITO,
	STRING_CREDITO
} from '../helpers/constantes'
import LancamentoSituacao from './LancamentoSituacao'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
library.add(faExpandArrowsAlt)
library.add(faEdit)

class Lancamento extends React.Component {
	state = {
		valor: '',
		taxa: '',
		situacao_id: 0,
		mostrarMensagemDeErro: false,
		camposComErro: [],
		mostrarTodosLancamentoSituacao: false,
		lancamentoSituacaoAtual: null,
	}

	alterarMostrarTodosLancamentoSituacao = () => this.setState({mostrarTodosLancamentoSituacao: !this.state.mostrarTodosLancamentoSituacao})

	componentDidMount(){
		const {
			lancamentoSituacao,
		} = this.props
		const lancamentoSituacaoAtual = lancamentoSituacao.find(lancamentoSituacao => lancamentoSituacao.data_inativacao === null)
		this.setState({
			valor: this.props.lancamento.valor,
			taxa: this.props.lancamento.taxa,
			lancamentoSituacaoAtual: lancamentoSituacaoAtual,
		})
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		if(name === 'valor' || name === 'taxa')
			valor = formatReal(getMoney(valor).toString().padStart(3, '0'))
		this.setState({[name]: valor})
	}

	ajudadorDeSubmissao = () => {
		const {
			valor,
			taxa,
			situacao_id,
			lancamentoSituacaoAtual,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		let {
			lancamento,
			usuarioLogado,
		} = this.props
		camposComErro = []

		mostrarMensagemDeErro = false
		if(valor === '0.00'){
			mostrarMensagemDeErro = true
			camposComErro.push('valor')
		}
		if(parseInt(situacao_id) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('situacao_id')
		}

		if(mostrarMensagemDeErro){
			this.setState({
				mostrarMensagemDeErro,
				camposComErro,
			})
		}else{
			this.setState({
				mostrarMensagemDeErro: false,
				camposComErro: [],
			})

			const dados = {
				lancamento_id: lancamento._id,
				valor,
				taxa,
				situacao_id,
				lancamento_situacao_id: lancamentoSituacaoAtual._id,
				usuario_id: usuarioLogado.usuario_id,
			}

			this.props.alterarLancamentoNaApi(dados, this.props.usuarioLogado.token)
				.then((lancamento_situacao_atual_id) => {
					this.setState({
						situacao_id: 0,
						lancamento_situacao_atual_id,
					})
					alert('Lançamento Salvo com sucesso!')
				})
		}
	}

	render() {
		const Desktop = props => <Responsive {...props} minWidth={992} />;
		const { 
			lancamento, 
			lancamentoSituacao,
			categoria,
			empresa,
			situacoes,
			usuarioLogado,
		} = this.props
		const {
			valor,
			taxa,
			mostrarMensagemDeErro,
			camposComErro,
			situacao_id,
			mostrarTodosLancamentoSituacao,
			lancamentoSituacaoAtual,
		} = this.state
		let situacao = null
		if(lancamentoSituacaoAtual){
			situacao = situacoes.find((situacao) => (
				situacao._id === lancamentoSituacaoAtual.situacao_id
			)) 
		}
		return (
			<tbody style={{ backgroundColor: 'lightCyan', marginTop: 10}}>
				{/* <Row>
					<Col> Id </Col>
					<Col> {lancamento.id.toString().padStart(8,0)} </Col>
				</Row> */}
				
				{/* {
					usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID && 
					<div>
						<Row>
							<Col>
							<FormGroup>
								<Label for="valor">Valor</Label>
								<Input 
									type="number" 
									name="valor" 
									id="valor" 
									value={valor} 
									onChange={this.ajudadorDeCampo}
									invalid={camposComErro.includes('valor') ? true : null}
								>
								</Input>
								{camposComErro.includes('valor') && <Alert color='danger'>Preencha o Valor</Alert>}
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="taxa">Taxa</Label>
								<Input 
									type="number" 
									name="taxa" 
									id="taxa" 
									value={taxa} 
									onChange={this.ajudadorDeCampo}
								>
								</Input>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="situacao_id">Situação</Label>
								<Input 
									type="select" 
									name="situacao_id" 
									id="situacao_id" 
									value={situacao_id} 
									onChange={this.ajudadorDeCampo}
									invalid={camposComErro.includes('situacao_id') ? true : null}
								>
									<option value='0'>Selecione</option>
									{
										situacoes &&
											situacoes
											.filter(situacao => 
												situacao._id === SITUACAO_RECEBIDO
												|| situacao._id === SITUACAO_NAO_RECEBIDO
												|| situacao._id === SITUACAO_RECUSADO)
												.map(situacao => {
													return (
														<option 
															key={situacao._id}
															value={situacao._id}
														>
															{situacao.nome}
														</option>
													)
												})
									}
								</Input>
								{camposComErro.includes('situacao_id') && <Alert color='danger'>Selecione a Situação</Alert>}
							</FormGroup>
						</Col>
						</Row>
						{
							mostrarMensagemDeErro &&
								<div style={{padding: 10}}>
									<Alert color='warning'>
										Campos inválidos
									</Alert>
								</div>
						}
						<Row style={{padding: 5}}>
							<Col>
								<Button 
									type='button' 
									style={{width: '100%'}}
									onClick={this.ajudadorDeSubmissao}
								>
								Alterar
								</Button> 
							</Col>
						</Row>
					</div>
				} */}
				
						{/* <tr> */}
							<Desktop><td> {lancamento.data} </td></Desktop>
							<td>{lancamento.valor}</td>
							<Desktop><td>{lancamento.taxa}</td></Desktop>
							<td>{categoria.nome}</td>
							<td>{categoria.credito_debito === 'C' ? STRING_CREDITO : STRING_DEBITO}</td>
							<td>{situacao && situacao.nome}</td>
							<Desktop><td>{empresa.nome}</td></Desktop>
							{/* <Desktop><td>{lancamento.descricao}</td></Desktop> */}
							<Row style={{justifyContent: 'center', marginTop: 8, flexDirection: 'column'}}>
								<Col style={{paddingLeft: 0, paddingRight: 0, flexGrow: 0}}>
									<Button 
										type='button' 
										className="botao-acao"
										onClick={this.alterarMostrarTodosLancamentoSituacao}
									>
										<FontAwesomeIcon icon="expand-arrows-alt" size="sm"  />
									</Button>
								</Col>
								{ usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID && 
									<Col style={{paddingLeft: 0, paddingRight: 0, flexGrow: 0}}>
										<Button 
											type='button' 
											className="botao-acao"
											// onClick={}
										>
											<FontAwesomeIcon icon="edit" size="sm"  />
										</Button>
									</Col>
								}
							</Row>

					{ lancamentoSituacao && 
						mostrarTodosLancamentoSituacao && 
						<tr> 
							<td>
							<Table> 
								<thead>

								<tr> 
									<td>Data</td>
									<td>Nome</td>
									<td>Usuario</td>
								</tr>
								</thead> 
								<tbody>
								{
									lancamentoSituacao.map(lancamentoSituacao => (
										<LancamentoSituacao 
											key={lancamentoSituacao._id}
											lancamento_situacao_id={lancamentoSituacao._id} />
									))
								}
								</tbody>
							</Table>
							</td> 
						</tr>
					}

				
			</tbody>

		)
	}
}

const mapStateToProps = ({lancamentos, lancamentoSituacao, empresas, categorias, situacoes, usuarioLogado, usuarios}, {lancamento_id}) => {
	const lancamentoSelecionado = lancamentos && lancamentos.find(lancamento => lancamento._id === lancamento_id)
	const todosLancamentoSituacao =  lancamentoSituacao && lancamentoSituacao.filter(lancamentoSituacao => lancamentoSituacao.lancamento_id)
	const empresa = empresas && empresas.find(empresa => empresa._id === lancamentoSelecionado.empresa_id)
	const categoria = categorias && categorias.find(categoria => categoria._id === lancamentoSelecionado.categoria_id)
	const usuario = usuarios && usuarios.find(usuario => usuario._id === lancamentoSelecionado.usuario_id)

	return {
		lancamento: lancamentoSelecionado,
		lancamentoSituacao: todosLancamentoSituacao,
		categoria,
		empresa,
		usuarioLogado,
		usuario,
		situacoes,
	}
}

function mapDispatchToProps(dispatch){
	return {
		alterarLancamentoNaApi: (elemento, novo) => dispatch(alterarLancamentoNaApi(elemento, novo)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Lancamento)
