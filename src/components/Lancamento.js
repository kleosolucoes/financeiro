import React from 'react'
import {connect} from 'react-redux'
import { ListGroupItem, Container, Row, Col } from 'reactstrap'

class Lancamento extends React.Component {
	render() {
		const { lancamento, entidade, categoria, usuario, lancamentoSituacao } = this.props
		return (
			<ListGroupItem>
				<Container>
					<Row>
						<Col>{usuario.nome}</Col>	
						<Col>{entidade.nome}</Col>	
						<Col>{categoria.nome}</Col>	
						<Col>{lancamento.data_criacao}</Col>	
						<Col>{lancamento.credito_debito}</Col>	
						<Col>{lancamento.valor}</Col>	
					</Row>
				</Container>
			</ListGroupItem>
		)
	}
}

function mapStateToProps({ usuarios, entidades, categorias, lancamentoSituacao }, { lancamento }){
	return {
		entidade: entidades && entidades.find(entidade => entidade.id === lancamento.entidade_id),
		categoria: categorias && categorias.find(categoria => categoria.id === lancamento.categoria_id),
		usuario: usuarios && usuarios.find(usuario => usuario.id === lancamento.usuario_id),
		lancamentoSituacao: lancamentoSituacao && lancamentoSituacao.filter(lancamentoSituacao => lancamentoSituacao.lancamento_id === lancamento.id),
	}
}

export default connect(mapStateToProps, null)(Lancamento)
