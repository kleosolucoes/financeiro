import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'
import Lancamentos from './Lancamentos'
import { SITUACAO_RECEBIDO, SITUACAO_NAO_RECEBIDO } from '../helpers/constantes'

class ExtratoEmpresa extends React.Component {

	state = {
		api: null,
	}

	render() {
		const { 
			saldo,
			naoRecebido,
		} = this.props
		return (
			<div>
				<div style={{backgroundColor: 'lightblue', padding: 10}}>
					<Row>
						<Col>
							Saldo
						</Col>
						<Col>
							{saldo}
						</Col>
					</Row>
				</div>	
				<div style={{backgroundColor: 'lightgreen', padding: 10}}>
					<Row>
						<Col>
							Nao Recebido
						</Col>
						<Col>
							{naoRecebido}
						</Col>
					</Row>
				</div>	
				<div style={{backgroundColor: 'lightcyan', padding: 20}}>
					<Row>
						<Col style={{textAlign: 'center', backgroundColor: '#AAA'}}>
							Lancamentos
						</Col>
					</Row>
					<Lancamentos />
				</div>	
			</div>
		)
	}
}

const mapStateToProps = state => {
	let saldo = 0
	let naoRecebido = 0
	const usuarioLogado = state.usuarios
		.find(usuario => usuario.id === state.usuarioLogado.usuario_id)

	const lancamentosFiltrados = state.lancamentos.filter(lancamento => lancamento.empresa_id === usuarioLogado.empresa_id)

	lancamentosFiltrados.forEach(lancamento => {
		const lancamentoSituacaoAtiva = state.lancamentoSituacao
			.find(lancamentoSituacao => 
				lancamento.id === lancamentoSituacao.lancamento_id 
				&& lancamentoSituacao.data_inativacao === null)
		const situacaoAtiva = state.situacoes
			.find(situacao => lancamentoSituacaoAtiva.situacao_id === situacao.id)

		const categoriaAtiva = state.categorias
			.find(categoria => lancamento.categoria_id === categoria.id)

		const valorFormatado = parseFloat(lancamento.valor)
		if(situacaoAtiva.id === SITUACAO_RECEBIDO){
			if(categoriaAtiva.credito_debito === 'C'){
				saldo += valorFormatado
			}else{
				saldo -= valorFormatado
			}
		}
		if(situacaoAtiva.id === SITUACAO_NAO_RECEBIDO){
			naoRecebido += valorFormatado
		}
	})

	return {
		saldo,
		naoRecebido,
	}
}

export default connect(mapStateToProps, null)(ExtratoEmpresa)
