let guessButton
let guessButton2
let feedbackContainer


window.addEventListener("load", function () {
    init();
})

function init()
{
    guessButton = document.getElementsByClassName("button")[0];
    guessButton.addEventListener("click", function () {
        valt();
    })
    guessButton2 = document.getElementsByClassName("button")[1];
    guessButton2.addEventListener("click", function () {
        slumpmässigt();
    })
    feedbackContainer = document.getElementsByClassName("grid-element")[2];
    

    
}

//Gör om det man skriver in till en array 
function valt(){
    drag = []
    utfall = []
    högar = prompt("Skriv ut ursprungsläget, skriv mellansalg mellan högarna")
    i = 0
    hög = ""
    while (i < högar.length){
        if (högar[i] == " "){
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


//Bestämmer antal kort och antal högar
//Skriver sedan ut det
function slumpmässigt(){
    drag = []
    utfall = []
    antal_kort = Math.floor(Math.random() * 51) + 1
    antal_högar = (Math.floor(Math.random() * (antal_kort-1)) + 1)
    console.log("Antal kort", + antal_kort)
    console.log("Antal högar", + antal_högar)

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

//Kör funktioner i en while loop och kollar när spelet är över
//Skriver också ut varför spelet tog slut (Vinst, över 25 drag eller upprepning)
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
        console.log("Vinst på drag "+ (draggjorda-1))
    }
    
    else if (upprepad == true){
        console.log("Går inte ut, upptäcktes på drag " + (draggjorda-1))
    }
    
    else{
        console.log((draggjorda-1)+" drag gjorda, går därför inte ut")
    }
    }

//Ändrar om högarna till den nya ordningen
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

//Gör om draget till en kod som man sen kan jämföra med andra för att kolla om draget upprepats
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

//Kollar om draget har upprepats
function upprepning(drag_gjorda, draget, gamla_drag){
i = 0
while (i < (drag_gjorda - 1)){
    if (draget === gamla_drag[i]){
        return true
        i = drag_gjorda
    }
    else{
        i = i + 1
    }
}
}

/*function writeOutput(blablabla)
{
    let output = blablabla
    feedbackContainer.innerHTML = output;
}*/

//Kollar om det tidigare draget är samma som det föra draget
function Vinner( draget, gamla_drag){
if (draget == gamla_drag[(gamla_drag.length - 1)]){
    return true
}
else{
    return false
}
}

//Kollar om spelet är slut
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
