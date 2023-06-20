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
