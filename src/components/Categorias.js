import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'

class Categorias extends React.Component {

	render() {
		const { 
			categorias, 
		} = this.props
		return (
			<div>
				{
					categorias.map(categoria => {
						return (
							<div key={categoria.id} style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
								<Row>
									<Col>
										Id
									</Col>
									<Col>
										{categoria.id.toString().padStart(8,0)}
									</Col>
								</Row>
								<Row>
									<Col>
										Data
									</Col>
									<Col>
										{categoria.data_criacao}
									</Col>
								</Row>
								<Row>
									<Col>
										Nome
									</Col>
									<Col>
										{categoria.nome}
									</Col>
								</Row>
								<Row>
									<Col>
										Credito/Debito
									</Col>
									<Col>
										{categoria.credito_debito === 'C' ? 'Credito' : 'Debito'}
									</Col>
								</Row>
								<Row style={{padding: 5}}>
									<Col>
										<button type='button' style={{width: '100%'}} >Alterar</button> 
									</Col>
								</Row>
							</div>
						)
					})
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

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Categorias)
