var iso = new Isomer(document.getElementById("coffee"));


var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Color = Isomer.Color;
var Path = Isomer.Path;
var white = new Color(255, 255, 255, 1);
var angle = 0;
var angle2 = 0;


var marshmallow1 = Shape.Prism(Point(-.1, -.1, 1.6), .2, .2, .05);
var marshmallow2 = Shape.Prism(Point(-.1, -.1, 2), .2, .2, .05);

iso.add(marshmallow1, white);
iso.add(marshmallow2, white);


function draw() {

  // clear the canvas
  iso.canvas.clear();

  //loop with RAF
  requestAnimationFrame(draw);

  //Back of cup
  iso.add(Shape.Prism(new Point(1, 0, 0), .1, 1.1, 1.4), new Color(166, 166, 166, 1));
  iso.add(Shape.Prism(new Point(0, 1, 0), 1, .1, 1.4), new Color(166, 166, 166, 1));

  //Coffee
  iso.add(Shape.Prism(new Point(.1, .1, 0), .9, .9, 1.2), new Color(80, 61, 41, 1));

  //Marshmallow 1
  iso.add(marshmallow1.rotateZ(Point(0, 0, 0), angle), white);

  //Front of cup
  iso.add(Shape.Prism(new Point(0, 0, 0), 1, .1, 1.4), new Color(166, 166, 166, 1));
  iso.add(Shape.Prism(new Point(0, 0, 0), .1, 1, 1.4), new Color(166, 166, 166, 1));

  //Handle
  iso.add(Shape.Prism(new Point(.9, 0, .1), .1, .4, .1), new Color(47, 47, 47, 1));
  iso.add(Shape.Prism(new Point(.9, 0, .6), .1, .35, .1), new Color(47, 47, 47, 1));
  iso.add(Shape.Prism(new Point(.9, 0, .1), .1, .1, .6), new Color(47, 47, 47, 1));

  //Marshmallow 2
  iso.add(marshmallow2.rotateZ(Point(0, 0, 0), angle2), white);

  angle += Math.PI / 1000;
  angle2 += Math.PI / -1000;

}
draw();