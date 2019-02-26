import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'

class ExtratoAdministracao extends React.Component {

	render() {
		const { 
			saldo,
			naoRecebido,
			listaDeNaoRecebidoPorCategorias,
			categorias,
			lancamentos,
		} = this.props
		console.log(this.props)
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
							Nao Recebidos
						</Col>
					</Row>
				{
					categorias &&
						categorias.map(categoria => {
							return (
								<Row>
									<Col>
										{categoria.nome}	
									</Col>
									<Col>
										{listaDeNaoRecebidoPorCategorias[categoria.id]}
									</Col>
								</Row>
							)
						})
				}
			</div>	
			</div>
		)
	}

}

const mapStateToProps = state => {
	let saldo = 0
	let naoRecebido = 0
	let listaDeNaoRecebidoPorCategorias = []
	state.categorias.map(categoria => listaDeNaoRecebidoPorCategorias[categoria.id] = 0)
	state.lancamentos.map(lancamento => {
		const lancamentoSituacaoAtiva = state.lancamentoSituacao
			.find(lancamentoSituacao => 
				lancamento.id === lancamentoSituacao.lancamento_id 
				&& lancamentoSituacao.data_inativacao === null)
		const situacaoAtiva = state.situacoes
			.find(situacao => lancamentoSituacaoAtiva.situacao_id === situacao.id)

		const categoriaAtiva = state.categorias
			.find(categoria => lancamento.categoria_id === categoria.id)

		const valorFormatado = parseFloat(lancamento.valor)
		if(situacaoAtiva.id === 1){
			if(categoriaAtiva.credito_debito === 'C'){
				saldo += valorFormatado
			}else{
				saldo -= valorFormatado
			}
		}
		if(situacaoAtiva.id === 2){
			naoRecebido += valorFormatado
			listaDeNaoRecebidoPorCategorias[categoriaAtiva.id] += valorFormatado
		}
	})

	return {
		saldo,
		naoRecebido,
		listaDeNaoRecebidoPorCategorias,
		categorias: state.categorias,
		lancamentos: state.lancamentos,
	}
}

function mapDispatchToProps(dispatch){
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtratoAdministracao)
