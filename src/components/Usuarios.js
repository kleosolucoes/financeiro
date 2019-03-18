import React from 'react'
import {
	Row,
	Button,
	Table
} from 'reactstrap'
import { connect } from 'react-redux'
import Usuario from './Usuario'
import UsuarioSalvar from './UsuarioSalvar'
import Responsive from 'react-responsive';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus)


class Usuarios extends React.Component {

	state = {
		mostrarSalvarUsuario: false,
	}
	

	alternarMostrarSalvarUsuario = () => this.setState({mostrarSalvarUsuario: !this.state.mostrarSalvarUsuario})

	render() {
		const Desktop = props => <Responsive {...props} minWidth={992} />;
		const { 
			usuarios,
		} = this.props
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
							</Row>
							<Table style={{textAlign: 'center'}}>
								<thead style={{background: '#7CC9BC', color: '#fff'}}>
									<tr>
										<th>Nome</th>
										<Desktop><th>Data</th></Desktop>
										<th>Tipo</th>
										<Desktop><th>Email</th></Desktop>
										<th></th>
									</tr>
								</thead>
							{
								usuarios &&
									usuarios
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

const mapStateToProps = ({usuarios}, { empresa_id }) => {
	return {
		usuarios: usuarios && usuarios.filter(usuario => usuario.empresa_id === empresa_id && usuario.data_inativacao === null)
	}
}

export default connect(mapStateToProps, null)(Usuarios)
