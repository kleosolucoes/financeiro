import React from "react";
import { Row, Button } from "reactstrap";
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


