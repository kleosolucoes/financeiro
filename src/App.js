import React from 'react'
import Menu from './components/Menu'
import Lancamentos from './components/Lancamentos'
import Empresas from './components/Empresas'
import ExtratoAdministracao from './components/ExtratoAdministracao'
import { FolhaDeEstilo } from './components/FolhaDeEstilo'
import {
	Container,
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'

class App extends React.Component {

	state = {
		tela: 'extratoAdministracao',
	}

	alterarTela = (tela) => {
		this.setState({tela})
	}

	render() {
		const { tela } = this.state
		return (
			<Container style={FolhaDeEstilo.containerStyle}>
				<Menu alterarTela={this.alterarTela} nomeDaTela={tela} />
				<div>
					{
						tela === 'extratoEmpresa' &&
							<h2>Extrato</h2>
					}
					{
						tela === 'lancarVarios' &&
							<h2>Lançamento varios</h2>
					}
					{
						tela === 'extratoAdministracao' &&
							<ExtratoAdministracao /> 
					}
					{
						tela === 'lancarUm' &&
							<h2>Lançamento 1</h2>
					}
					{
						tela === 'lancamentos' && 
							<Lancamentos />
					}
					{
						tela === 'categorias' &&
							<div>
								<h2>Categorias</h2>
								{
									this.props.categorias.map(elemento => {
										return (
											<Row key={elemento.id}>
												<Col>
													{elemento.id}
												</Col>
												<Col>
													{elemento.data_criacao}
												</Col>
												<Col>
													{elemento.nome}
												</Col>
												<Col>
													{elemento.credito_debito}
												</Col>
											</Row>
										)
									})
								}
							</div>
					}
					{
						tela === 'empresas' &&
							<Empresas />
					}
					{
						tela === 'usuarios' &&
							<div>
								<h2>Usuarios</h2>
								{
									this.props.usuarios.map(usuario => {
										return (
											<div key={usuario.id}>
												<hr />
												<Row key={usuario.id}>
													<Col>
														{usuario.id}
													</Col>
													<Col>
														{usuario.data_criacao}
													</Col>
													<Col>
														{usuario.nome}
													</Col>
													<Col>
														{usuario.email}
													</Col>
													<Col>
														{usuario.usuario_tipo_id}
													</Col>
												</Row>
												<p>Situações</p>
												<Row>
													<Col>
														id
													</Col>
													<Col>
														data_criacao
													</Col>
													<Col>
														empresa_id
													</Col>
													<Col>
														situacao_id
													</Col>
													<Col>
														usuario_id
													</Col>
												</Row>
												{
													this.props.usuarioSituacao
														.filter(usuarioSituacao => usuario.id === usuarioSituacao.usuario_id)
														.map(usuarioSituacao => {
															return (
																<Row key={usuarioSituacao.id}>
																	<Col>
																		{usuarioSituacao.id}
																	</Col>
																	<Col>
																		{usuarioSituacao.data_criacao}
																	</Col>
																	<Col>
																		{usuarioSituacao.lancamento_id}
																	</Col>
																	<Col>
																		{usuarioSituacao.situacao_id}
																	</Col>
																	<Col>
																		{usuarioSituacao.usuario_id}
																	</Col>
																</Row>
															)
														})
												}
											</div>
										)
									})
								}
							</div>
					}
				</div>
			</Container>
		)
	}
}

const mapStateToProps = (state) => {
	return state
}

export default connect(mapStateToProps, null)(App)
