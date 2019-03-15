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
import { formatReal, getMoney, } from '../helpers/funcoes'
import { lancarVariosNaApi } from '../actions'
import {
	CATEGORIA_DIZIMO_DINHEIRO,
	CATEGORIA_DIZIMO_DEBITO,
	CATEGORIA_DIZIMO_CREDITO,
	CATEGORIA_DIZIMO_MOEDA,
	CATEGORIA_OFERTA_DINHEIRO,
	CATEGORIA_OFERTA_DEBITO,
	CATEGORIA_OFERTA_CREDITO,
	CATEGORIA_OFERTA_MOEDA,
	CATEGORIA_OFERTA_ESPECIAL_DINHEIRO,
	CATEGORIA_OFERTA_ESPECIAL_DEBITO,
	CATEGORIA_OFERTA_ESPECIAL_CREDITO,
	CATEGORIA_OFERTA_ESPECIAL_MOEDA,
	CATEGORIA_OFERTA_INSTITUTO_DE_VENCEDORES,
} from '../helpers/constantes'

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
		ofertaEspecialDinheiro: '0.00',
		ofertaEspecialDebito: '0.00',
		ofertaEspecialCredito: '0.00',
		ofertaEspecialMoeda: '0.00',
		ofertaInstitutoDeVencedores: '0.00',
		mostrarMensagemDeErro: false,
		camposComErro: [],
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name

		const valorLimpo = getMoney(valor)
		if(name !== 'dia' && name !== 'mes' && name !== 'ano'){
			valor = formatReal(valorLimpo.toString().padStart(3, '0'))
		}

		this.setState({
			[name]: valor,
		})
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
			ofertaEspecialDinheiro,
			ofertaEspecialDebito,
			ofertaEspecialCredito,
			ofertaEspecialMoeda,
			ofertaInstitutoDeVencedores,
			dia,
			mes,
			ano,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		const {
			usuarioLogado,
			lancarVariosNaApi,
		} = this.props
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

			let elementos = []
			for(let indiceDeValores = 1; indiceDeValores <= 13; indiceDeValores++){
				const elemento = {}
				switch(indiceDeValores){
					case 1: 
						elemento.valor = dizimoDinheiro
						elemento.categoria_id = CATEGORIA_DIZIMO_DINHEIRO
						break;
					case 2: 
						elemento.valor = dizimoDebito
						elemento.categoria_id = CATEGORIA_DIZIMO_DEBITO
						break;
					case 3: 
						elemento.valor = dizimoCredito
						elemento.categoria_id = CATEGORIA_DIZIMO_CREDITO
						break;
					case 4: 
						elemento.valor = dizimoMoeda
						elemento.categoria_id = CATEGORIA_DIZIMO_MOEDA
						break;
					case 5: 
						elemento.valor = ofertaDinheiro
						elemento.categoria_id = CATEGORIA_OFERTA_DINHEIRO
						break;
					case 6: 
						elemento.valor = ofertaDebito
						elemento.categoria_id = CATEGORIA_OFERTA_DEBITO
						break;
					case 7: 
						elemento.valor = ofertaCredito
						elemento.categoria_id = CATEGORIA_OFERTA_CREDITO
						break;
					case 8: 
						elemento.valor = ofertaMoeda
						elemento.categoria_id = CATEGORIA_OFERTA_MOEDA
						break;
					case 9: 
						elemento.valor = ofertaEspecialDinheiro
						elemento.categoria_id = CATEGORIA_OFERTA_ESPECIAL_DINHEIRO
						break;
					case 10: 
						elemento.valor = ofertaEspecialDebito
						elemento.categoria_id = CATEGORIA_OFERTA_ESPECIAL_DEBITO
						break;
					case 11: 
						elemento.valor = ofertaEspecialCredito
						elemento.categoria_id = CATEGORIA_OFERTA_ESPECIAL_CREDITO
						break;
					case 12: 
						elemento.valor = ofertaEspecialMoeda
						elemento.categoria_id = CATEGORIA_OFERTA_ESPECIAL_MOEDA
						break;
					case 13: 
						elemento.valor = ofertaInstitutoDeVencedores
						elemento.categoria_id = CATEGORIA_OFERTA_INSTITUTO_DE_VENCEDORES
						break;
					default:
						break;
				}
				if(elemento.valor !== '0.00'){
					elemento.taxa = '0.00'
					elemento.descricao = ''
					elemento.dia = dia
					elemento.mes = mes
					elemento.ano = ano
					elemento.usuario_id = usuarioLogado.usuario_id
					elemento.empresa_id = usuarioLogado.empresa_id
					elementos.push(elemento)
				}
			}
			lancarVariosNaApi(elementos, usuarioLogado.token)
			alert('Lancamento(s) Salvo(s) com sucesso!')
			this.props.alterarTela('extratoEmpresa')
		}
	}

	render() {
		const {
			dizimoDinheiro,
			dizimoDebito,
			dizimoCredito,
			dizimoMoeda,
			ofertaDinheiro,
			ofertaDebito,
			ofertaCredito,
			ofertaMoeda,
			ofertaEspecialDinheiro,
			ofertaEspecialDebito,
			ofertaEspecialCredito,
			ofertaEspecialMoeda,
			ofertaInstitutoDeVencedores,
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

		const total = formatReal( 
			(getMoney(dizimoDinheiro) +
				getMoney(dizimoDebito) +
				getMoney(dizimoCredito) +
				getMoney(dizimoMoeda) +
				getMoney(ofertaDinheiro) +
				getMoney(ofertaDebito) +
				getMoney(ofertaCredito) +
				getMoney(ofertaMoeda) +
				getMoney(ofertaEspecialDinheiro) +
				getMoney(ofertaEspecialDebito) +
				getMoney(ofertaEspecialCredito) +
				getMoney(ofertaInstitutoDeVencedores) +
				getMoney(ofertaEspecialMoeda))
			.toString()
			.padStart(3, '0')
		)
	
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
								value={dizimoDinheiro}
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
								value={dizimoDebito}
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
								value={dizimoCredito}
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
								value={dizimoMoeda}
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
								value={ofertaDinheiro}
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
								value={ofertaDebito}
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
								value={ofertaCredito}
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
								value={ofertaMoeda}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
				</div>
				<div style={{padding: 10, backgroundColor: 'lightblue'}}>
					<Row>
						<Col>
							Oferta Especial
						</Col>
					</Row>
					<Row>
						<Col>
							Dinheiro
						</Col>
						<Col>
							<input
								type='number'
								name='ofertaEspecialDinheiro'
								value={ofertaEspecialDinheiro}
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
								name='ofertaEspecialDebito'
								value={ofertaEspecialDebito}
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
								name='ofertaEspecialCredito'
								value={ofertaEspecialCredito}
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
								name='ofertaEspecialMoeda'
								value={ofertaEspecialMoeda}
								onChange={this.ajudadorDeCampo}
							/>
						</Col>
					</Row>
				</div>
				<div>
					<Row>
						<Col>
							Oferta Instituto de Vencedores
						</Col>
						<Col>
							<input
								type='number'
								name='ofertaInstitutoDeVencedores'
								value={ofertaInstitutoDeVencedores}
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
					<Row style={{color:'white', backgroundColor:'black'}}>
						<Col>
							Total
						</Col>
						<Col>
							{total}
						</Col>
					</Row>
	
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

function mapStateToProps({usuarioLogado, categorias}){
	return {
		usuarioLogado,
		categorias,
	}
}

function mapDispatchToProps(dispatch){
	return {
		lancarVariosNaApi: (elementos, token) => dispatch(lancarVariosNaApi(elementos, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LancarVarios)
