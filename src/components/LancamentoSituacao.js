import React from 'react'
import { connect } from 'react-redux'

class LancamentoSituacao extends React.Component {

	render() {
		const {
			lancamentoSituacao,
			situacao,
			usuario,
		} = this.props
		return (
			<tr>
				<td>
					{lancamentoSituacao.data_criacao}
				</td>
				<td>
					{situacao.nome}
				</td>
				<td>
					{usuario.nome.split(' ')[0]}
				</td>
			</tr>
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
