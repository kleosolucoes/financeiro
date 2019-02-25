import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'

class Lancamentos extends React.Component {

	render() {
		const { 
			lancamentos, 
			lancamentoSituacao, 
			situacoes, 
			categorias,
			usuarios,
			empresas,
		} = this.props
		return (
			<div>
				{
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
										<input value={lancamento.valor} />
									</Col>
								</Row>
								<Row>
									<Col>
										Taxa
									</Col>
									<Col>
										<input valor={lancamento.taxa} />
									</Col>
								</Row>
								<Row style={{padding: 5}}>
									<Col>
										<button type='button' style={{width: '100%'}} >Alterar</button> 
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
								<Row>
									<Col>
										Empresa
									</Col>
									<Col>
										{
											empresas
												.find(empresa => lancamento.empresa_id === empresa.id)
												.nome
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
														<Row>
															<Col>
																Quem
															</Col>
															<Col>
																{
																	usuarios
																		.find(usuario => lancamentoSituacao.usuario_id === usuario.id)
																		.nome
																		.split(' ')[0]
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

		)
	}

}

const mapStateToProps = state => {
	return {
		lancamentos: state.lancamentos,
		lancamentoSituacao: state.lancamentoSituacao,
		situacoes: state.situacoes,
		categorias: state.categorias,
		usuarios: state.usuarios,
		empresas: state.empresas,
	}
}

function mapDispatchToProps(dispatch){
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Lancamentos)
