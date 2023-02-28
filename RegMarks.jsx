

function RegMarks(doc, plotter) {
    this.doc = doc;
    this.layerName = 'plotter_marks';
}

RegMarks.PROFILES = {
    'Vulcan FC-500VC': {
        'markDistance': new UnitValue(10.0, 'mm').as('pt'),
        'markDiameter': new UnitValue(5.0, 'mm').as('pt'),
    }
};

RegMarks.prototype._getLayer = function() {
    try {
        return this.doc.layers.getByName(this.layerName);
    } catch (e){
        return null;
    }
}

RegMarks.prototype._createLayer = function() {
    if (this._getLayer()){
        throw 'Layer "' + this.layerName + '" already exist';
    }

    var l = this.doc.layers.add();
    l.name = this.layerName;

    // Move layer to the end of list
    l.locked = false;
    l.move(this.doc, ElementPlacement.PLACEATEND);
    l.locked = true

    return l;
}

RegMarks.prototype._clearLayer = function() {
    var l = this._getLayer();

    if (!l) {
        $.writeln('Layer "' + this.layerName + '" not exist, nothing to clear')
        return;
    }

    l.locked = false; // Unlock layer

    while (l.pageItems.length > 0){
        var item = l.pageItems[0];
        //$.writeln('Deleting item: ' + item.name);
        l.pageItems[0].remove();
    }


    l.locked = true; // Lock layer
}

RegMarks.prototype.deleteLayer = function() {
    var l = this._getLayer();

    if (!l) {
        $.writeln('Layer "' + this.layerName + '" not exist, nothing to delete')
        return false;
    }

    l.locked = false; // Unlock layer
    l.remove();

    return true;
}


RegMarks.prototype.generateMarks = function(profileName){

    if (!(profileName in RegMarks.PROFILES)) {
        throw 'Unknown profile "' + profileName;
    }

    var p = RegMarks.PROFILES[profileName];

    var l = this._getLayer();
    if (!l) {
        l = this._createLayer();
    }

    this._clearLayer();

    l.locked = false; // Unlock layer

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

        $.writeln('Creating regmarks for artboard: "' + ab.name + '", size: [' + abRect + '] (' + width + '*' + height + ')');

        // Create circle in each corner.
        // pathItems.ellipse([top][, left][, width][, height])
        var marks = [
            // left top
            l.pathItems.ellipse(top - p.markDistance, left + p.markDistance, p.markDiameter, p.markDiameter),
            // right top
            l.pathItems.ellipse(top - p.markDistance, right - p.markDistance - p.markDiameter, p.markDiameter, p.markDiameter),
            // left bottom
            l.pathItems.ellipse(bottom + p.markDistance + p.markDiameter, left + p.markDistance, p.markDiameter, p.markDiameter),
            // right bottom
            l.pathItems.ellipse(bottom + p.markDistance +p.markDiameter, right - p.markDistance - p.markDiameter, p.markDiameter, p.markDiameter),
        ];

        marks[0].name = ab.name + ' [left top]';
        marks[1].name = ab.name + ' [right top]';
        marks[2].name = ab.name + ' [left bottom]';
        marks[3].name = ab.name + ' [right bottom]';
    }

    l.locked = true; // Lock layer

    return true;
}


// TODO: Move call to ScriptUI dialog
var pm = new RegMarks(app.activeDocument);

pm.generateMarks('Vulcan FC-500VC');

