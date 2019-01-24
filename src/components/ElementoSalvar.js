import React from 'react'
import { 
	FormGroup,
	Label,
	Input,
	Button,
	Form,
	Alert,
	Row,
	Col,
} from 'reactstrap'
import {
	STRING_LANCAMENTOS,
	STRING_CATEGORIAS,
	STRING_EMPRESAS,
	STRING_FORNECEDORES,
	STRING_CLIENTES,
	STRING_USUARIOS,
	ENTIDADE_TIPO_EMPRESA,
	ENTIDADE_TIPO_FORNECEDOR,
	ENTIDADE_TIPO_CLIENTE,
} from '../helpers/constantes'
import {
	salvarLancamento,
	salvarLancamentoSituacao,
	salvarEntidade,
	salvarCategoria,
	salvarUsuario,
} from '../actions'
import {connect} from 'react-redux'
import { formatReal, getMoney } from '../helpers/funcoes'
import { Formik } from 'formik'
import * as Yup from 'yup'

const InputKleo = (props) => {
	console.log(props)
	return (
		<FormGroup>
			<Label for={props.id}>{props.label}</Label>
			<Input 
				type={props.type} 
				name={props.id}
				id={props.id}
				value={props.value}
				onChange={props.handleChange}
				onBlur={props.handleBlur}
				invalid={props.errors && props.touched ? true : null}>
				{
					props.type === 'select' &&
					<option value='0'>Selecione</option>
				}
				{
					props.extra && 
					props.extra.map(item => <option	key={item.id} value={item.id}>{item.nome}</option>)
				}
			</Input>
			{props.errors && props.touched && <div className="label label-danger">{props.errors}</div>}
		</FormGroup>
	)
}


class ElementoSalvar extends React.Component {

	state = {
		nome: '',
		corDoBackGroundDoValor: '#fff',
		corDaFonteDoValor: '#000',
	}

	componentDidMount(){
		const { elemento } = this.props
		if(elemento){
			let objetoEstado = {}
			if(elemento.nome){
				objetoEstado.nome = elemento.nome
			}
			this.setState(objetoEstado)
		}
	}

	 escolherCorDoBackGround = creditoOuDebito => {
		let corBackGround = ''
		let corDaFonte = ''
		if (creditoOuDebito === 'C'){
			corBackGround = '#28a745'
			corDaFonte = '#fff'
		}
		if (creditoOuDebito === 'D'){
			corBackGround = '#dc3545'
			corDaFonte = '#fff'
		}
		return [corBackGround, corDaFonte]
	}

	render() {
		return (
			<div>
				{this.formulario(this.formularioLancamento())}
			</div>
		)
	}

	formularioLancamento = () => {
		return  {
			valoresIniciais: this.valoresIniciaisLancamento(),	
			ajudadorDeSubmit: (values) => this.ajudadorDeSubmitLancamento(values),
			validacao: this.validacaoLancamento(),
			renderizacao: (props) => this.renderizacaoLancamento(props),
		}
	}
	valoresIniciaisLancamento = () => ({
		categoria_id: 0,
		valor: '0,00',
		situacao_id: 0,
		dia: new Date().getDate(),
		mes: (new Date().getMonth() + 1),
		ano: new Date().getFullYear(),
		descricao: '',
	})

	ajudadorDeSubmitLancamento = (values) => {
		console.log(values)
	}

	validacaoLancamento = () => 
		Yup.object().shape({
			categoria_id: Yup.number().moreThan(0, 'Selecione uma categoria'),
			situacao_id: Yup.number().moreThan(0, 'Selecione se está pago'),
			dia: Yup.number().moreThan(0, 'Selecione o dia'),
			mes: Yup.number().moreThan(0, 'Selecione o mês'),
			ano: Yup.number().moreThan(0, 'Selecione o ano'),
		})

