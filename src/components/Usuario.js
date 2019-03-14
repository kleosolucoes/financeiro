import React from 'react'
import {
	Row,
	Col,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import Responsive from 'react-responsive';
import { salvarUsuario, salvarUsuarioSituacao } from '../actions'
import { pegarDataEHoraAtual } from '../helpers/funcoes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserMinus, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faUserMinus)
library.add(faTrash)


class Usuario extends React.Component {

	removerUsuario = () => {
		if(window.confirm('Realmente deseja remover esse usuário?')){
			let { 
				usuario,
				usuarioSituacao,
				usuarioLogado,
			} = this.props

			usuario.data_inativacao = pegarDataEHoraAtual()[0]
			usuario.hora_inativacao = pegarDataEHoraAtual()[1]
			this.props.salvarUsuario(usuario)

			usuarioSituacao.data_inativacao = pegarDataEHoraAtual()[0]
			usuarioSituacao.hora_inativacao = pegarDataEHoraAtual()[1]
			this.props.salvarUsuarioSituacao(usuarioSituacao)

			const novoRegistro = true
			const elemento = {
				id: Date.now(),
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				data_inativacao: null,
				hora_inativacao: null,
			}
			elemento.situacao_id = 5 // inativo TODO
			elemento.usuario_id = usuario.id
			elemento.quem_id = usuarioLogado.usuario_id
			this.props.salvarUsuarioSituacao(elemento, novoRegistro)
			alert('Usuário Removido com sucesso!')
		}
	}

	render() {
		const Desktop = props => <Responsive {...props} minWidth={992} />;
		const { 
			usuario, 
			usuarioTipo,
			situacao,
		} = this.props
		return (
				<tbody>
					<tr>
						<td>{usuario.nome}</td>
						<Desktop><td>{usuario.data_criacao}</td></Desktop>
						<td>{usuarioTipo.nome}</td>
						<Desktop><td>{situacao.nome}</td></Desktop>
						<Desktop><td>{usuario.email}</td></Desktop>
				
				{
					situacao.id !== 5 &&
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

const mapStateToProps = (state, {usuario_id}) => {
	const usuario = state.usuarios
		.find(usuario => usuario.id === usuario_id)
	const usuarioTipo = state.usuarioTipo
		.find(usuarioTipo => usuarioTipo.id === usuario.usuario_tipo_id)
	const usuarioSituacao = state.usuarioSituacao
		.find(usuarioSituacao => usuarioSituacao.usuario_id === usuario.id && usuarioSituacao.data_inativacao === null)
	const situacao = state.situacoes
		.find(situacao => situacao.id === usuarioSituacao.situacao_id)

	return {
		usuario,
		usuarioTipo,
		usuarioSituacao,
		situacao,
		usuarioLogado: state.usuarioLogado,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarUsuario: (elemento) => dispatch(salvarUsuario(elemento)),
		salvarUsuarioSituacao: (elemento) => dispatch(salvarUsuarioSituacao(elemento)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Usuario)
