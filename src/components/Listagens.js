import React from 'react'
import ElementoListagem from './ElementoListagem'
import ElementoSalvar from './ElementoSalvar'
import {connect} from 'react-redux'
import { 
	ListGroup, 
	Button,
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

class Listagens extends React.Component {

	componentDidMount(){
		const { tipo } = this.props
		this.setState({
			tela: tipo,	
		})
	}

	state = {
		mostrarSalvar: false,
		elemento: null,
		tela: null,
	}

	mostrarSalvar = (elemento) => this.setState({mostrarSalvar: true, elemento})
	esconderSalvar = () => this.setState({mostrarSalvar: false, elemento: null})

	render() {
		const { elementos, tipo } = this.props
		const { mostrarSalvar, elemento } = this.state

		if(this.state.tela !== tipo){
			this.setState({
				tela: tipo,
				mostrarSalvar: false,
			})
		}

		return (
			<div>
				{
					mostrarSalvar &&
						<ElementoSalvar
							esconderSalvar={this.esconderSalvar}
							elemento={elemento}
							tipo={tipo}
						/>
				}
				{
					!mostrarSalvar &&
						<div>
							<Button	onClick={() => {this.mostrarSalvar(null)}}>
								Cadastrar
							</Button>
							<ListGroup>
								{
									elementos &&
										elementos.map((elemento, indice) => 
											<ElementoListagem 
												key={indice}
												elemento={elemento}
												tipo={tipo}
												mostrarSalvar={this.mostrarSalvar}
											/>
										)
								}
							</ListGroup>
						</div>
				}
			</div>
		)
	}
}

const mapStateToProps = (state, { tipo }) => {
	let elementos = null
	if(tipo === STRING_LANCAMENTOS){
		elementos = state.lancamentos && state.lancamentos.filter(elemento => elemento.data_inativacao === null)
	}
	if(tipo === STRING_CATEGORIAS){
		elementos = state.categorias && state.categorias.filter(elemento => elemento.data_inativacao === null)
	}
	if(tipo === STRING_EMPRESAS){
		elementos = state.entidades && state.entidades.filter(entidade => entidade.entidade_tipo_id === ENTIDADE_TIPO_EMPRESA && entidade.data_inativacao === null)
	}
	if(tipo === STRING_FORNECEDORES){
		elementos = state.entidades && state.entidades.filter(entidade => entidade.entidade_tipo_id === ENTIDADE_TIPO_FORNECEDOR && entidade.data_inativacao === null)
	}
	if(tipo === STRING_CLIENTES){
		elementos = state.entidades && state.entidades.filter(entidade => entidade.entidade_tipo_id === ENTIDADE_TIPO_CLIENTE && entidade.data_inativacao === null)
	}
	if(tipo === STRING_USUARIOS){
		elementos = state.usuarios && state.usuarios.filter(elemento => elemento.data_inativacao === null)
	}
	return {
		elementos,
	}
}

export default connect(mapStateToProps, null)(Listagens)
