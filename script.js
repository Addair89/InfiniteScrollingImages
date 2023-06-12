const imageConatiner = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// UNsplash API
const count = 10;
const apiKey= 'LVSw6WfeQAyh7Dk4Tc-rBPnBBtLCljs7G7xNj2PtYEQ';
const apirUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//check if all image have loaded
function imageLoaded() {
    console.log('imageLoaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages) { 
        ready = true;
        loader.hidden = true;
    }
}

//helper funciton to set items/attributes of DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//Display Photos Create Elements
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each photo in array
    photosArray.forEach((photo) => {
        //Creat <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        //Create <img> for each photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Check when each image is finsihed loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside the <a>, then put both inside imageConatiner element
        item.appendChild(img)        
        imageConatiner.appendChild(item);
    });
}
//Getting photos from unsplash

async function getPhotos() {
    try{
        const response = await fetch(apirUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){

    }
}

//Check to see if scrolling near the bottom of the page
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();