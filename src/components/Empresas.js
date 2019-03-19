import React from 'react'
import { connect } from 'react-redux'
import Empresa from './Empresa'
import EmpresaSalvar from './EmpresaSalvar'
import { CabecalhoBotao } from './Cabecalho';

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
			<div style={{marginTop: 70, marginBottom: 20}}> 
				{
					this.state.mostrarSalvarEmpresa && 
						<EmpresaSalvar
							alternarMostrarSalvarEmpresa={this.alternarMostrarSalvarEmpresa} /> 
				}
				{
					!this.state.mostrarSalvarEmpresa && 
						<div> 
							<CabecalhoBotao 
								nomePagina = "Empresas"
								acaoOnClick = {this.alternarMostrarSalvarEmpresa}
							/>
							
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
