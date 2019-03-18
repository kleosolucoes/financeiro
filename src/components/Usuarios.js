import React from 'react'
import {
	Row,
	Button,
	Table,
	Col,
	FormGroup,
	Label,
	Input,
} from 'reactstrap'
import { connect } from 'react-redux'
import Usuario from './Usuario'
import UsuarioSalvar from './UsuarioSalvar'
import { EMPRESA_ADMINISTRACAO_ID } from '../helpers/constantes'
import Responsive from 'react-responsive';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus)


class Usuarios extends React.Component {

	state = {
		mostrarSalvarUsuario: false,
		empresa_id: 0,
	}

	alternarMostrarSalvarUsuario = () => this.setState({mostrarSalvarUsuario: !this.state.mostrarSalvarUsuario})

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		this.setState({[name]: valor})
	}

	render() {
		const Desktop = props => <Responsive {...props} minWidth={992} />;
		const { 
			usuarios,
			empresas,
			empresa_usuario_logado_id,
			usuarioLogado,
		} = this.props
		const {
			empresa_id,
		} = this.state

		let usuariosFiltrados = usuarios
		if(empresa_id && parseInt(empresa_id) !== 0){
			usuariosFiltrados = usuariosFiltrados
				.filter(usuario => usuario.empresa_id === empresa_id)
		}
	
		return (
			
			<div style={{ marginTop: 60}}>
				{
					this.state.mostrarSalvarUsuario &&
						<UsuarioSalvar
							alternarMostrarSalvarUsuario={this.alternarMostrarSalvarUsuario}
							empresa_id={this.props.empresa_id}
						/>
				}
				{
					!this.state.mostrarSalvarUsuario &&
						<div>
							<Row style={{justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
								<h5 style={{margin: 0}}>Usuários</h5>
								<div>
									<Row style={{justifyContent: 'flex-end', padding: 10}}>
										<Button 
											type='button' 
											className="botao-lancar"
											onClick={this.alternarMostrarSalvarUsuario}
										>
											<FontAwesomeIcon icon="user-plus" size="sm" style={{marginRight: 5}} />
											Adicionar
										</Button>
									</Row>
								</div>
{
						empresa_usuario_logado_id === EMPRESA_ADMINISTRACAO_ID && 
							<Col>
								<FormGroup>
									<Label for="empresa_id">Empresa</Label>
									<Input 
										type="select" 
										name="empresa_id" 
										id="empresa_id" 
										value={empresa_id} 
										onChange={this.ajudadorDeCampo}
									>
										<option value='0'>Todas</option>
										{
											empresas &&
												empresas.map(empresa => {
													return (
														<option 
															key={empresa._id}
															value={empresa._id}
														>
															{empresa.nome}
														</option>
													)
												})
										}
									</Input>
								</FormGroup>
							</Col>
					}
							</Row>
							<Table style={{textAlign: 'center'}}>
								<thead style={{background: '#7CC9BC', color: '#fff'}}>
									<tr>
										<th>Nome</th>
										<Desktop><th>Data</th></Desktop>
										<th>Tipo</th>
										{
											usuarioLogado.empresa_id === EMPRESA_ADMINISTRACAO_ID &&
												<th>Empresa</th>
										}
										<Desktop><th>Email</th></Desktop>
										<th></th>
									</tr>
								</thead>
							{
								usuariosFiltrados &&
									usuariosFiltrados
									.map(usuario => {
										return (
											<Usuario
												key={usuario._id}
												usuario_id={usuario._id}
											/>
										)
									})
							}
							</Table>
						</div>
				}
			</div>
		)
	}
}

const mapStateToProps = ({usuarioLogado, usuarios, empresas}, { empresa_id }) => {
	let usuariosFiltrados = usuarios.filter(usuario => usuario.data_inativacao === null)
	if(usuarioLogado.empresa_id !== EMPRESA_ADMINISTRACAO_ID){
		usuariosFiltrados = usuariosFiltrados.filter(usuario => usuario.empresa_id === empresa_id && usuario.data_inativacao === null)
	}
	return {
		usuarios: usuariosFiltrados,
		empresa_usuario_logado_id: usuarioLogado.empresa_id,
		empresas,
		usuarioLogado,
	}
}

export default connect(mapStateToProps, null)(Usuarios)
