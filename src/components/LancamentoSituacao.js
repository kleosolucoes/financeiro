import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'

class LancamentoSituacao extends React.Component {

	render() {
		const {
			lancamentoSituacao,
			situacao,
			usuario,
		} = this.props
		return (
			<div style={{padding: 5, marginTop: 5, backgroundColor: 'lightgreen'}}>
				<Row>
					<Col>
						Data
					</Col>
					<Col>
						{lancamentoSituacao.data_criacao}
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
				<Row>
					<Col>
						Quem Mudou a Situação
					</Col>
					<Col>
						{usuario.nome.split(' ')[0]}
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = ({lancamentoSituacao, usuarios, situacoes}, {lancamento_situacao_id}) => {
	const lancamentoSituacaoSelecionado = 
		lancamentoSituacao && lancamentoSituacao.find(lancamentoSituacao => lancamentoSituacao._id === lancamento_situacao_id)
	const usuario = usuarios && usuarios.find(usuario => usuario._id === lancamentoSituacaoSelecionado.usuario_id)
	const situacao = situacoes && situacoes.find(situacao => situacao._id === lancamentoSituacaoSelecionado.situacao_id)
	return {
		lancamentoSituacao: lancamentoSituacaoSelecionado,
		usuario,
		situacao,
	}
}

export default connect(mapStateToProps, null)(LancamentoSituacao)
