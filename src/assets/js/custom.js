function backstretch(){
  $('.hero-section').backstretch([
    "../../assets/images/slideshow/afro-woman-cleaning-window-with-rag-home.jpg",
    "../../assets/images/slideshow/afro-woman-holding-bucket-with-cleaning-items.jpg",
    "../../assets/images/slideshow/unrecognizable-cleaner-walking-into-hotel-room-with-tools-detergents.jpg"
  ],  {duration: 2000, fade: 750});
}

function select2jquery(className){
  $(className).select2();
}

function startSlideshow(imageUrls) {
  var imageIndex = 0;
  var imageContainer = document.getElementById('foreground-image');
  var imageElement = document.createElement('img');
  imageContainer.appendChild(imageElement);

  function changeImage() {
    $(imageElement).fadeOut(700, function() {
      imageElement.src = imageUrls[imageIndex];
      imageIndex = (imageIndex + 1) % imageUrls.length;
      $(imageElement).fadeIn(700);
    });
    setTimeout(changeImage, 2000);
  }

  changeImage();
}



