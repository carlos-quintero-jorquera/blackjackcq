
let deck=[]
const tipos=['C','D','H','S']
const especial = ['A','J','Q','K']
let puntosJugador=0,
    puntosLocal=0;
const puntosHtml = document.querySelectorAll('small');


//referencias
const divCartaInv = document.querySelector('#invitado');
const divCartaLocal = document.querySelector('#local');
const btnped = document.querySelector("#btnped");
const btnnp = document.querySelector("#btnnp");


const crearDeck = () => {

    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo)
        }
    }
    for(let tipo of tipos){
        for(let esp of especial){
            deck.push(esp + tipo)
        }
    }
    // console.log(deck);
    deck=_.shuffle(deck);
}
crearDeck();

//pedir carta


const pedirCarta=()=>{
    if(deck.length===0){
        throw'no hay mas cartas'
    }
    const carta = deck.pop();
    // console.log(carta)
    return carta;
}
//for(let i=0;i<=100;i++){ pedirCarta();}
const valorCarta = (carta) =>{

    const valor = carta.substring(0, carta.length -1);

    // console.log(valor);
    // console.log(puntosJugador);

    return( (isNaN(valor)) ? 
    ( (valor === 'A') ? ( 11 ) : (10) ) 
    : 
    (valor * 1))

    // let puntos = 0;
    // if( isNaN(valor) ){
    //     puntos = (valor==='A') ? 11 : 10;
    // }
    // else{
    //     puntos=valor*1;
    // }
    // console.log(puntos);
}
//turno local
const turnoLocal = (puntosMinimos)=>{

   do{ const carta= pedirCarta();
    puntosLocal = puntosLocal + valorCarta(carta);
    puntosHtml[1].innerText = puntosLocal

    const imgcarta = document.createElement('img');
    imgcarta.src = `./cartas/${ carta}.png`;
    imgcarta.className= "cartas";
    divCartaLocal.append(imgcarta);
    if(puntosMinimos>21){
        break;
    }
   }while((puntosLocal < puntosMinimos) && (puntosMinimos < 21))
   setTimeout(()=>{
    if((puntosJugador<=21) && (puntosLocal>=21)){
        return alert("Has ganado!!")
       }else if((puntosLocal<=21) && (puntosLocal>puntosJugador)){
        return alert("Ha ganado el local!!")
       }
   },20);
}



// pedir carta con boton


btnped.addEventListener('click', () => {

    const carta= pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador

    const imgcarta = document.createElement('img');
    imgcarta.src = `./cartas/${ carta}.png`;
    imgcarta.className= "cartas";
    divCartaInv.append(imgcarta);

    if(puntosJugador > 21){
       btnped.disabled = true;
       btnnp.disabled = true;
       return alert("sobrepasaste los 21 puntos"),
       turnoLocal(puntosJugador);
    }else if (puntosJugador===21){
        btnped.disabled = true;
        btnnp.disabled = true;
        return alert("¡¡Has logrado 21 puntos, genial!!"),
        turnoLocal(puntosJugador);
    }
    
})
btnnp.addEventListener('click', () => {
    btnped.disabled = true;
    btnnp.disabled = true;
    turnoLocal(puntosJugador);
    
})


