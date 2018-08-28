//<![CDATA[

// MODAL WINDOW START
$(document).ready(function(){
  function modalw() {
    $(modal).easyModal({
        top: 100,
        autoOpen: true,
        overlayOpacity: 0.7,
        overlayColor: "#000",
        overlayClose: true,
        closeOnEscape: true
    });
 }
 // use setTimeout() to execute
 setTimeout(modalw, 2000)
});
// MODAL WINDOW END


$(function() {
            var colors = ["#1abc9c","#3498db","#ea5b4d","#9b59b6","#34495e","#16a085","#27ae60","#2980b9","#f1c40f","#e67e22","#e74c3c","#f39c12","#d35400","#c0392b","#06b3db","#e3b63d","#dc3d66","#bd3559","#0082c8","#16528e","#e54b4b","#a2c5bf","#167c80","#72616e","#72BDC2","#F99899","#2C9AB7","#52BAD5","#6DC5DC","#B1E0EC","#449A88","#72C1B0","#95D1C4","#C5E5DE","#FEBE12","#FED156","#DB3A1B","#E85C41","#EE836E","#66CC99","#8A9BB1","#CC89A2","#C26787","#64AE60","#27695E","#993366","#8E368B","#345773","#E8755C","#DB334E","#98AE60","#78AD45","#547B30","#527D5A","#D83944","#993366","#782344","#91CFA1"];

            setInterval(function() {
                var bodybgarrayno = Math.floor(Math.random() * colors.length);
                var selectedcolor = colors[bodybgarrayno];
                $("body").css("background",selectedcolor);
            }, 15000);
});





//]]>
