import React from 'react'
import {
	Row,
	Col,
	Alert,
	Label,
	FormGroup,
	Input,
} from 'reactstrap'
import { connect } from 'react-redux'
import { formatReal, getMoney, pegarDataEHoraAtual } from '../helpers/funcoes'
import { salvarLancamento, salvarLancamentoSituacao } from '../actions'
import { SITUACAO_NAO_RECEBIDO } from '../helpers/constantes'

class LancarUm extends React.Component {

	state = {
		dia: new Date().getDate(),
		mes: (new Date().getMonth() + 1),
		ano: new Date().getFullYear(),
		descricao: '',
		categoria_id: 0,
		empresa_id: 0,
		valor: '0.00',
		taxa: '0.00',
		mostrarMensagemDeErro: false,
		camposComErro: [],
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name

		if(name === 'valor' || name === 'taxa'){
			const valorInteiro = getMoney(valor) + ''
			const valorComZerosAEsquerda = valorInteiro.padStart(3, '0')
			valor = formatReal(valorComZerosAEsquerda)
		}
		this.setState({[name]: valor})
	}

	ajudadorDeSubmissao = () => {
		const {
			categoria_id,
			empresa_id,
			valor,
			taxa,
			dia,
			mes,
			ano,
			descricao,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		camposComErro = []

		mostrarMensagemDeErro = false
		if(parseInt(categoria_id) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('categoria_id')
		}
		if(parseInt(empresa_id) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('empresa_id')
		}
		if(valor === '0.00'){
			mostrarMensagemDeErro = true
			camposComErro.push('valor')
		}
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

			const novoRegistro = true
			const elemento = {
				id: Date.now(),
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				data_inativacao: null,
				hora_inativacao: null,
			}

			elemento.categoria_id = parseInt(categoria_id)
			elemento.valor = valor
			elemento.taxa = taxa
			elemento.descricao = descricao
			const diaData = dia.toString().padStart(2, '0')
			const mesData = mes.toString().padStart(2, '0')
			elemento.data = diaData + '/' + mesData + '/' + ano
			elemento.usuario_id = this.props.usuario_id
			elemento.empresa_id = parseInt(empresa_id)

			const elementoAssociativo = {
				id: Date.now(),
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				data_inativacao: null,
				hora_inativacao: null,
				situacao_id: SITUACAO_NAO_RECEBIDO,
				lancamento_id: elemento.id,
				usuario_id: this.props.usuario_id,
			}

			this.props.salvarLancamento(elemento, novoRegistro)
			this.props.salvarLancamentoSituacao(elementoAssociativo, novoRegistro)
			this.props.alterarTela('extratoAdministracao')
			alert('Lançamento Salvo com sucesso!')
		}
	}

	render() {
		const {
			categorias,
			empresas,
		} = this.props
		const {
			mostrarMensagemDeErro,
			camposComErro,
			dia,
			mes,
			ano,
			descricao,
			valor,
			taxa,
			categoria_id,
			empresa_id,
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
			<div style={{padding: 10, backgroundColor: 'lightcyan'}}>
				<FormGroup>
					<Label for="empresa_id">Empresa</Label>
					<Input 
						type="select" 
						name="empresa_id" 
						id="empresa_id" 
						value={empresa_id} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('empresa_id') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							empresas &&
								empresas.map(empresa => {
									return (
										<option 
											key={empresa.id}
											value={empresa.id}
										>
											{empresa.nome}
										</option>
									)
								})
						}
					</Input>
					{camposComErro.includes('empresa_id') && <Alert color='danger'>Selecione a Empresa</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="categoria_id">Categoria</Label>
					<Input 
						type="select" 
						name="categoria_id" 
						id="categoria_id" 
						value={categoria_id} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('categoria_id') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							categorias &&
								categorias.map(categoria => {
									return (
										<option 
											key={categoria.id}
											value={categoria.id}
										>
											{categoria.nome}
										</option>
									)
								})
						}
					</Input>
					{camposComErro.includes('categoria_id') && <Alert color='danger'>Selecione a Categoria</Alert>}
				</FormGroup>

				<FormGroup>
					<Label for="valor">Valor</Label>
					<Input 
						type="number" 
						name="valor" 
						id="valor" 
						value={valor} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('valor') ? true : null}
					>
					</Input>
					{camposComErro.includes('valor') && <Alert color='danger'>Preencha o Valor</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="taxa">Taxa</Label>
					<Input 
						type="number" 
						name="taxa" 
						id="taxa" 
						value={taxa} 
						onChange={this.ajudadorDeCampo}
					>
					</Input>
				</FormGroup>
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
				<FormGroup>
					<Label for="descricao">Descrição</Label>
					<Input 
						type="textarea" 
						name="descricao" 
						id="descricao" 
						value={descricao} 
						onChange={this.ajudadorDeCampo}
					>
					</Input>
				</FormGroup>
				{
					mostrarMensagemDeErro &&
						<div style={{padding: 10}}>
							<Alert color='warning'>
								Campos inválidos
							</Alert>
						</div>
				}
				<div style={{padding: 10, backgroundColor: 'lightblue'}}>
					<Row>
						<Col>
							<button 
								type='button' 
								style={{width: '100%'}}
								onClick={this.ajudadorDeSubmissao}
							>
								Salvar
							</button>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		categorias: state.categorias,
		empresas: state.empresas,
		usuario_id: state.usuarioLogado.usuario_id,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarLancamento: (elemento, novo) => dispatch(salvarLancamento(elemento, novo)),
		salvarLancamentoSituacao: (elemento, novo) => dispatch(salvarLancamentoSituacao(elemento, novo)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LancarUm)
