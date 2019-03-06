import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'
import { salvarUsuarioSituacao } from '../actions'

class Usuario extends React.Component {

	removerUsuario = () => {
		let usuarioSituacao = this.props.usuarioSituacao

		const dataAtual = new Date()
		const diaParaDataDeCriacao = dataAtual.getDate().toString().padStart(2, '0')
		let mesParaDataDeCriacao = dataAtual.getMonth()+1
		mesParaDataDeCriacao = mesParaDataDeCriacao.toString().padStart(2, '0')
		const anoParaDataDeCriacao = dataAtual.getFullYear()
		const dataDeCriacao = diaParaDataDeCriacao + '/' + mesParaDataDeCriacao + '/' + anoParaDataDeCriacao

		usuarioSituacao.data_inativacao = dataDeCriacao
		this.props.salvarUsuarioSituacao(usuarioSituacao)

		const novoRegistro = true
		const elemento = {
			id: Date.now(),
			data_criacao: dataDeCriacao,
			data_inativacao: null,
		}
		elemento.situacao_id = 5 // inativo TODO
		elemento.usuario_id = usuarioSituacao.usuario_id
		elemento.quem_id = 1 // usuario logado TODO
		this.props.salvarUsuarioSituacao(elemento, novoRegistro)
	}

	render() {
		const { 
			usuario, 
			usuarioTipo,
			situacao,
		} = this.props
		return (
			<div style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
				<Row>
					<Col>
						Id
					</Col>
					<Col>
						{usuario.id.toString().padStart(8,0)}
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
						{usuarioTipo.nome}
					</Col>
				</Row>
				<Row>
					<Col>
						Situação
					</Col>
					<Col>
						{situacao.nome}
					</Col>
				</Row>
				{
					situacao.id !== 5 &&
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
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarUsuarioSituacao: (elemento, novo) => dispatch(salvarUsuarioSituacao(elemento, novo)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Usuario)
