let map;
let lat;
let lng;
let options;
let markers = [];  
let coords = document.getElementById("coords");
let cutted_coords;
let city;


function initMap(){
 
  //map options
  options =  {
    //your coords to center the map in
    center: {lat: -31 , lng:50 },
    zoom: 4
  }
  //the actual map
  map = new google.maps.Map(document.getElementById('map'), options);
 
  //way to add events to the map
  //need to add / bind the map itself , "map" variable in this case
  google.maps.event.addListener(map , "click", (event)=>{
    // event.latLng returns the coords
    //create a marker on click
    var marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      
    });   

    // need to get the right format for the geocode to respond
    let x = String(event.latLng);
    let y = x.substring(1);
    let z= y.substring(0 , y.length -1);
    // cleaned coords
    cutted_coords = z.trim();
    

    //now do an ajax request to the geocode service
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //when the response is ready do the next:
            //save the response data
            city = this.responseText;
        
            //push the results coords to the markers array
            markers.push(event.latLng);

            //sets the info window with the object from the responseText
            let infowindow = new google.maps.InfoWindow({
              content: "<div class='infowindow'>" + this.responseText + "</div>"
            });

          //adds the event listener to the marker
          //when clicked opens the info window
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
      
      }
    };// end of  ajax callback
    
    // use the coords to get the place clicked
    xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + cutted_coords, true);
    xhttp.send();
 
  });

}





    


