function Maak_een_nieuw_object() {
	// Loop over de kwartetspel array
	game.kwartetspel.forEach(categorie => {
	  // Loop over de kaarten array binnen elke categorie
	  categorie.kaarten.forEach(kaart => {
		// Maak een nieuw object met de gewenste keys
		const nieuwObject = {
		  kaart: kaart,
		  image: kaart.toLowerCase().replace(/ /g, '-') + '.webp'
		};

		// Voeg het nieuwe object toe aan de kaarten array
		categorie.kaarten[categorie.kaarten.indexOf(kaart)] = nieuwObject;
	  });
	});
	// Print het bijgewerkte game object
	console.log(JSON.stringify(game, null, 2));
}

function createContainers() {
	var image_root ="../img/";
   
	//Maak_een_nieuw_object();
	var data = game.kwartetspel;
    for (var i = 0; i < data.length; i++) {
		
		var containerDiv = document.createElement('div');
		containerDiv.className = 'container';
		//console.log(i, containerDiv)
       
	   var color = getRandomRGBColor(); //data[i].color;
		for (var j = 0; j < data[i].kaarten.length; j++) {
			var cardDiv = document.createElement('div');
			cardDiv.className = 'card';
			
			var contentDiv = document.createElement('div');
			contentDiv.classList.add('content'); 
			contentDiv.style.borderColor = color;  
			//contentDiv.classList.add(data[i].classname); 
			cardDiv.appendChild(contentDiv);
			
			var Categorie = document.createElement('div');
			Categorie.innerHTML = data[i].categorie;
			Categorie.classList.add('categorie'); 
			Categorie.style.backgroundColor = color; 
			//Categorie.style.backgroundImage = "url('"+image_root+data[i].logo+"')";
			
			var SubCategorie = document.createElement('div');
			SubCategorie.innerHTML = data[i].sub_categorie;
			SubCategorie.classList.add('sub-categorie');
			Categorie.appendChild(SubCategorie);
			
			contentDiv.appendChild(Categorie);
			
		// icoon
			var iconDiv = document.createElement('div');
			iconDiv.classList.add('icon'); 
			iconDiv.style.backgroundColor = data[i].color; 
			iconDiv.style.backgroundImage = "url('"+image_root+data[i].logo+"')";
			Categorie.appendChild(iconDiv);
			
			var cardImage = document.createElement('img');
			cardImage.src = image_root + data[i].kaarten[j].image;
			cardImage.className = 'card-img';
			contentDiv.appendChild(cardImage);
			
			for (var k = 0; k < data[i].kaarten.length; k++) {
				var cardMethod = document.createElement('div');
				cardMethod.innerHTML = data[i].kaarten[k].kaart;
				cardMethod.classList.add("method"); 
				
				if(data[i].kaarten[j].kaart == data[i].kaarten[k].kaart){
					cardMethod.style.background = color;
					cardMethod.style.fontWeight  = "bold";
					cardMethod.style.color  = "white";
				}			
				contentDiv.appendChild(cardMethod);
			}
			
			containerDiv.appendChild(cardDiv);
		} 
		
        document.body.appendChild(containerDiv);

    }

    // Append the last container if it's not empty
    if (containerDiv.childNodes.length > 0) {
        document.body.appendChild(containerDiv);
    }
}
// Functie om een willekeurige RGB-kleur te genereren
function getRandomRGBColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}

createContainers();
