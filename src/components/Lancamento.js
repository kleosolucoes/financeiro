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
import { formatReal, getMoney, pegarDataEHoraAtual } from '../helpers/funcoes'
import { salvarLancamento, salvarLancamentoSituacao } from '../actions'

class Lancamento extends React.Component {
	state = {
		valor: '',
		taxa: '',
		situacao_id: 0,
		mostrarMensagemDeErro: false,
		camposComErro: [],
	}

	componentDidMount(){
		this.setState({
			valor: this.props.lancamento.valor,
			taxa: this.props.lancamento.taxa,
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
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		let {
			lancamento,
			lancamentoSituacao,
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

			lancamento.valor = valor
			lancamento.taxa = taxa
			this.props.salvarLancamento(lancamento)

			lancamentoSituacao.data_inativacao = pegarDataEHoraAtual()[0]
			lancamentoSituacao.hora_inativacao = pegarDataEHoraAtual()[1]
			this.props.salvarLancamentoSituacao(lancamentoSituacao)

			const novoRegistro = true
			const elementoAssociativo = {
				id: Date.now(),
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				data_inativacao: null,
				hora_inativacao: null,
				situacao_id: parseInt(situacao_id),
				lancamento_id: lancamento.id,
				usuario_id: this.props.usuario_id,
			}

			this.props.salvarLancamentoSituacao(elementoAssociativo, novoRegistro)
		}
	}

	render() {
		const { 
			lancamento, 
			lancamentoSituacao,
			usuarioSituacao,
			situacao, 
			categoria,
			usuario,
			empresa,
			situacoes,
		} = this.props
		const {
			valor,
			taxa,
			mostrarMensagemDeErro,
			camposComErro,
			situacao_id,
		} = this.state
		return (
			<div style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
				<Row>
					<Col>
						Id
					</Col>
					<Col>
						{lancamento.id.toString().padStart(8,0)}
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
										situacao.id === 1 
										|| situacao.id === 2
										|| situacao.id === 3)
										.map(situacao => {
											return (
												<option 
													key={situacao.id}
													value={situacao.id}
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
				<Row>
					<Col>
						Categoria
					</Col>
					<Col>
						{categoria.nome}
					</Col>
				</Row>
				<Row>
					<Col>
						Tipo	
					</Col>
					<Col>
						{categoria.credito_debito === 'C' ? 'Credito' : 'Debito'}
					</Col>
				</Row>

				<Row>
					<Col>
						Quem
					</Col>
					<Col>
						{usuario.nome.split(' ')[0]}
					</Col>
				</Row>
				<Row>
					<Col>
						Empresa
					</Col>
					<Col>
						{empresa.nome}
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
	
				<div style={{padding: 5, backgroundColor: 'lightblue'}}>
					<p>Situação Atual</p>
					<div key={lancamentoSituacao.id} style={{padding: 5, marginTop: 5, backgroundColor: 'lightgreen'}}>
						<Row>
							<Col>
								Data
							</Col>
							<Col>
								{lancamentoSituacao.data_criacao}
							</Col>
						</Row>
						<Row>
							<Col>
								Situação
							</Col>
							<Col>
								{situacao.nome}
							</Col>
						</Row>
						<Row>
							<Col>
								Quem
							</Col>
							<Col>
								{usuarioSituacao.nome.split(' ')[0]}
							</Col>
						</Row>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, {lancamento_id}) => {
	const lancamento = state.lancamentos
		.find(lancamento => lancamento.id === lancamento_id)
	const lancamentoSituacao = state.lancamentoSituacao
		.find(lancamentoSituacao => lancamentoSituacao.lancamento_id === lancamento.id && lancamentoSituacao.data_inativacao === null)
	const usuarioSituacao = state.usuarios
		.find(usuario => usuario.id === lancamentoSituacao.usuario_id)
	const situacao = state.situacoes
		.find(situacao => situacao.id === lancamentoSituacao.situacao_id)
	const usuario = state.usuarios
		.find(usuario => usuario.id === lancamento.usuario_id)
	const empresa = state.empresas
		.find(empresa => empresa.id === lancamento.empresa_id)
	const categoria = state.categorias
		.find(categoria => categoria.id === lancamento.categoria_id)
	const usuario_id = state.usuarioLogado.usuario_id
	return {
		lancamento,
		lancamentoSituacao,
		usuarioSituacao,
		situacao,
		categoria,
		usuario,
		empresa,
		situacoes: state.situacoes,
		usuario_id,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarLancamento: (elemento, novo) => dispatch(salvarLancamento(elemento, novo)),
		salvarLancamentoSituacao: (elemento, novo) => dispatch(salvarLancamentoSituacao(elemento, novo)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Lancamento)