	renderizacaoLancamento = (props) => {
		const {
			values,
			touched,
			errors,
			dirty,
			isSubmitting,
			handleChange,
			handleBlur,
			handleSubmit,
			handleReset,
		} = props;
		const { categorias, situacoes } = this.props
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

		const camposFormularioLancamento = [
			{
				id: 'categoria_id',
				type: 'select',
				value: 0,
				extra: this.props.categorias,
				label: 'Categoria',
			}
		]

		return (
			<form onSubmit={handleSubmit}>
				<div>
					{
						camposFormularioLancamento.map(item => {
							let errorsInput = errors[item.id]
							return	<InputKleo key={item.id} {...item} handleChange={handleChange} handleBlur={handleBlur} errors={errorsInput} />
						})
					}
					<FormGroup>
						<Label for="valor">* Valor:</Label>
						<Input 
							type="text" 
							name="valor" 
							id="valor" 
							value={values.valor} 
							onChange={handleChange}
							onBlur={handleBlur}
							invalid={errors.valor && touched.valor ? true : null}
						/>
						{errors.valor && touched.valor && <div className="label label-danger">{errors.valor}</div>}
					</FormGroup>
					<FormGroup>
						<Label for="situacao_id">* Pago:</Label>
						<Input 
							type="select" 
							name="situacao_id" 
							id="situacao_id" 
							value={values.situacao_id} 
							onChange={handleChange}
							onBlur={handleBlur}
							invalid={errors.situacao_id && touched.situacao_id ? true : null}
						>
							<option value='0'>Selecione</option>
							{
								situacoes && 
								situacoes.map(
									situacao => 
									<option
										key={situacao.id}
										value={situacao.id}
									>
										{situacao.nome}
									</option>
								)
							}
						</Input>
					</FormGroup>
					<Label for="data">Data do lançamento:</Label>
					<FormGroup>
						<Label for="dia">* Dia:</Label>
						<Input 
							type="select" 
							name="dia" 
							id="dia" 
							value={values.dia} 
							onChange={handleChange}
							onBlur={handleBlur}
							invalid={errors.dia && touched.dia ? true : null}
						>
							<option value='0'>Selecione</option>
							{
								arrayDias.map(dia => dia)
							}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="mes">* Mês:</Label>
						<Input 
							type="select" 
							name="mes" 
							id="mes" 
							value={values.mes} 
							onChange={handleChange}
							onBlur={handleBlur}
							invalid={errors.mes && touched.mes ? true : null}
						>
							<option value='0'>Selecione</option>
							{
								arrayMes.map(mes => mes)
							}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="ano">* Ano:</Label>
						<Input 
							type="select" 
							name="ano" 
							id="ano" 
							value={values.ano} 
							onChange={handleChange}
							onBlur={handleBlur}
							invalid={errors.ano && touched.ano ? true : null}
						>
							<option value='0'>Selecione</option>
							{
								arrayAnos.map(ano => ano)
							}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="descricao">Descrição</Label>
						<Input 
							type="textarea" 
							name="descricao" 
							id="descricao" 
							value={values.descricao} 
							onChange={handleChange}
							onBlur={handleBlur}
							invalid={errors.values && touched.values ? true : null}
						>
						</Input>
					</FormGroup>
				</div>

				<label htmlFor="email" style={{ display: 'block' }}>
					Email
				</label>
				<input
					id="email"
					placeholder="Enter your email"
					type="text"
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					className={
						errors.email && touched.email ? 'text-input error' : 'text-input'
					}
				/>
				{errors.email &&
						touched.email && <div className="input-feedback">{errors.email}</div>}

						<button
							type="button"
							className="outline"
							onClick={handleReset}
							disabled={!dirty || isSubmitting}
						>
							Reset
						</button>
						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</form>
		);
	}

	formulario({valoresIniciais, ajudadorDeSubmit, validacao, renderizacao }){
		return (
			<Formik
				initialValues={valoresIniciais}
				onSubmit={values => ajudadorDeSubmit(values)}
				validationSchema={validacao}
			>
				{props => renderizacao(props)}
			</Formik>			
		)
	}


	atualizarCampo = (event) => {
		let valor = event.target.value
		const name = event.target.name
		if(name === 'valor'){
			const valorInteiro = getMoney(valor) + ''
			const valorComZerosAEsquerda = valorInteiro.padStart(3, '0')
			valor = formatReal(valorComZerosAEsquerda)
		}
		if(name === 'categoria_id'){
			let novaCorDoBackGround = '#fff'
			let novaCorDaFonte = '#000'
			if(parseInt(valor) !== 0){
				const {categorias} = this.props
				const categoria = categorias.find(categoria => categoria.id === parseInt(valor))
				const resultado = this.escolherCorDoBackGround(categoria.credito_debito)
				novaCorDoBackGround = resultado[0]
				novaCorDaFonte = resultado[1]
			}
			this.setState({
				corDoBackGroundDoValor: novaCorDoBackGround,
				corDaFonteDoValor: novaCorDaFonte
			})
		}
		this.setState({[name]: valor})
	}

