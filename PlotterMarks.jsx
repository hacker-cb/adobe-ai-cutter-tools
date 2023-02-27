

function PlotterMarks(doc, plotter) {
    this.doc = doc;

    if (plotter in PlotterMarks.PLOTTERS) {
        this.plotter = PlotterMarks.PLOTTERS[plotter];
    } else {
        Window.alert('Plotter "' + plotter + '" not supported');
        throw 'Plotter "' + plotter + '" not supported';
    }

    this.layerName = 'plotter_marks';
    this.layer = this._prepareLayer();
}

PlotterMarks.PLOTTERS = {
    'Vulcan FC-500VC': {
        'markDistance': new UnitValue(10.0, 'mm').as('pt'),
        'markDiameter': new UnitValue(5.0, 'mm').as('pt'),
    }
};

PlotterMarks.prototype._prepareLayer = function() {
    var marksLayer;
    try {
        marksLayer = this.doc.layers.getByName(this.layerName);
        $.writeln('Layer "' + this.layerName + '" alreays exist, reuse');
    } catch (e){
        $.writeln('Layer "' + this.layerName + '" not exist, creating');
        marksLayer = doc.layers.add();
        marksLayer.name = this.layerName;
    }
    return marksLayer;
}

PlotterMarks.prototype.clearLayer = function() {
    this.layer.locked = false; // Unlock layer

    while (this.layer.pageItems.length > 0){
        var item = this.layer.pageItems[0];
        $.writeln('Deleting item: ' + item.name);
        this.layer.pageItems[0].remove();
    }


    this.layer.locked = true; // Lock layer
}

PlotterMarks.prototype.generateMarks = function(){

    this.layer.locked = false; // Unlock layer

    // Create new items
    for (var i = 0; i <  this.doc.artboards.length; i++) {
        var ab = this.doc.artboards[i];

        var abRect = ab.artboardRect; // left, top, right, bottom (in `pt` units)

        var left = abRect[0];
        var top = abRect[1];
        var right = abRect[2];
        var bottom = abRect[3];

        var width = right - left;
        var height = top - bottom;

        $.writeln('Artboard: "' + ab.name + '", size: [' + abRect + '] (' + width + '*' + height + ')');

        // Create circle in each corner.
        // pathItems.ellipse([top][, left][, width][, height])
        var marks = [
            // left top
            this.layer.pathItems.ellipse(top - markDistance, left + markDistance, markDiameter, markDiameter),
            // right top
            this.layer.pathItems.ellipse(top - markDistance, right - markDistance - markDiameter, markDiameter, markDiameter),
            // left bottom
            this.layer.pathItems.ellipse(bottom + markDistance + markDiameter, left + markDistance, markDiameter, markDiameter),
            // right bottom
            this.layer.pathItems.ellipse(bottom + markDistance + markDiameter, right - markDistance - markDiameter, markDiameter, markDiameter),
        ];

        marks[0].name = ab.name + ' [left top]';
        marks[1].name = ab.name + ' [right top]';
        marks[2].name = ab.name + ' [left bottom]';
        marks[3].name = ab.name + ' [right bottom]';
    }

    this.layer.locked = true; // Lock layer
}

PlotterMarks.prototype.run = function(){
    this.clearLayer();
    this.generateMarks();

    return true;
}



var pm = new PlotterMarks(app.activeDocument, 'Vulcan FC-500VC');

pm.run();

