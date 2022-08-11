console.log("Hola mundo")
const url = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=afd880c9-c4c0-4d8e-9430-133f9e814a46';
//const url2 = 'https://api.thecatapi.com/v1/favourites/?api_key=afd880c9-c4c0-4d8e-9430-133f9e814a46';
const url2 = 'https://api.thecatapi.com/v1/favourites';
const url3 = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=afd880c9-c4c0-4d8e-9430-133f9e814a46`;
const url4 = 'https://api.thecatapi.com/v1/images/upload';
const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/' //base de los endpoint a consumir
});
api.defaults.headers.common['X-API-KEY'] = 'afd880c9-c4c0-4d8e-9430-133f9e814a46';// api key comun para todas las api
/*function NextImage(){

//LA FUNCION DE FETCH DEVUELVE UNA PROMESA
fetch(url)
.then(res => res.json())//esto es una promesa Convertimos la respuesta en algo que javascript pueda entender como un objeto
.then(data =>{//esto es otra promesa aqui ya tenemos los datos, es decir la informacion, es decir lo que trae el Api
    const img = document.querySelector('img');
    img.src = data[0].url; // acede al elemento 0 del objeto a su propiedad url
});

}*/

const error = document.getElementById('Error')//cuando en cualquiera de la dos funciones no devuelve una estatus code diferente de 200 mostramos el error

async function generateRandomImage() {
    const res = await fetch(url);//fetch retorna la promesa, es decir la solicitud de la imagen del gato y await espera a que finalice la promesa
    const data = await res.json(); //Obtenemos la promesa en un json(objeto) que es entendible por javascript
    console.log('Funcion generateRandomImage')
    console.log(data)

    if (res.status !== 200) {
        error.innerHTML = "Se presento un error en la funcion generateRandomImage(): " + res.status + data.message;
    } else {
        const img1 = document.getElementById('img1')//Obtengo el elemento(img) con (id="img1")
        const img2 = document.getElementById('img2')//Obtengo el elemento(img) con (id="img2")
        const img3 = document.getElementById('img3')//Obtengo el elemento(img) con (id="img3")
        const button1 = document.getElementById('button1')//Obtengo el elemento(button) con (id="button1")
        const button2 = document.getElementById('button2')//Obtengo el elemento(button) con (id="button2")
        const button3 = document.getElementById('button3')//Obtengo el elemento(button) con (id="button3")

        img1.src = data[0].url;//asigno la imagen de la primerar posicion de (data) a la propiedad (src) de la etiqueta (img)
        img2.src = data[1].url;//asigno la imagen de la segunda posicion de (data) a la propiedad (src) de la etiqueta (img)
        img3.src = data[2].url;//asigno la imagen de la tercera posicion de (data) a la propiedad (src) de la etiqueta (img)

        button1.onclick = () => saveCatImageToFavorites(data[0].id)//le asigo al (button1) el llamado a la funcion (saveCatImageToFavorites()) pasandole como parametro el (id) de la primera posicion del array (data)
        button2.onclick = () => saveCatImageToFavorites(data[1].id)//le asigo al (button2) el llamado a la funcion (saveCatImageToFavorites()) pasandole como parametro el (id) de la segunda posicion del array (data)
        button3.onclick = () => saveCatImageToFavorites(data[2].id)//le asigo al (button3) el llamado a la funcion (saveCatImageToFavorites()) pasandole como parametro el (id) de la tercera posicion del array (data)
    }

}

async function loadFavoriteRandomImages() {
    const res = await fetch(url2, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'afd880c9-c4c0-4d8e-9430-133f9e814a46',
        },
    });//fetch retorna la promesa, es decir la solicitud de la imagen del gato y await espera a que finalice la promesa
    const data = await res.json(); //Obtenemos la promesa en un json(objeto) que es entendible por javascript
    console.log('Funcion loadFavoriteRandomImages')
    console.log(data)// Para ver por consola la data que viene de url2
    if (res.status !== 200) {
        error.innerHTML = "Se presento un error en la funcion loadFavoriteRandomImages() : " + res.status + data.message;

    } else {
        const section = document.getElementById('favorite cats')//Obtengo el elemento(seccion) con (id="favorite cats")
        section.innerHTML = ""; //limpio toda la seccion incluyendo el titulo
        const h2 = document.createElement('h2');//creo un titulo
        const h2Text = document.createTextNode('Favorite cats');//creo el texto que va tener el titulo
        h2.appendChild(h2Text);//agrego el texto al titulo
        section.appendChild(h2);//agrego el titulo con el texto a la seccion
        data.forEach(ArrayImagesFavoriteCats => {

            const article = document.createElement('article');// creo un articulo
            const img = document.createElement('img');// creo una imagen
            const button = document.createElement('button');//creo un boton
            const buttonText = document.createTextNode('Remove image from favorites');// creo el texto

            button.appendChild(buttonText)// le meto al boton el texto "Remove image from favorites"
            button.onclick = () => removeCatImageFromFavorites(ArrayImagesFavoriteCats.id)
            img.src = ArrayImagesFavoriteCats.image.url // le metemos la imagen a la propiedad src de la etiqueta img
            img.width = 100;
            img.height = 100;
            article.appendChild(img);// inserto la imagen en el articulo
            article.appendChild(button);// inserto el boton en el articulo
            section.appendChild(article);// inserto el articulo en la seccion
            //ArrayImagesFavoriteCats.image.url
        });
    }
}

async function saveCatImageToFavorites(id) { //esta funcion recibe como parametro el id de la imagen del gato que va hacer sellecionado como favorito
    
    const {data, status} = await api.post('/favourites',{ //res ya trae implicitamente a (status) y a (data)
        image_id: id,
    });

    if (status !== 200) {
        error.innerHTML = "Se presento un error en la funcion saveCatImageToFavorites() : " + status + data.message;

    } else {
        console.log('Se guardo la imagen del gato exitosamente en la seccion de favoritos')
        loadFavoriteRandomImages()
    }
    
    /*const res = await fetch(url2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',//application/json
            'X-API-KEY': 'afd880c9-c4c0-4d8e-9430-133f9e814a46',
        },
        body: JSON.stringify({
            image_id: id // id de la imagen del gato que va hacer sellecionado como favorito
        })
    });
    const data = await res.json();
    console.log('Funcion saveCatImageToFavorites(id)')
    //console.log(data)
    if (res.status !== 200) {
        error.innerHTML = "Se presento un error en la funcion saveCatImageToFavorites() : " + res.status + data.message;

    } else {
        console.log('Se guardo la imagen del gato exitosamente en la seccion de favoritos')
        loadFavoriteRandomImages()
    }*/
}

async function removeCatImageFromFavorites(id) {
    const res = await fetch(url3(id), {
        method: 'DELETE', //Nota: no hay que enviar un headers ya que el parametro del imagen del gato a eliminar se envia por la misma url        
        headers: {
            'X-API-KEY': 'afd880c9-c4c0-4d8e-9430-133f9e814a46',
        }
    });
    const data = await res.json();
    console.log('removeCatImageFromFavorites(id)')
    console.log(data)

    if (res.status !== 200) {
        error.innerHTML = "Se presento un error en la funcion saveCatImageToFavorites() : " + res.status + data.message;

    } else {
        loadFavoriteRandomImages()
        console.log('Se elimino la imagen del gato de la seccion de favoritos exitosamente')

    }

}

async function UploadCatPhoto(){
    const form = document.getElementById('uploadForm')//Hacemos el llamado al formulario con id 'uploadForm' del documento HTML
    const formData = new FormData(form)// instanciamos FormData y le pasamos como parametro (form) que contiene todos los inputs(datos de entrada) del formulario
    console.log(formData.get('File'))// Obtenemos el input que se llama 'File' y lo imprimimos

    const res = await fetch(url4,{
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',// esto lo comentareamos ya que fetch automaticamente lo pone
            'X-API-KEY': 'afd880c9-c4c0-4d8e-9430-133f9e814a46',
        },
        body:formData,//como body le pasamos el formData que contiene todos los inputs(datos de entrada)

    })

    const data = await res.json();// le damos formato json
    if (res.status !== 201) {
        Error.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`;
    }
    else {
        console.log("Foto de michi cargada :)");
        console.log({ data });
        console.log(data.url);
        saveCatImageToFavorites(data.id) //para agregar el gato cargado a favoritos.
    }

}
generateRandomImage();//para que al cargar el index aperesca la imagen del gato por primera ves
loadFavoriteRandomImages();//para que al cargar la index aperesca la data que trae la funcion



