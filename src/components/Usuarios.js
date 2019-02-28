import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'

class Usuarios extends React.Component {

	render() {
		const { 
			empresas, 
			situacoes, 
			usuarios,
			usuarioSituacao,
			usuarioTipo,
		} = this.props
		return (
			<div>
				{
					usuarios.map(usuario => {
						return (
							<div key={usuario.id} style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
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
										Nome
									</Col>
									<Col>
										{usuario.nome}
									</Col>
								</Row>
								<Row>
									<Col>
										Empresa
									</Col>
									<Col>
										{
											empresas
												.find(empresa => usuario.empresa_id === empresa.id)
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
											usuarioTipo
												.find(usuarioTipo => usuario.usuario_tipo_id === usuarioTipo.id)
												.nome
										}
									</Col>
								</Row>
								<Row>
									<Col>
										Situacao
									</Col>
									<Col>
										{
											situacoes
												.find(situacao => 
													usuarioSituacao
														.find(usuarioSituacao => usuario.id === usuarioSituacao.id && usuarioSituacao.data_inativacao === null)
														.situacao_id === situacao.id
												).nome
										}
									</Col>
								</Row>
								<Row style={{padding: 5}}>
									<Col>
										<button type='button' style={{width: '100%'}} >Inativar/Ativar</button> 
									</Col>
								</Row>
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
		situacoes: state.situacoes,
		usuarios: state.usuarios,
		usuarioSituacao: state.usuarioSituacao,
		usuarioTipo: state.usuarioTipo,
	}
}

function mapDispatchToProps(dispatch){
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Usuarios)
