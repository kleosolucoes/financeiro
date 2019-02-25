import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'

class Empresas extends React.Component {

	render() {
		const { 
			empresas, 
			empresaTipo, 
			situacoes, 
			usuarios,
			usuarioSituacao,
			usuarioTipo,
			contaFixa,
			categorias
		} = this.props
		return (
			<div>
				{
					empresas.map(empresa => {
						return (
							<div key={empresa.id} style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
								<Row>
									<Col>
										Id
									</Col>
									<Col>
										{empresa.id.toString().padStart(8,0)}
									</Col>
								</Row>
								<Row>
									<Col>
										Data
									</Col>
									<Col>
										{empresa.data_criacao}
									</Col>
								</Row>
								<Row>
									<Col>
										Nome
									</Col>
									<Col>
										{empresa.nome}
									</Col>
								</Row>
								<Row>
									<Col>
										Tipo
									</Col>
									<Col>
										{
											empresaTipo
												.find(empresaTipo => empresa.empresa_tipo_id === empresaTipo.id)
												.nome
										}
									</Col>
								</Row>
								<div style={{padding: 5, backgroundColor: 'lightblue'}}>
									<p>Usuarios</p>
									{
										usuarios
											.filter(usuario => empresa.id === usuario.empresa_id)
											.map(usuario => {
												return (
													<div key={usuario.id} style={{padding: 5, marginTop: 5, backgroundColor: 'lightgreen'}}>
														<Row>
															<Col>
																Data
															</Col>
															<Col>
																{usuario.data_criacao}
															</Col>
														</Row>
														<Row>
															<Col>
																Nome
															</Col>
															<Col>
																{usuario.nome}
															</Col>
														</Row>
														<Row>
															<Col>
																Email
															</Col>
															<Col>
																{usuario.email}
															</Col>
														</Row>
														<Row>
															<Col>
																Tipo
															</Col>
															<Col>
																{
																	usuarioTipo
																		.find(usuarioTipo => usuario.usuario_tipo_id === usuarioTipo.id)
																		.nome
																}
															</Col>
														</Row>
														<Row>
															<Col>
																Situação
															</Col>
															<Col>
																{
																	situacoes
																		.find(situacao =>
																			situacao.id === 
																			usuarioSituacao
																			.find(usuarioSituacao => usuario.id === usuarioSituacao.usuario_id && usuarioSituacao.data_inativacao === null)
																			.situacao_id)
																			.nome
																}
															</Col>
														</Row>
														<Row style={{padding: 5}}>
															<Col>
																<button type='button' style={{width: '100%'}} >Alterar</button> 
															</Col>
														</Row>
													</div>
												)
											})
									}
								</div>
								<div style={{padding: 5, backgroundColor: 'red'}}>
									<p>Contas Fixas</p>
									{
										contaFixa
											.filter(contaFixa => empresa.id === contaFixa.empresa_id)
											.map(contaFixa => {
												return (
													<div key={contaFixa.id} style={{padding: 5, marginTop: 5, backgroundColor: 'lightgreen'}}>
														<Row>
															<Col>
																Data
															</Col>
															<Col>
																{contaFixa.data_criacao}
															</Col>
														</Row>
														<Row>
															<Col>
																Gerar
															</Col>
															<Col>
																{contaFixa.dia_gerar}
															</Col>
														</Row>
														<Row>
															<Col>
																Notificar
															</Col>
															<Col>
																{contaFixa.dia_notificacao}
															</Col>
														</Row>
														<Row>
															<Col>
																Categoria
															</Col>
															<Col>
																{
																	categorias
																		.find(categoria => contaFixa.categoria_id === categoria.id)
																		.nome
																}
															</Col>
														</Row>
														<Row style={{padding: 5}}>
															<Col>
																<button type='button' style={{width: '100%'}} >Alterar</button> 
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
		empresas: state.empresas,
		empresaTipo: state.empresaTipo,
		situacoes: state.situacoes,
		categorias: state.categorias,
		usuarios: state.usuarios,
		usuarioSituacao: state.usuarioSituacao,
		usuarioTipo: state.usuarioTipo,
		contaFixa: state.contaFixa,
	}
}

function mapDispatchToProps(dispatch){
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Empresas)
