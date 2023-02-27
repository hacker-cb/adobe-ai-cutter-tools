

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
        marksLayer = this.doc.layers.add();
        marksLayer.name = this.layerName;
    }

    var currentLayer = this.doc.activeLayer;

    // Move layer to the end of list
    marksLayer.locked = false;
    marksLayer.move(this.doc, ElementPlacement.PLACEATEND);
    marksLayer.locked = true

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
    var pt = this.plotter;

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
            this.layer.pathItems.ellipse(top - pt.markDistance, left + pt.markDistance, pt.markDiameter, pt.markDiameter),
            // right top
            this.layer.pathItems.ellipse(top - pt.markDistance, right - pt.markDistance - pt.markDiameter, pt.markDiameter, pt.markDiameter),
            // left bottom
            this.layer.pathItems.ellipse(bottom + pt.markDistance + pt.markDiameter, left + pt.markDistance, pt.markDiameter, pt.markDiameter),
            // right bottom
            this.layer.pathItems.ellipse(bottom + pt.markDistance +pt.markDiameter, right - pt.markDistance - pt.markDiameter, pt.markDiameter, pt.markDiameter),
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


// TODO: Move call to ScriptUI dialog
var pm = new PlotterMarks(app.activeDocument, 'Vulcan FC-500VC');

pm.run();

