eposamen.github.io
==================

IMPLEMENTATION:
This project correctly implements a web page with a map provided by the
google map API. Depending on which line it gets information for from the 
MTBA Boston T API, it displays either the red, blue or orange line with a colored 
line and customized icons for each stop. Geolocation is used to place a 
marker at the users current location, and when this marker is clocked, 
it displays correctly the name of the T stop the user is closest to. When 
a t-stop marker is clocked, it displays a schedule for trains coming into 
that station. If the request fails to get MTBA information, the marker at 
the users location displays an error message. 

* Note: If you are accessing the page from outside of boston, you will need to 
        zoom out and find Boston on the map, as the map will pan to the users 
        current location.
