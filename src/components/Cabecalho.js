import React from "react";
import { 
  Row,
	Col,
	Card,
	CardTitle,
	CardText,
	Button,
 } from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus)

export const Cabecalho = ({ nomePagina }) => (
  <Row
    style={{justifyContent: "space-between", alignItems: "center", padding: 10, marginBottom: 5}}
  >
    <h5 style={{ margin: 0 }}>{nomePagina}</h5>
  </Row>
);

export const CabecalhoBotao = ({ nomePagina, acaoOnClick }) => (
    <Row 
    style={{justifyContent: 'space-between', alignItems: 'center', padding: 10, marginBottom: 5}}>
    <h5 style={{ margin: 0 }}>{nomePagina}</h5>
    <div>
        <Row style={{justifyContent: 'flex-end', padding: 10}}>
            <Button 
                type='button' 
                className="botao-lancar"
                onClick={acaoOnClick}
            >
                <FontAwesomeIcon icon="user-plus" size="sm" style={{marginRight: 5}} />
                Adicionar
            </Button>
        </Row>
    </div>
</Row>
);

export const CabecalhoExtrato = ({ nomeUsuario, onClick, saldo, naoRecebidoCredito, naoRecebidoDebito }) => (
  <div style={{background: '#f9f7f7'}}>
					<Row style={{justifyContent: 'center', margin: 0}}>
						<Col> 
							<h5 style={{padding: 10, fontWeight: '300', color: '#2f8c7c'}}>Olá, {nomeUsuario}!</h5>
						</Col>
							<Button 
								onClick={onClick}
								style={{height: 40, width: 40, background: "#2f8c7c", margin: 5}}
							>
								<FontAwesomeIcon icon="sync-alt" size="sm" />
							</Button>
					</Row>

					<Row style={{justifyContent: 'center', paddingBottom: 8, margin: 0}}>

            <Col sm="12" lg="4">
							<Card className="card-saldo">
								<CardTitle> 
                  { saldo >= 0 &&	
                    <span style={{color: '#2f8c7c'}}> R$ {saldo}</span>
                  }
                  { saldo < 0 &&	
                    <span style={{color: 'brown'}}> R$ {saldo}</span>
                  }
								</CardTitle>
								<CardText style={{fontSize: 12}}>Saldo</CardText>
							</Card> 
						</Col>

						<Col sm="12" lg="4">
							<Card className="card-saldo">
								<CardTitle style={{color: 'gray'}}>R$ {naoRecebidoCredito}</CardTitle>
								<CardText style={{fontSize: 12}}>Não Aceitos - Creditos</CardText>
							</Card>
						</Col>

						<Col sm="12" lg="4">
							<Card className="card-saldo">
								<CardTitle style={{color: 'brown'}}>R$ {naoRecebidoDebito}</CardTitle>
								<CardText style={{fontSize: 12}}>Não Aceitos - Debitos</CardText>
							</Card>
						</Col>
					</Row>
				</div>	
);


