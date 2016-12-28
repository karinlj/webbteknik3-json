// JavaScript Document

// Intitiering av objekten
function init() {
    list.init();        // Hanterar listan av usb-minnen
}   //end init
addListener(window, "load", init);


//object list
var list = {
    
    btnElem: null,         //ref till knapp   
    dataElem: null,       //ref till div-taggen där json-filen läses in
    
    //initierar egenskaper och händelsehanterare
    init: function() {
        list.btnElem = document.getElementById("listBtn");
        list.dataElem = document.getElementById("data");
        addListener(list.btnElem, "click", list.requestData);  
    }, //end init
    
    
    //ajax-anrop
    requestData: function() {
        var request; // Object för Ajax-anropet
        if (XMLHttpRequest) { request = new XMLHttpRequest(); } // olika objekt (XMLHttpRequest eller ActiveXObject, beroende på webbläsare
        else if (ActiveXObject) {request = new ActiveXObject("Microsoft.XMLHTTP"); }
        else { alert("Tyvärr inget stöd för AJAX, så listan kan inte läsas in"); return false; }
        request.open("GET","min-data.json",true);
        request.send(null); // Skicka begäran till servern
        request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if ( (request.readyState == 4) && (request.status == 200) ) list.getData(request.responseText);
		// när kommunikationen är klar blir readyState 4 och om filen fanns blir status 200 (OK)
        };
    },       //end requestImages
    
    
    //tolka xml-kod och skapa html-kod
    getData: function(jsonText) {
        var HTMLcode ="";		// HTML-koden som ska skapas
        var i;	
        var usbList;               //json-objekt med alla egenskaper
        usbList = JSON.parse(jsonText);         //konverterar textsträng till json-objekt

       //HTMLcode = "<h3>" +usbList.capacity+ "</h3>";

        for (i=0; i<usbList.usb.length; i++) {
            
            HTMLcode += '<div><img src="' +usbList.usb[i].image.url+ '" alt=""><p>Capacity: ' +usbList.usb[i].capacity+ '</p><p>Name: ' +usbList.usb[i].name+ '</p><p>Brand: ' +usbList.usb[i].brand+ '</p><p>Interface: ' +usbList.usb[i].interface+ '</p><p>Description: ' +usbList.usb[i].description+ '</p><p>Price: ' +usbList.usb[i].price+ ' ' +usbList.usb[i].unit+ '</p></div>';
                
        }
      
        list.dataElem.innerHTML = HTMLcode;
        
    }   //end getData
    

} //end object list


