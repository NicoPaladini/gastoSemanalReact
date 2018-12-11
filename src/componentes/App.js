import React, { Component } from 'react';
import '../css/App.css';
import Header from './Header';
import Formulario from './Formulario';
import Listado from './Listado';
import {validarPresupuesto} from './helper';
import ControlPresupuesto from './ControlPresupuesto';

class App extends Component {
    constructor(props){
      super(props);
        this.state = {
            presupuesto: '',
            restante: '',
            gastos: {}
          }
        }

        componentDidMount(){
          this.obtenerPresupuesto();
        }

        obtenerPresupuesto = () => {
          let presupuesto = prompt('Cual es el presupuesto?');  

          let resultado = validarPresupuesto(presupuesto);
          if (resultado) {
            this.setState({
              presupuesto: presupuesto,
              restante: presupuesto
            })
          }else{
            this.obtenerPresupuesto();
          }
        }


      

  //Agregar un nuevo gasto al state
  agregarGasto = gasto =>{

  
  //Tomar una copia del state actual
  const gastos = {...this.state.gastos};
  

  //Agregar el gasto al objeto del state. Con la funcion Date.now agregamos a los datos
  //el dato de la fecha exacta (Ej: gastos1544535752474) , es una forma de identificar el gasto en vez de colocar
  //un id a cada gasto. Para colocar id tendriamos que tener una base de datos
  //Se conoce como "timestamp"
  gastos[`gastos${Date.now()}`] = gasto;

  //Restar el presupuesto
  this.restarPresupuesto(gasto.cantidadGasto);

  //Ponerlo en el state
  this.setState({
    gastos: gastos
  })
}

//Restar del presupuesto cuando un gasto se crea

restarPresupuesto = cantidad => {
  //Leer el gasto. Como va a llegar un valor en formato string hay que convertirlo a numero
let restar = Number(cantidad);
//Tomamos una copia del state actual
let restante = this.state.restante
//Lo restamos
restante -= restar
//Agregamos un nuevo state
this.setState({restante})
}



  render() {
    return (
      <div className="App container">
        <Header 
          titulo='Gasto Semanal'
        />
        <div className="contenido-principal contenido">
          <div className="row">
            <div className="one-half column">
              <Formulario
                agregarGasto={this.agregarGasto}
                cantidadGasto={this.cantidadGasto}
              />
            </div>
            <div className="one-half column">
              <Listado
                gastos={this.state.gastos}
              />
              <ControlPresupuesto
                presupuesto={this.state.presupuesto}
                restante={this.state.restante}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
