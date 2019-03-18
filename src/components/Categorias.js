import React from 'react'
import {
	Row,
	Button,
	Table
} from 'reactstrap'
import { connect } from 'react-redux'
import { salvarCategoria } from '../actions'
import CategoriaSalvar from './CategoriaSalvar'
import { STRING_DEBITO, STRING_CREDITO, } from '../helpers/constantes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faCreditCard, faListUl } from '@fortawesome/free-solid-svg-icons';
import Responsive from 'react-responsive';
library.add(faCalendarDay)
library.add(faCreditCard)
library.add(faListUl)

class Categorias extends React.Component {

	state = {
		mostrarAdicionar: false,
	}

	alternarMostrarAdicionar = () => this.setState({
		mostrarAdicionar: !this.state.mostrarAdicionar,
	})

	render() {
		const { 
			categorias, 
		} = this.props
		const {
			mostrarAdicionar,
		} = this.state
		const Desktop = props => <Responsive {...props} minWidth={992} />;
		return (
			<div style={{marginTop: 80}}>
			
				{
					mostrarAdicionar &&
						<CategoriaSalvar
							alternarMostrarAdicionar={this.alternarMostrarAdicionar}
						/>
				}
				{
					!mostrarAdicionar && 
					<div>
						<Row style={{justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
							<h5 style={{margin: 0}}>Categorias</h5>
							<div>
								<Row style={{justifyContent: 'flex-end', padding: 10}}>
									<Button 
										type='button' 
										className="botao-lancar"
										onClick={this.alternarMostrarAdicionar}
									>
										<FontAwesomeIcon icon="user-plus" size="sm" style={{marginRight: 5}} />
										Adicionar
									</Button>
								</Row>
							</div>
						</Row>
						<Table style={{textAlign: 'center'}}>
							<thead style={{background: '#7CC9BC', color: '#fff'}}>
								<tr>
									<Desktop><th>Data Criação</th></Desktop>
									<th>Nome</th>
									<th>Crédito/Débito</th>
								</tr>
							</thead>
						{
							categorias.map(categoria => {
								
								return (
									<tbody>
										<tr>
											<Desktop><th>{categoria.data_criacao}</th></Desktop>
											<td>{categoria.nome}</td>
											<td>{categoria.credito_debito === 'C' ? STRING_CREDITO : STRING_DEBITO}</td>
										</tr>
									</tbody>
								)
							})
						}
						</Table>

					</div>
				}
			</div>
		)
	}

}

const mapStateToProps = state => {
	return {
		categorias: state.categorias,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarCategoria: (elemento, novo) => dispatch(salvarCategoria(elemento, novo)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Categorias)
