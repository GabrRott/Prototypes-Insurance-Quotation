//Constructors
function Seguro(marca, year, tipo){
    this.marca=marca;
    this.year=year;
    this.tipo=tipo;
}

//Realiza la cotización con los datos
Seguro.prototype.cotizarSeguro = function(){  
    /*
        1= Americano 1.15
        2 = Asiático 1.05
        3 = Europeo 1.35
    */
   let cantidad;
   const base = 2000;
    switch(this.marca){
        case '1':
            cantidad = base*1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35
            break;
        
        default:
            break;

    }
    //read year
    const diferencia = new Date().getFullYear() - this.year;
    
    //3% off for every passed year 
    cantidad -= ((diferencia*3)*cantidad)/100;

    /*
    Si el seguro es básico se multiplica por un 30% más
    si el seguro es completo se multiplica por un 50% más
    */
    if(this.tipo==='basico'){
        cantidad *=1.30;
    }else {
        cantidad *=1.50;
    }

    return cantidad;
}

function UI(){}

//Show year list

UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear(),
        min = max - 20

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// Show message alert
UI.prototype.showMessage = (mensaje, tipo) => {
    const div= document.createElement('div');
    if(tipo==='error'){
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //insert in HTML
    const form = document.querySelector('#cotizar-seguro');
    form.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(()=>{
        div.remove();
    }, 3000);
}
UI.prototype.showResult = (total, seguro) =>{
    //create result
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Total: ${total}</p>
    `;
    const resutladoDiv = document.querySelector('#resultado');
    resutladoDiv.appendChild(div);
}

// instanciar UI
const ui = new UI();
console.log(ui);

document.addEventListener('DOMContentLoaded', () =>{
    ui.llenarOpciones(); //show year list
})

addEventListener();
function addEventListener(){
    const form = document.querySelector('#cotizar-seguro');
    form.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    //read selected marca 
    const marca = document.querySelector('#marca').value;
     
    //read selected year
    const year = document.querySelector('#year').value;

    //read "tipo de cobertura" type of insurance
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    if ( marca ==='' || year ===''||tipo ===''){
         ui.showMessage('Todos los campos son obligatorios', 'error');
         return;
    }
    ui.showMessage('cotizando...', 'éxito')

    //Instance of insurance
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    //Utilizar protorype para realizar la cotización
    ui.showResult(total, seguro);

}