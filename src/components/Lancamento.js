import React from 'react'
import {
	Row,
	Col,
	Input,
	Alert,
	Label,
	FormGroup,
} from 'reactstrap'
import { connect } from 'react-redux'
import { formatReal, getMoney, } from '../helpers/funcoes'
import { 
	alterarLancamentoNaApi, 
} from '../actions'
import { 
	EMPRESA_ADMINISTRACAO_ID,
	STRING_DEBITO,
	STRING_CREDITO,
	SITUACAO_RECEBIDO,
	SITUACAO_NAO_RECEBIDO,
	SITUACAO_RECUSADO,
} from '../helpers/constantes'
import LancamentoSituacao from './LancamentoSituacao'

class Lancamento extends React.Component {
	state = {
		valor: '',
		taxa: '',
		situacao_id: 0,
		mostrarMensagemDeErro: false,
		camposComErro: [],
		mostrarTodosLancamentoSituacao: false,
		lancamento_situacao_atual_id: null,
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
			lancamento_situacao_atual_id: lancamentoSituacaoAtual._id,
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
			lancamento_situacao_atual_id,
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
				lancamento_situacao_id: lancamento_situacao_atual_id,
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
		const { 
			lancamento, 
			lancamentoSituacao,
			categoria,
			usuario,
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
			lancamento_situacao_atual_id,
		} = this.state

		return (
			<div style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
				<Row>
					<Col>
						Id
					</Col>
					<Col>
						{lancamento._id.toString().padStart(8,0)}
					</Col>
				</Row>
				<Row>
					<Col>
						Data
					</Col>
					<Col>
						{lancamento.data}
					</Col>
				</Row>
				{
					usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID && 
					<div>
						<Row>
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
						</Row>
						<Row>
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
						</Row>
						<Row>
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
								<button 
									type='button' 
									style={{width: '100%'}}
									onClick={this.ajudadorDeSubmissao}
								>Alterar</button> 
							</Col>
						</Row>
					</div>
				}
				{
					usuarioLogado.empresa_id !== EMPRESA_ADMINISTRACAO_ID &&
						<div>
							<Row>
								<Col>
									Valor
								</Col>
								<Col>
									{lancamento.valor}
								</Col>
							</Row>
							<Row>
								<Col>
									Taxa
								</Col>
								<Col>
									{lancamento.taxa}
								</Col>
							</Row>
						</div>
				}
				<Row>
					<Col>
						Categoria
					</Col>
					<Col>
						{categoria && categoria.nome}
					</Col>
				</Row>
				<Row>
					<Col>
						Tipo	
					</Col>
					<Col>
						{categoria && categoria.credito_debito === 'C' ? STRING_CREDITO : STRING_DEBITO}
					</Col>
				</Row>

				<Row>
					<Col>
						Quem Lançou
					</Col>
					<Col>
						{usuario && usuario.nome.split(' ')[0]}
					</Col>
				</Row>
				<Row>
					<Col>
						Empresa
					</Col>
					<Col>
						{empresa && empresa.nome}
					</Col>
				</Row>
				<Row>
					<Col>
						Descrição
					</Col>
					<Col>
						{lancamento.descricao}
					</Col>
				</Row>
				{
					lancamento_situacao_atual_id &&
						<div>
							<div style={{padding: 5, backgroundColor: 'lightblue'}}>
								<p>Situação Atual</p>
								<LancamentoSituacao 
									lancamento_situacao_id={lancamento_situacao_atual_id} />

								<div style={{padding: 5, marginTop: 5, backgroundColor: 'lightgreen'}}>
									<Row style={{padding: 5}}>
										<Col>
											<button 
												type='button' 
												style={{width: '100%'}}
												onClick={this.alterarMostrarTodosLancamentoSituacao}
											>
												Mostrar Todas situacoes
											</button> 
										</Col>
									</Row>
								</div>
							</div>
							{
								lancamentoSituacao && 
									mostrarTodosLancamentoSituacao && 
										<div style={{padding: 5, backgroundColor: 'lightblue'}}>
											{
												lancamentoSituacao.map(lancamentoSituacao => (
													<LancamentoSituacao 
														key={lancamentoSituacao._id}
														lancamento_situacao_id={lancamentoSituacao._id} />
												))
											}
										</div>
							}
						</div>
				}
			</div>
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
