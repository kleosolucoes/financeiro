import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'

class ExtratoEmpresa extends React.Component {

	state = {
		api: null,
	}

	render() {
		const { 
			saldo,
			naoRecebido,
			lancamentos,
			lancamentoSituacao,
			categorias,
			situacoes,
			usuarios,
		} = this.props
		return (
			<div>
				<div style={{backgroundColor: 'lightblue', padding: 10}}>
					<Row>
						<Col>
							Saldo
						</Col>
						<Col>
							{saldo}
						</Col>
					</Row>
				</div>	
				<div style={{backgroundColor: 'lightgreen', padding: 10}}>
					<Row>
						<Col>
							Nao Recebido
						</Col>
						<Col>
							{naoRecebido}
						</Col>
					</Row>
				</div>	
				<div style={{backgroundColor: 'lightcyan', padding: 20}}>
					<Row>
						<Col style={{textAlign: 'center', backgroundColor: '#AAA'}}>
							Lancamentos
						</Col>
					</Row>
					{
						lancamentos &&
							lancamentos.map(lancamento => {
								return (
									<div key={lancamento.id} style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
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
										<Row>
											<Col>
												Categoria
											</Col>
											<Col>
												{
													categorias
														.find(categoria => lancamento.categoria_id === categoria.id)
														.nome
												}
											</Col>
										</Row>
										<Row>
											<Col>
												Tipo	
											</Col>
											<Col>
												{
													categorias
														.find(categoria => lancamento.categoria_id === categoria.id)
														.credito_debito === 'C' ? 'Credito' : 'Debito'
												}
											</Col>
										</Row>
										<Row>
											<Col>
												Quem
											</Col>
											<Col>
												{
													usuarios
														.find(usuario => lancamento.usuario_id === usuario.id)
														.nome
														.split(' ')[0]
												}
											</Col>
										</Row>
										<div style={{padding: 5, backgroundColor: 'lightblue'}}>
											<p>Situação Atual</p>
											{
												lancamentoSituacao
													.filter(lancamentoSituacao => lancamento.id === lancamentoSituacao.lancamento_id && lancamentoSituacao.data_inativacao === null)
													.map(lancamentoSituacao => {
														return (
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
																		{
																			situacoes
																				.find(situacao => lancamentoSituacao.situacao_id === situacao.id)
																				.nome
																		}
																	</Col>
																</Row>
															</div>
														)
													})
											}
										</div>
									</div>
								)
							})
					}
				</div>	
			</div>
		)
	}
}

const mapStateToProps = state => {
	let saldo = 0
	let naoRecebido = 0
	const lancamentosFiltrados = state.lancamentos.filter(lancamento => lancamento.empresa_id === 1)

	lancamentosFiltrados.forEach(lancamento => {
		const lancamentoSituacaoAtiva = state.lancamentoSituacao
			.find(lancamentoSituacao => 
				lancamento.id === lancamentoSituacao.lancamento_id 
				&& lancamentoSituacao.data_inativacao === null)
		const situacaoAtiva = state.situacoes
			.find(situacao => lancamentoSituacaoAtiva.situacao_id === situacao.id)

		const categoriaAtiva = state.categorias
			.find(categoria => lancamento.categoria_id === categoria.id)

		const valorFormatado = parseFloat(lancamento.valor)
		if(situacaoAtiva.id === 1){
			if(categoriaAtiva.credito_debito === 'C'){
				saldo += valorFormatado
			}else{
				saldo -= valorFormatado
			}
		}
		if(situacaoAtiva.id === 2){
			naoRecebido += valorFormatado
		}
	})


	return {
		saldo,
		naoRecebido,
		lancamentos: lancamentosFiltrados,
		lancamentoSituacao: state.lancamentoSituacao,
		categorias: state.categorias,
		situacoes: state.situacoes,
		usuarios: state.usuarios,
	}
}

function mapDispatchToProps(dispatch){
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtratoEmpresa)
