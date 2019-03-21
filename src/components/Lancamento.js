import React from 'react'
import {
	Button,
	Card,
	CardBody,
	CardTitle,
} from 'reactstrap'
import { connect } from 'react-redux'
import { 
	EMPRESA_ADMINISTRACAO_ID,
	STRING_DEBITO,
	STRING_CREDITO,
	SITUACAO_NAO_RECEBIDO,
	SITUACAO_RECEBIDO,
} from '../helpers/constantes'
import LancamentoSituacao from './LancamentoSituacao'
import { removerLancamentoNaApi } from '../actions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandArrowsAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
library.add(faExpandArrowsAlt)
library.add(faEdit)

class Lancamento extends React.Component {
	state = {
		mostrarTodosLancamentoSituacao: false,
	}

	alterarMostrarTodosLancamentoSituacao = () => this.setState({mostrarTodosLancamentoSituacao: !this.state.mostrarTodosLancamentoSituacao})

	componentDidMount(){
		this.setState({
			valor: this.props.lancamento.valor,
			taxa: this.props.lancamento.taxa,
		})
	}

	removerLancamento = (lancamento_situacao_id) => {
		if(window.confirm('Realmente deseja remover esse lançamento?')){
			const {
				lancamento_id,
				usuarioLogado,
				removerLancamentoNaApi
			} = this.props

			let elemento = {}
			elemento.lancamento_id = lancamento_id
			elemento.lancamento_situacao_id = lancamento_situacao_id

			removerLancamentoNaApi(elemento, usuarioLogado.token)
		}
	}

	render() {
		const { 
			lancamento, 
			lancamentoSituacao,
			categoria,
			empresa,
			situacoes,
			usuarioLogado,
		} = this.props
		const {
			mostrarTodosLancamentoSituacao,
		} = this.state

		let	lancamentoSituacaoAtual = null
		let situacao = null
		let corSituacao = 'text-muted'
		if(lancamentoSituacao){
			lancamentoSituacaoAtual = lancamentoSituacao.find(lancamentoSituacao => (
				lancamentoSituacao.data_inativacao === null
			))
			if(lancamentoSituacaoAtual){
				situacao = situacoes.find((situacao) => (
					situacao._id === lancamentoSituacaoAtual.situacao_id
				)) 
				if(situacao._id === SITUACAO_RECEBIDO){
					if(categoria.credito_debito === 'C'){
						corSituacao = 'text-success'
					}else{
						corSituacao = 'text-danger'
					}
				}
			}
		}
		return (
			<Card className={corSituacao} style={{fontSize: 14, marginTop: 5}}>
				<CardBody>
					<CardTitle style={{marginBottom: 0}}>
						{lancamento.data}	
					</CardTitle>
					<CardTitle style={{marginBottom: 0}}>
						{categoria && categoria.nome} - R$ {lancamento.valor}
					</CardTitle>
					<CardTitle style={{marginBottom: 0}}>
						{categoria && categoria	=== 'C' ? STRING_CREDITO : STRING_DEBITO} - {situacao && situacao.nome}
					</CardTitle>
					<CardTitle style={{marginBottom: 0}}>
						Empresa: {empresa && empresa.nome}
					</CardTitle>
					<Button 
						outline
						color='success'
						type='button' 
						size='sm'
						style={{marginLeft: 10}}
						onClick={() => this.alterarMostrarTodosLancamentoSituacao()}
					>
						Situações <FontAwesomeIcon icon="expand-arrows-alt" size="sm"  />
					</Button>
					{ 
					usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID && 
					<Button 
						outline
						color='success'
						type='button' 
						size='sm'
						style={{marginLeft: 10}}
						onClick={() => this.props.alternarMostrarAlterarLancamento(lancamento._id)}
					>
						Alterar <FontAwesomeIcon icon="edit" size="sm" />
							</Button>
					}
					{
						lancamentoSituacaoAtual &&
							lancamentoSituacaoAtual.situacao_id === SITUACAO_NAO_RECEBIDO &&
							usuarioLogado.empresa_id !== EMPRESA_ADMINISTRACAO_ID && 
							<Button 
								outline
								color='success'
								type='button' 
								size='sm'
								style={{marginLeft: 10}}
								onClick={() => this.removerLancamento(lancamentoSituacaoAtual._id)}
							>
								<FontAwesomeIcon icon="trash" size="sm"  />
							</Button>
					}
					{ 
					lancamentoSituacao && 
					mostrarTodosLancamentoSituacao && 
					lancamentoSituacao.map(lancamentoSituacao => (
						<LancamentoSituacao 
							key={lancamentoSituacao._id}
							lancamento_situacao_id={lancamentoSituacao._id} />
					))
					}
				</CardBody>
				{/*				<td>{lancamento.data}</td>
				<td>{categoria.nome}</td>
				<td>R$ {lancamento.valor}</td>
				<td>{categoria.credito_debito === 'C' ? STRING_CREDITO : STRING_DEBITO}</td>
				<td>{situacao && situacao.nome}</td>
				<td>{empresa.nome}</td>
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
					{ 
						usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID && 
						<Col style={{paddingLeft: 0, paddingRight: 0, flexGrow: 0}}>
							<Button 
								type='button' 
								className="botao-acao"
								onClick={() => this.props.alternarMostrarAlterarLancamento(lancamento._id)}
							>
								<FontAwesomeIcon icon="edit" size="sm"  />
							</Button>
						</Col>
					}
					{
						lancamentoSituacaoAtual &&
							lancamentoSituacaoAtual.situacao_id === SITUACAO_NAO_RECEBIDO &&
							usuarioLogado.empresa_id !== EMPRESA_ADMINISTRACAO_ID && 
								<Col style={{paddingLeft: 0, paddingRight: 0, flexGrow: 0}}>
									<Button 
										type='button' 
										className="botao-remover"
										onClick={() => this.removerLancamento(lancamentoSituacaoAtual._id)}
									>
										<FontAwesomeIcon icon="trash" size="sm"  />
									</Button>
								</Col>
					}
				</Row>
				{ 
					lancamentoSituacao && 
						mostrarTodosLancamentoSituacao && 
						<tr>
						<th colspan="12" style={{padding: 0}}>

								<tr style={{background: '#eee'}}>
									<td colspan="4">Data</td>
									<td colspan="4">Nome</td>
									<td colspan="4">Usuario</td>
								</tr>
							{
								lancamentoSituacao.map(lancamentoSituacao => (
									<LancamentoSituacao 
									key={lancamentoSituacao._id}
									lancamento_situacao_id={lancamentoSituacao._id} />
									))
								} 
						</th>
						</tr>	

				}
				*/}
			</Card>
		)
	}
}

const mapStateToProps = ({lancamentos, lancamentoSituacao, empresas, categorias, situacoes, usuarioLogado, usuarios}, {lancamento_id}) => {
	const lancamentoSelecionado = lancamentos && lancamentos.find(lancamento => lancamento._id === lancamento_id)
	const todosLancamentoSituacao =  lancamentoSituacao && lancamentoSituacao.filter(lancamentoSituacao => lancamentoSituacao.lancamento_id === lancamentoSelecionado._id)
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
		removerLancamentoNaApi: (elemento, token) => dispatch(removerLancamentoNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Lancamento)
