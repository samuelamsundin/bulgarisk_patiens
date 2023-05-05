let guessButton
console.log("Båda är finast!")

window.addEventListener("load", function () {
    init();
})

function init()
{
    guessButton = document.getElementsByClassName("button")[0];
    guessButton.addEventListener("click", function () {
        slumpmässigt();
    })
}

//deklarering av listor
drag = []
utfall = []

//Bestämmer antal kort och antal högar
//Skriver sedan ut det
function slumpmässigt(){
    antal_kort = Math.floor(Math.random() * 51) + 1
    antal_högar = (Math.floor(Math.random() * (antal_kort-1)) + 1)
    console.log(antal_kort)
    console.log(antal_högar)

//Bestämmer antal kort i högarna
    while (antal_högar > 1){
        max_gräns = (antal_kort - antal_högar)
        hög = (Math.floor(Math.random()*max_gräns) + 1)
        drag.push(hög)
        antal_kort = antal_kort - hög
        antal_högar = antal_högar - 1
    }
    drag.push(antal_kort)
    programet()
}

//gör om det man skriver in till en array 
function valt(){
    högar = prompt("Skriv ut ursprungsläget, skriv mellansalg mellan högarna")
    i = 0
    hög = ""
    while (i < högar.length){
        if (högar[i]== " "){
           drag.push(hög)
           hög = "" 
        }
        else{
            hög = hög + högar[i]
        }
        i = i + 1
    }
    drag.push(hög)
    programet()
}

//ändrar om högarna till den nya ordningen
function ny_omgång(dragen){
    nya_draget = []
    i = 0
    while (i < dragen.length){
        tal = (dragen[i] - 1)
        if (tal != 0){
            nya_draget.push(tal)
        }
        i = i + 1
    } 
    nya_draget.push(drag.length)
    return nya_draget
}

//skapar en kod som man kan jämföra för att kolla om draget upprepats
function summan(nya_draget){
    let summa = ""
    värde = 0
    while (värde < nya_draget.length){
        nummer = nya_draget[värde]
        nummer = String.fromCharCode(nummer + 48)
        summa = summa + nummer
        värde = värde + 1
    }
    return summa
}

//kollar om draget har upprepats
function upprepning(drag_gjorda, draget, gamla_drag){
i = 0
while (i < (drag_gjorda - 1)){
    if (draget === gamla_drag[i]){
        return true
        i = drag_gjorda.length
    }
    else{
        i = i + 1
    }
}
}

//kollar om det tidigare draget är samma som det föra draget
function Vinner( draget, gamla_drag){
if (draget == gamla_drag[(gamla_drag.length - 1)]){
    return true
}
else{
    return false
}
}

//kollar om spelet är slut
function Över (upprepning, Vinst, drag_gjorda){
    if (Vinst == true){
        return true
    }
    else if (upprepning == true){
        return true
    }
    else if (drag_gjorda >= 25){
        return true
    }
    else{
        return false
    }
}

function programet (){
let upprepad = false
let vinst = false
draggjorda = 1
slut = false

console.log("Ursprungsläge: " + drag)
console.log("")


while (slut == false){
    nytt_drag = ny_omgång(drag)
    nytt_drag = nytt_drag.sort()
    console.log("Drag "+ [draggjorda] + ":  " + nytt_drag)
    drag = nytt_drag
    total = summan(nytt_drag)
    upprepad = upprepning(draggjorda, total, utfall)
    vinst = Vinner(total, utfall)
    utfall.push(total)
    slut = Över(upprepad, vinst, draggjorda)
    draggjorda = draggjorda + 1
}

if (vinst == true){
    console.log("Vinst")
}

if(draggjorda >= 25){
    console.log("För många drag")
}
if (upprepad == true){
    console.log("Går inte ut")
}
}