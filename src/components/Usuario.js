import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'
import { removerUsuarioNaApi, } from '../actions'
import { USUARIO_TIPO_ADMINISTRACAO, } from '../helpers/constantes'

class Usuario extends React.Component {

	removerUsuario = () => {
		if(window.confirm('Realmente deseja remover esse usuário?')){
			const { 
				usuario,
				usuarioLogado,
				removerUsuarioNaApi,
			} = this.props

			const elemento = {}
			elemento.usuario_id = usuario._id
			elemento.quem_id = usuarioLogado.usuario_id
			removerUsuarioNaApi(elemento, usuarioLogado.token)
			alert('Usuário Removido com sucesso!')
		}
	}

	render() {
		const { 
			usuario, 
			usuarioTipo,
			idTipoUsuarioLogado,
		} = this.props
		return (
			<div style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
				<Row>
					<Col>
						Id
					</Col>
					<Col>
						{usuario._id}
					</Col>
				</Row>
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
						{usuarioTipo && usuarioTipo.nome}
					</Col>
				</Row>
				{
					idTipoUsuarioLogado && 
						idTipoUsuarioLogado === USUARIO_TIPO_ADMINISTRACAO &&
							<Row>
								<Col>
									<button 
										type='button' 
										style={{width: '100%'}}
										onClick={this.removerUsuario}
									>
										Remover Usuario
									</button>
								</Col>
							</Row>
				}
			</div>
		)
	}
}

const mapStateToProps = ({usuarios, usuarioTipo, usuarioLogado}, {usuario_id}) => {
	const usuarioSelecionado = usuarios && usuarios.find(usuario => usuario._id === usuario_id)
	const usuarioTipoSelecionado = usuarioTipo && usuarioTipo.find(usuarioTipo => usuarioTipo._id === usuarioSelecionado.usuario_tipo_id)

	const idTipoUsuarioLogado = usuarioLogado && usuarios &&
		usuarios.find(usuario => usuario._id === usuarioLogado.usuario_id)
		.usuario_tipo_id

	return {
		usuario: usuarioSelecionado,
		usuarioTipo: usuarioTipoSelecionado,
		usuarioLogado,
		idTipoUsuarioLogado,
	}
}

function mapDispatchToProps(dispatch){
	return {
		removerUsuarioNaApi: (elemento, token) => dispatch(removerUsuarioNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Usuario)
