#include "data.js";

var data = game["kwartetspel"];
var textFieldLog
var textField;
var CurrentFilePath;

// Functie om het tekenvak bij te werken door het document opnieuw te tekenen
function updateTextFrame() {
    app.redraw(); // Vernieuw het document
}

// Functie om het tekengebied op te slaan als een PDF-bestand met specifieke opties
function saveAsPDF(filename) {
	 var doc = app.activeDocument; // Verwijzing naar het actieve document
    // PDF-opties instellen
    var pdfSaveOpts = new PDFSaveOptions();
    pdfSaveOpts.compatibility = PDFCompatibility.ACROBAT5; // PDF-compatibiliteit instellen
    pdfSaveOpts.generateThumbnails = true; // Miniaturen genereren inschakelen
    pdfSaveOpts.preserveEditability = true; // Bewerkbaarheid behouden inschakelen
    pdfSaveOpts.trimMarks = true; // Snijtekens inschakelen
    pdfSaveOpts.includeDocumentThumbnails = true; // Documentminiaturen inschakelen
    pdfSaveOpts.includeStructure = true; // Structuur inschakelen
    pdfSaveOpts.cropMarks = true; // Afloopmarkeringen inschakelen
    pdfSaveOpts.regmarks = true; // Registermarkeringen inschakelen
	pdfSaveOpts.registrationMarks = true; // Schakel registratietekens in

    // Bestand opslaan als PDF
    var pdfFile = new File(filename);
    doc.saveAs(pdfFile, pdfSaveOpts);
}
// Functie om de kleur van het achtergrondpagina-item op te halen
function getFillColor(hexColor) {
    var doc = app.activeDocument; // Verwijzing naar het actieve document
	// Kleur instellen
	var newColor = new RGBColor();
	newColor.red = parseInt(hexColor.substring(1, 3), 16); // Rood component
	newColor.green = parseInt(hexColor.substring(3, 5), 16); // Groen component
	newColor.blue = parseInt(hexColor.substring(5, 7), 16); // Blauw component

	return newColor; // Retourneer de kleur voor het achtergrondpagina-item
}
// Functie om de kleur van het achtergrondpagina-item op te halen en 30% lichter te maken
function getFillColorLighter(hexColor) {
    var doc = app.activeDocument; // Verwijzing naar het actieve document

	// Kleur instellen
	var newColor = new RGBColor();
	newColor.red = parseInt(hexColor.substring(1, 3), 16); // Rood component
	newColor.green = parseInt(hexColor.substring(3, 5), 16); // Groen component
	newColor.blue = parseInt(hexColor.substring(5, 7), 16); // Blauw component

	// 30% lichtere kleur berekenen
	var percentage = 30;
	var lightenRed = Math.min(255, newColor.red + (255 - newColor.red) * (percentage / 100));
	var lightenGreen = Math.min(255, newColor.green + (255 - newColor.green) * (percentage / 100));
	var lightenBlue = Math.min(255, newColor.blue + (255 - newColor.blue) * (percentage / 100));

	newColor.red = Math.round(lightenRed);
	newColor.green = Math.round(lightenGreen);
	newColor.blue = Math.round(lightenBlue);

	return newColor; // Retourneer de kleur voor het achtergrondpagina-item
    
}

function log(txt) {
	textFieldLog.text = textFieldLog.text + " | " +txt;
	updateTextFrame();
}

// Functie om de huidige locatie van het geopende bestand op te vragen
function getCurrentFilePath() {
    var doc = app.activeDocument; // Verwijzing naar het actieve document

    // Controleer of het document is opgeslagen
    if (doc.path == "") {
        return "Het document is nog niet opgeslagen."; // Geef een melding als het document niet is opgeslagen
    } else {
        return doc.path; // Retourneer de huidige locatie van het bestand
    }
}

// Roep de functie aan om de huidige locatie van het geopende bestand op te vragen

function makeLayersVisibleByLogo(logoName) {
	var doc = app.activeDocument; // Verwijzing naar het actieve 
    var layers = [
        "icon-workshop-nobg.svg",
        "icon-stepping-stones-nobg.svg",
        "icon-showroom-nobg.svg",
        "icon-library-nobg.svg",
        "icon-lab-nobg.svg",
        "icon-field-nobg.svg",
        "logo.svg"
    ];

    // Loop door de lagen en maak ze onzichtbaar
    for (var i = 0; i < layers.length; i++) {
        var layerName = layers[i];
        var layer = doc.pageItems.getByName(layerName);
		
        if (layer) {
            layer.hidden = true;
        }
    }
	
	var logoLayer = doc.pageItems.getByName(logoName);
	if (logoLayer) {
		logoLayer.hidden = false;
	}
	app.redraw();
}

