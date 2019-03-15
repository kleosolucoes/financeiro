import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'
import Usuario from './Usuario'
import UsuarioSalvar from './UsuarioSalvar'

class Usuarios extends React.Component {

	state = {
		mostrarSalvarUsuario: false,
	}

	alternarMostrarSalvarUsuario = () => this.setState({mostrarSalvarUsuario: !this.state.mostrarSalvarUsuario})

	render() {
		const { 
			usuarios,
		} = this.props
		return (
			<div style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
				<p>Usuarios</p>
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
							<div style={{padding: 10, backgroundColor: 'lightblue'}}>
								<Row>
									<Col>
										<button 
											type='button' 
											style={{width: '100%'}}
											onClick={this.alternarMostrarSalvarUsuario}
										>
											Adicionar Usuario
										</button>
									</Col>
								</Row>
							</div>

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
