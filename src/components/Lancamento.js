import React from 'react'
import {
	Row,
	Col,
	Table,
	Button,
} from 'reactstrap'
import { connect } from 'react-redux'
import Responsive from 'react-responsive';
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
		mostrarTodosLancamentoSituacao: false,
	}

	alterarMostrarTodosLancamentoSituacao = () => this.setState({mostrarTodosLancamentoSituacao: !this.state.mostrarTodosLancamentoSituacao})

	componentDidMount(){
		this.setState({
			valor: this.props.lancamento.valor,
			taxa: this.props.lancamento.taxa,
		})
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
			mostrarTodosLancamentoSituacao,
		} = this.state

		let	lancamentoSituacaoAtual = null
		let situacao = null
		if(lancamentoSituacao){
			lancamentoSituacaoAtual = lancamentoSituacao.find(lancamentoSituacao => (
				lancamentoSituacao.data_inativacao === null
			))
			if(lancamentoSituacaoAtual){
				situacao = situacoes.find((situacao) => (
					situacao._id === lancamentoSituacaoAtual.situacao_id
				)) 
			}
		}
		return (
			<tbody style={{ backgroundColor: 'lightCyan', marginTop: 10}}>
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
								onClick={() => this.props.alternarMostrarAlterarLancamento(lancamento._id)}
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

export default connect(mapStateToProps, null)(Lancamento)