function rgbToHex(rgbString) {
    // Verwijder "rgb(" en ")" uit de string
    rgbString = rgbString.replace("rgb(", "").replace(")", "");
    
    // Splits de string op de komma's
    var rgbArray = rgbString.split(",");
   
    // Haal de RGB-waarden op
    var r = parseInt(rgbArray[0]);
    var g = parseInt(rgbArray[1]);
    var b = parseInt(rgbArray[2]);
    log(r)
    // Converteer de RGB-waarden naar hexadecimaal
    var hexColor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
     
    return hexColor.toUpperCase(); // Geeft de hexadecimale kleurwaarde terug in hoofdletters
}



// Functie om het venster te maken
function createUI() {
    var dialog = new Window("dialog", "Script Uitvoeren");
    dialog.orientation = "column";

	// Tekstveld voor het loggen
	textFieldLog = dialog.add("edittext", undefined, "..", {multiline: true, width: 100, height: 300});
	textFieldLog.characters = 50;
	// Tekstveld voor het invoeren van tekst
    textField = dialog.add("edittext", undefined, "Voer hier tekst in");
    textField.characters = 50;
	
    // Knop om het script uit te voeren
    var runButton = dialog.add("button", undefined, "Export");
    runButton.onClick = function() {
		RunExport();
    };
// Knop om het script uit te voeren
    var testButton = dialog.add("button", undefined, "Test");
    testButton.onClick = function() {
		//log(data.length);
		var doc = app.activeDocument; // Verwijzing naar het actieve document
		doc.selection = null;
		//doc.pageItems.getByName(layerName);
		var layer01= doc.pageItems.getByName("Title");
		var layer02  = doc.pageItems.getByName("SubTitle");
		var  numCharacters = layer01.contents.length;
		var t = -133.818359375;
		if(numCharacters>16){
			t = -157.41015625;
		}
		layer02.top = t;

		app.redraw();
    };
	
    dialog.show();
}

function SetHeader(doc, d) {
		doc.selection = null;
		var Title = doc.pageItems.getByName("Title");
		var SubTitle  = doc.pageItems.getByName("SubTitle");
		
		Title.contents = d.categorie.toUpperCase();
		SubTitle.contents = d.sub_categorie.toUpperCase();
		
		var  numCharacters = Title.contents.length;
		var t = -131;
		if(numCharacters>16){
			t = -155;
		}
		SubTitle.top = t;
		app.redraw();
}
function SetColors(doc, d) {
	doc.pageItems.getByName("Achterground").fillColor = getFillColor(rgbToHex(d.catcolor) ); 
	doc.pageItems.getByName("datacolor").fillColor = getFillColor( rgbToHex(d.color) );
}
// Functie om een laag te selecteren
function RunExport() {
	
    var doc = app.activeDocument; // Verwijzing naar het actieve 
	doc.selection = null;
	
	for( var x = 0; x < data.length; x++){
		
		SetHeader(doc, data[x]);
		SetColors(doc, data[x]);
		makeLayersVisibleByLogo(data[x].logo);
		
		var collight = getFillColorLighter( rgbToHex(data[x].catcolor) );

		for( var z = 0; z < data[x].kaarten.length; z++){
			doc.textFrames[z+2].contents = data[x].kaarten[z].kaart;
		}
		
		for( var y = 0; y < data[x].kaarten.length; y++){
			for( var w = 0; w < data[x].kaarten.length; w++){
				var col = collight;
				if(w == y){
					col = doc.pageItems.getByName("datacolor").fillColor;
					
					// Vervang de bestaande afbeelding door een nieuwe afbeelding
					var imageFile = new File("C:/Users/docen/OneDrive/Desktop/adobe scripting/img/"+ data[x].kaarten[w].image); // Vervang dit pad door het pad naar je eigen afbeelding
					updateTextFrame();
	
					doc.pageItems.getByName("Afbeelding").file = imageFile;
				}
				doc.pageItems.getByName("kaart " + w).fillColor = col;	
			}
			textField.text = data[x].categorie + "_" + y + ".pdf";
			updateTextFrame();
			
			saveAsPDF("C:/Users/docen/OneDrive/Desktop/adobe scripting/kaarten/"+ data[x].categorie + "_" + y + ".pdf");
			
		}
		
	}

}

// Controleer of Adobe Illustrator actief is
if (app && app.name === "Adobe Illustrator") {
    // Maak de gebruikersinterface
    createUI();
} else {
    alert("Adobe Illustrator lijkt niet actief te zijn.");
}