	ajudadorDeSubmit(){
		const {
			tipo,
			esconderSalvar,
			salvarLancamento,
			salvarLancamentoSituacao,
			salvarCategoria,
			salvarEntidade,
			salvarUsuario,
		} = this.props
		let { elemento } = this.props
		let elementoAssociativo = {}
		let novoRegistro = false
		let mensagemDeErro = false

		if(tipo === STRING_LANCAMENTOS){
			const {
				categoria_id,
				valor,
				situacao_id,
				dia,
				mes,
				ano,
			} = this.state

			if(parseInt(categoria_id) === 0){
				mensagemDeErro = true
				this.setState({categoriaValidade: true})
			}
			if(parseInt(situacao_id) === 0){
				mensagemDeErro = true
				this.setState({situacaoValidade: true})
			}
			if(valor === '0,00'){
				mensagemDeErro = true
				this.setState({valorValidade: true})
			}
			if(parseInt(dia) === 0){
				mensagemDeErro = true
				this.setState({diaValidade: true})
			}
			if(parseInt(mes) === 0){
				mensagemDeErro = true
				this.setState({mesValidade: true})
			}
			if(parseInt(ano) === 0){
				mensagemDeErro = true
				this.setState({anoValidade: true})
			}
		}

		if(!mensagemDeErro){
			if(elemento){
				if(elemento.nome){
					elemento.nome = this.state.nome
				}
			}else{
				/* criando */
				novoRegistro = true
				let dataAtual = new Date()
				let dia = dataAtual.getDate() + ''
				let mes = dataAtual.getMonth()+1 + ''
				dia = dia.padStart(2, '0')
				mes = mes.padStart(2, '0')
				elemento = {
					id: Date.now(),
					data_criacao: dia + '/' + mes + '/' + dataAtual.getFullYear(),
					data_inativacao: null,
				}

				if(this.state.nome){
					elemento.nome = this.state.nome
				}

				if(tipo === STRING_EMPRESAS){
					elemento.entidade_tipo_id = ENTIDADE_TIPO_EMPRESA
				}
				if(tipo === STRING_FORNECEDORES){
					elemento.entidade_tipo_id = ENTIDADE_TIPO_FORNECEDOR
				}
				if(tipo === STRING_CLIENTES){
					elemento.entidade_tipo_id = ENTIDADE_TIPO_CLIENTE
				}
				if(tipo === STRING_LANCAMENTOS){
					elemento.categoria_id = parseInt(this.state.categoria_id)
					elemento.valor = this.state.valor
					elemento.descricao = this.state.descricao
					let diaData = this.state.dia + ''
					diaData = diaData.padStart(2, '0')
					let mesData = this.state.mes + ''
					mesData = mesData.padStart(2, '0')
					elemento.data = diaData + '/' + mesData + '/' + this.state.ano

					elementoAssociativo = {
						id: Date.now(),
						data_criacao: dia + '/' + mes + '/' + dataAtual.getFullYear(),
						data_inativacao: null,
						situacao_id: parseInt(this.state.situacao_id),
						lancamento_id: elemento.id,
					}
					salvarLancamentoSituacao(elementoAssociativo, novoRegistro)
				}

			}

			let funcaoSalvar = null
			if(tipo === STRING_CATEGORIAS){
				funcaoSalvar = salvarCategoria
			}
			if(tipo === STRING_EMPRESAS || tipo === STRING_FORNECEDORES || tipo === STRING_CLIENTES){
				funcaoSalvar = salvarEntidade
			}
			if(tipo === STRING_USUARIOS){
				funcaoSalvar = salvarUsuario
			}
			if(tipo === STRING_LANCAMENTOS){
				funcaoSalvar = salvarLancamento
			}
			if(funcaoSalvar){
				funcaoSalvar(elemento, novoRegistro)
				esconderSalvar()
			}
		}else{
			this.setState({mostrarMensagemDeError: true})
		}
	}
}

function mapStateToProps({ categorias, situacoes }){
	return {
		categorias,
		situacoes,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarLancamento: (elemento, novo) => dispatch(salvarLancamento(elemento, novo)),
		salvarLancamentoSituacao: (elemento, novo) => dispatch(salvarLancamentoSituacao(elemento, novo)),
		salvarCategoria: (elemento, novo) => dispatch(salvarCategoria(elemento, novo)),
		salvarEntidade: (elemento, novo) => dispatch(salvarEntidade(elemento, novo)),
		salvarUsuario: (elemento, novo) => dispatch(salvarUsuario(elemento, novo)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ElementoSalvar)
