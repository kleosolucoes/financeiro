import React from 'react'
import {
	Row,
	Col,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import Responsive from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserMinus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { removerUsuarioNaApi, } from '../actions'
import { USUARIO_TIPO_ADMINISTRACAO, } from '../helpers/constantes'
library.add(faUserMinus)
library.add(faTrash)


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
		const Desktop = props => <Responsive {...props} minWidth={992} />;
		const { 
			usuario, 
			usuarioTipo,
			idTipoUsuarioLogado,
		} = this.props
		return (
				<tbody>
					<tr>
						<td>{usuario.nome}</td>
						<Desktop><td>{usuario.data_criacao}</td></Desktop>
						<td>{usuarioTipo.nome}</td>
						<Desktop><td>{usuario.email}</td></Desktop>
				
				{
					idTipoUsuarioLogado === USUARIO_TIPO_ADMINISTRACAO &&
						<Row style={{justifyContent: 'center', marginTop: 8}}>
							<Col>
								<Button 
									type='button' 
									className="botao-remover"
									style={{width: '100%', borderRadius: 0}}
									onClick={this.removerUsuario}
								>
									<FontAwesomeIcon icon="trash" size="sm" style={{marginRight: 5}} />
								</Button>
							</Col>
						</Row>
				}
					</tr>
				</tbody>
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
