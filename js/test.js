// import axios from "../node_modules/axios/lib/axios "
var canvas; 
function makeCircle(left, top, line1) {
    var c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 5,
      radius: 12,
      fill: '#fff',
      stroke: '#666'
    });
/*     c.hasControls = c.hasBorders = false;
     */
    c.line1 = line1;
    return c;
  }
  
window.newAnimation = function(){
   canvas = new fabric.Canvas('canvas');
}

function drawArrow(fromx, fromy, tox, toy) {

	var angle = Math.atan2(toy - fromy, tox - fromx);

	var headlen = 15;  // arrow head size

	// bring the line end back some to account for arrow head.
	tox = tox - (headlen) * Math.cos(angle);
	toy = toy - (headlen) * Math.sin(angle);

	// calculate the points.
	var points = [
		{
			x: fromx,  // start point
			y: fromy
		}, {
			x: fromx - (headlen / 4) * Math.cos(angle - Math.PI / 2), 
			y: fromy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
		},{
			x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2), 
			y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
		}, {
			x: tox - (headlen) * Math.cos(angle - Math.PI / 2),
			y: toy - (headlen) * Math.sin(angle - Math.PI / 2)
		},{
			x: tox + (headlen) * Math.cos(angle),  // tip
			y: toy + (headlen) * Math.sin(angle)
		}, {
			x: tox - (headlen) * Math.cos(angle + Math.PI / 2),
			y: toy - (headlen) * Math.sin(angle + Math.PI / 2)
		}, {
			x: tox - (headlen / 4) * Math.cos(angle + Math.PI / 2),
			y: toy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
		}, {
			x: fromx - (headlen / 4) * Math.cos(angle + Math.PI / 2),
			y: fromy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
		},{
			x: fromx,
			y: fromy
		}
	];

	var pline = new fabric.Polyline(points, {
		fill: 'white',
		stroke: 'black',
		opacity: 1,
		strokeWidth: 2,
		originX: 'left',
		originY: 'top',
		selectable: true
	});
	
  return pline;
	/* canvas.add(pline);
	
	canvas.renderAll(); */

}

var coords = [50, 100, 200, 200];
function makeLine(coords)
{
	return new fabric.Line(coords, {
    		fill: 'red',
        evented: true,
        stroke: 'red'
    });
}
var x1=null;
var y1=null;
var x2=null;
var y2=null;
const line = makeLine(coords);
window.addLine = function() {
    //canvas.add(line);
    
    /* canvas.add(
    c1 = makeCircle(line.get('x1'), line.get('y1'), null, line),
    makeCircle(line.get('x2'), line.get('y2'), null, line)
    ) ;*/
    const c1 = makeCircle(line.get('x1'), line.get('y1'), null, line);
    const c2 = makeCircle(line.get('x2'), line.get('y2'), null, line);
    x1 = line.get('x1');
    y1 = line.get('y1');
    x2 = line.get('x2');
    y2 = line.get('y2');
    var arrow = drawArrow(line.get('x1'), line.get('y1'), line.get('x2')/2, line.get('y2')/2);
    console.log(arrow);
    // this.arrow;c1, c2,
    var group = new fabric.Group([ arrow, line], {
                left: 150,
                top: 100,
                angle: 0
							});

		canvas.add(group);
    // console.log(c1);
    
  }

window.addRect = function(){
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
    });
    canvas.add(rect);

}

window.addCircle = function(){
    var circle = new fabric.Circle({
  radius: 20, fill: 'green', left: 100, top: 100
});
    canvas.add(circle);
}

/* window.addArrow = function() {
  drawArrow(100,100,200,200)
} */
window.deleteObject = function() {
        let activeObjects = canvas.getActiveObjects();
        if (activeObjects.length) {
            if (confirm('Do you want to delete the selected item??')) {
                activeObjects.forEach(function (object) {
                    canvas.remove(object);
                });
            }
        }
        else {
            alert('Please select the drawing to delete')
        }
}
var d1 = null;
window.myFunction = function() {
  d1 = document.getElementById("cars").value;
  // const c6 = line.get('d1');
  // d1 = line.get('d1');
  // document.getElementById("demo").innerHTML = x;
  console.log(d1);
}
myFunction();
console.log(d1);


var type = null;
window.enterFunction = function() {
  type = document.getElementById("enter").value;
  // const c6 = line.get('d1');
  // d1 = line.get('d1');
  // document.getElementById("demo").innerHTML = x;
  console.log(type);
}
enterFunction();
console.log(type);

// var d1 ;
    
/* canvas.on('object:moving', function(e) {
    var p = e.target;
    console.log(p);
    p.line && p.line.set({ 'x2': p.left, 'y2': p.top });
    canvas.renderAll();
  }); */
  //   module.exports = {
  //   newAnimation
  // }
  

  $('#name_form').submit(function(e) {
    e.preventDefault();

    var data = {};
    var Form = this;

    $.each(this.elements, function(i, v) {
        var input = $(v);
        // data[input.attr("name")] = input.val();
        delete data["undefined"];
    });

    // const res = axios.post('http://127.0.0.1:5000/api/say_name', { first_name: 42, last_name: 50 })
    // .then(res => {
    //   console.log(`statusCode: ${res.status}`)
    //   console.log(res)
    // })
    // .catch(error => {
    //   console.error(error)
    // });
if(x1 == null){
  alert('Choose Line');
}
if(d1 == 'Choose'){
  alert('Chosse Direction');
}
if(type == 'Choose'){
  alert('Chosse Enter/Exit');
}

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/api/say_name',
        // headers: {
        //     'Access-Control-Allow-Origin': 'http://127.0.0.1:5000/api/say_name'
        // },
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({x1:x1,y1:y1,x2:x2,y2:y2,d1:d1,type:type}),
        // data: JSON.stringify(data),
        context: Form,
        success: function(callback) {
            console.log(callback);
            // Watch out for Cross Site Scripting security issues when setting dynamic content!
            // $(this).text('Hello ' + callback.x1 + ' ' + callback.y1 + '!');
        },
        error: function() {
            // $(this).html("error!");
        }
    });
});