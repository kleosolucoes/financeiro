import React from 'react'
import { connect } from 'react-redux'
import Empresa from './Empresa'
import EmpresaSalvar from './EmpresaSalvar'
import {
	Row,
	Button,
	Table
} from 'reactstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus)

class Empresas extends React.Component {

	state = { 
		mostrarSalvarEmpresa: false,
	}

	alternarMostrarSalvarEmpresa = () => this.setState({mostrarSalvarEmpresa:
		!this.state.mostrarSalvarEmpresa})

	render() { 
		const { 
			empresas, 
		} = this.props

		return ( 
			<div style={{marginTop: 80}}> 
				{
					this.state.mostrarSalvarEmpresa && 
						<EmpresaSalvar
							alternarMostrarSalvarEmpresa={this.alternarMostrarSalvarEmpresa} /> 
				}
				{
					!this.state.mostrarSalvarEmpresa && 
						<div> 
							<Row style={{justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
								<h5 style={{margin: 0}}>Empresas</h5>
								<div>
									<Row style={{justifyContent: 'flex-end', padding: 10}}>
										<Button 
											type='button' 
											className="botao-lancar"
											onClick={this.alternarMostrarSalvarEmpresa}
										>
											<FontAwesomeIcon icon="user-plus" size="sm" style={{marginRight: 5}} />
											Adicionar
										</Button>
									</Row>
								</div>
							</Row>
							
							{
								empresas.map(empresa => (
									<div key={empresa.id} style={{backgroundColor: '#f9f7f7', marginTop: 10}}>
										<Empresa 
											key={empresa._id}
											empresa_id={empresa._id}
										/>
									</div>
								))
							}
						</div>
				}
			</div>
		)
	}
}

const mapStateToProps = ({empresas}) => {
	return {
		empresas, 
	}
}

export default connect(mapStateToProps, null)(Empresas)
