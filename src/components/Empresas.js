import React from 'react'
import { connect } from 'react-redux'
import Empresa from './Empresa'
import EmpresaSalvar from './EmpresaSalvar'
import {
	Row,
	Col,
} from 'reactstrap'

class Empresas extends React.Component {

	state = { mostrarSalvarEmpresa: false, }

	alternarMostrarSalvarEmpresa = () => this.setState({mostrarSalvarEmpresa:
		!this.state.mostrarSalvarEmpresa})

	render() { 
		const { 
			empresas, 
		} = this.props

		return ( 
			<div> 
				{
					this.state.mostrarSalvarEmpresa && 
						<EmpresaSalvar
							alternarMostrarSalvarEmpresa={this.alternarMostrarSalvarEmpresa} /> 
				}
				{
					!this.state.mostrarSalvarEmpresa && 
						<div> 
							<div style={{padding: 10, backgroundColor: 'lightblue'}}>
								<Row> 
									<Col>
										<button 
											type='button' 
											style={{width: '100%'}}
											onClick={this.alternarMostrarSalvarEmpresa}
										>
											Adicionar Empresa
										</button>
									</Col>
								</Row>
							</div>
							{
								empresas.map(empresa => (
									<div key={empresa.id} style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
										<Empresa 
											key={empresa.id}
											empresa_id={empresa.id}
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

const mapStateToProps = state => {
	return {
		empresas: state.empresas,
	}
}

export default connect(mapStateToProps, null)(Empresas)
