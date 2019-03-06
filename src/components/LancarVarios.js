import React from 'react'
import {
	Row,
	Col,
	Label,
	FormGroup,
	Input,
	Alert
} from 'reactstrap'
import { connect } from 'react-redux'
import { formatReal, getMoney } from '../helpers/funcoes'
import { salvarLancamento, salvarLancamentoSituacao } from '../actions'

class LancarVarios extends React.Component {

	state = {
		dia: new Date().getDate(),
		mes: (new Date().getMonth() + 1),
		ano: new Date().getFullYear(),
		dizimoDinheiro: '0.00',
		dizimoDebito: '0.00',
		dizimoCredito: '0.00',
		dizimoMoeda: '0.00',
		ofertaDinheiro: '0.00',
		ofertaDebito: '0.00',
		ofertaCredito: '0.00',
		ofertaMoeda: '0.00',
		mostrarMensagemDeErro: false,
		camposComErro: [],
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		if(name !== 'dia' && name !== 'mes' && name !== 'ano'){
			valor = formatReal(getMoney(valor).toString().padStart(3, '0'))
		}
		this.setState({[name]: valor})
	}

	ajudadorDeSubmissao = () => {
		const {
			dizimoDinheiro,
			dizimoDebito,
			dizimoCredito,
			dizimoMoeda,
			ofertaDinheiro,
			ofertaDebito,
			ofertaCredito,
			ofertaMoeda,
			dia,
			mes,
			ano,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		camposComErro = []

		mostrarMensagemDeErro = false
		if(parseInt(dia) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('dia')
		}
		if(parseInt(mes) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('mes')
		}
		if(parseInt(ano) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('ano')
		}
		if(mostrarMensagemDeErro){
			this.setState({
				mostrarMensagemDeErro,
				camposComErro,
			})
		}else{
			this.setState({
				mostrarMensagemDeErro: false,
				camposComErro: [],
			})

			for(let indiceDeValores = 1; indiceDeValores <= 8; indiceDeValores++){
				const novoRegistro = true
				const dataAtual = new Date()
				const diaParaDataDeCriacao = dataAtual.getDate().toString().padStart(2, '0')
				let mesParaDataDeCriacao = dataAtual.getMonth()+1
				mesParaDataDeCriacao = mesParaDataDeCriacao.toString().padStart(2, '0')
				const anoParaDataDeCriacao = dataAtual.getFullYear()
				const dataDeCriacao = diaParaDataDeCriacao + '/' + mesParaDataDeCriacao + '/' + anoParaDataDeCriacao
				const elemento = {
					id: Date.now(),
					data_criacao: dataDeCriacao,
					data_inativacao: null,
				}
				switch(indiceDeValores){
					case 1: 
						elemento.categoria_id = 1
						elemento.valor = dizimoDinheiro
						break;
					case 2: 
						elemento.categoria_id = 2
						elemento.valor = dizimoDebito
						break;
					case 3: 
						elemento.categoria_id = 3
						elemento.valor = dizimoCredito
						break;
					case 4: 
						elemento.categoria_id = 4
						elemento.valor = dizimoMoeda
						break;
					case 5: 
						elemento.categoria_id = 5
						elemento.valor = ofertaDinheiro
						break;
					case 6: 
						elemento.categoria_id = 6
						elemento.valor = ofertaDebito
						break;
					case 7: 
						elemento.categoria_id = 7
						elemento.valor = ofertaCredito
						break;
					case 8: 
						elemento.categoria_id = 8
						elemento.valor = ofertaMoeda
						break;
					default:
						break;
				}
				if(elemento.valor !== '0.00'){
					elemento.taxa = '0.00'
					elemento.descricao = ''
					let diaData = dia.toString().padStart(2, '0')
					let mesData = mes.toString().padStart(2, '0')
					elemento.data = diaData + '/' + mesData + '/' + ano
					elemento.usuario_id = 1
					elemento.empresa_id = 1

					const elementoAssociativo = {
						id: Date.now(),
						data_criacao: dataDeCriacao,
						data_inativacao: null,
						situacao_id: 2, 
						lancamento_id: elemento.id,
						usuario_id: 1,
					}

					this.props.salvarLancamento(elemento, novoRegistro)
					this.props.salvarLancamentoSituacao(elementoAssociativo, novoRegistro)
				}
			}
			this.props.alterarTela('extratoAdministracao')
		}
	}

	render() {
		const {
			dia,
			mes,
			ano,
			mostrarMensagemDeErro,
			camposComErro
		} = this.state
		let arrayDias = []
		for(let indiceDia = 1; indiceDia <= 31; indiceDia++){
			arrayDias.push(<option key={indiceDia} value={indiceDia}>{indiceDia}</option>)
		}
		let arrayMes = []
		for(let indiceMes = 1; indiceMes <= 12; indiceMes++){
			arrayMes.push(<option key={indiceMes} value={indiceMes}>{indiceMes}</option>)
		}
		let arrayAnos = []
		const anoAtual = new Date().getFullYear()
		for(let indiceAno = 2019; indiceAno <= anoAtual; indiceAno++){
			arrayAnos.push(<option key={indiceAno} value={indiceAno}>{indiceAno}</option>)
		}

		return (
			<div>
				<Label for="data">Data do lançamento:</Label>
				<FormGroup>
					<Label for="dia">* Dia:</Label>
					<Input 
						type="select" 
						name="dia" 
						id="dia" 
						value={dia} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('dia') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							arrayDias.map(dia => dia)
						}
					</Input>
					{camposComErro.includes('dia') && <Alert color='danger'>Selecione o Dia</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="mes">* Mês:</Label>
					<Input 
						type="select" 
						name="mes" 
						id="mes" 
						value={mes} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('mes') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							arrayMes.map(mes => mes)
						}
					</Input>
					{camposComErro.includes('mes') && <Alert color='danger'>Selecione o Mês</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="ano">* Ano:</Label>
					<Input 
						type="select" 
						name="ano" 
						id="ano" 
						value={ano} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('ano') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							arrayAnos.map(ano => ano)
						}
					</Input>
					{camposComErro.includes('ano') && <Alert color='danger'>Selecione o Ano</Alert>}
				</FormGroup>

				<div style={{padding: 10, backgroundColor: 'lightcyan'}}>
					<Row>
						<Col>
							Dizimo
						</Col>
					</Row>
					<Row>
						<Col>
							Dinheiro
						</Col>
						<Col>
							<input
								type='number'
								name='dizimoDinheiro'
								value={this.state.dizimoDinheiro}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Cartão Débito
						</Col>
						<Col>
							<input
								type='number'
								name='dizimoDebito'
								value={this.state.dizimoDebito}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Cartão Crédito
						</Col>
						<Col>
							<input
								type='number'
								name='dizimoCredito'
								value={this.state.dizimoCredito}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Moeda
						</Col>
						<Col>
							<input
								type='number'
								name='dizimoMoeda'
								value={this.state.dizimoMoeda}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
				</div>
				<div style={{padding: 10, backgroundColor: 'lightblue'}}>
					<Row>
						<Col>
							Oferta
						</Col>
					</Row>
					<Row>
						<Col>
							Dinheiro
						</Col>
						<Col>
							<input
								type='number'
								name='ofertaDinheiro'
								value={this.state.ofertaDinheiro}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Cartão Débito
						</Col>
						<Col>
							<input
								type='number'
								name='ofertaDebito'
								value={this.state.ofertaDebito}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Cartão Crédito
						</Col>
						<Col>
							<input
								type='number'
								name='ofertaCredito'
								value={this.state.ofertaCredito}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							Moeda
						</Col>
						<Col>
							<input
								type='number'
								name='ofertaMoeda'
								value={this.state.ofertaMoeda}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
				</div>
				{
					mostrarMensagemDeErro &&
						<div style={{padding: 10}}>
							<Alert color='warning'>
								Campos inválidos
							</Alert>
						</div>
				}
				<div style={{padding: 10, backgroundColor: 'lightcyan'}}>
					<Row>
						<Col>
							<button 
								type='button' 
								style={{width: '100%'}}
								onClick={this.ajudadorDeSubmissao}>
								Salvar
							</button>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarLancamento: (elemento, novo) => dispatch(salvarLancamento(elemento, novo)),
		salvarLancamentoSituacao: (elemento, novo) => dispatch(salvarLancamentoSituacao(elemento, novo)),
	}
}

export default connect(null, mapDispatchToProps)(LancarVarios)
