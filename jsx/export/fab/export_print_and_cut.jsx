//@include "../../../lib/underscore-umd.js"
//@include "../Exporter.jsxinc"

(function(){
    /*
    Code for Import https://scriptui.joonas.me — (Triple click to select):
    {"activeId":3,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"exportDialog","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":false,"borderless":false,"resizeable":false},"text":"PlotterTools export","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["fill","top"]}},"item-1":{"id":1,"type":"Progressbar","parentId":8,"style":{"enabled":true,"varName":"progressBar","preferredSize":[400,16],"alignment":null,"helpTip":null}},"item-3":{"id":3,"type":"StaticText","parentId":8,"style":{"enabled":true,"varName":"currentOperation","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Idle","justify":"left","preferredSize":[0,0],"alignment":"fill","helpTip":null}},"item-4":{"id":4,"type":"Button","parentId":5,"style":{"enabled":false,"varName":"startButton","text":"Run","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"Group","parentId":0,"style":{"enabled":true,"varName":"buttonsGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-6":{"id":6,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"closeButton","text":"Close","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"progressPanel","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-9":{"id":9,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"artboardsPanel","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Artboards","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["fill","top"],"alignment":null}},"item-10":{"id":10,"type":"ListBox","parentId":9,"style":{"enabled":true,"varName":"artboardsList","creationProps":{"multiselect":true,"numberOfColumns":"1","columnWidths":"[]","columnTitles":"[]","showHeaders":false},"listItems":"","preferredSize":[0,200],"alignment":null,"helpTip":null,"selection":[0]}}},"order":[0,9,10,8,3,1,5,4,6],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":false,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"none"}}
    */

    // EXPORTDIALOG
    // ============
    var exportDialog = new Window("dialog", undefined, undefined, {closeButton: false});
    exportDialog.text = "PlotterTools export";
    exportDialog.orientation = "column";
    exportDialog.alignChildren = ["fill","top"];
    exportDialog.spacing = 10;
    exportDialog.margins = 16;

    // ARTBOARDSPANEL
    // ==============
    var artboardsPanel = exportDialog.add("panel", undefined, undefined, {name: "artboardsPanel"});
    artboardsPanel.text = "Artboards";
    artboardsPanel.orientation = "column";
    artboardsPanel.alignChildren = ["fill","top"];
    artboardsPanel.spacing = 10;
    artboardsPanel.margins = 10;

    var artboardsList = artboardsPanel.add("listbox", undefined, undefined, {name: "artboardsList", multiselect: true});
    artboardsList.selection = 0;
    artboardsList.preferredSize.height = 200;

    // PROGRESSPANEL
    // =============
    var progressPanel = exportDialog.add("panel", undefined, undefined, {name: "progressPanel"});
    progressPanel.orientation = "column";
    progressPanel.alignChildren = ["left","top"];
    progressPanel.spacing = 10;
    progressPanel.margins = 10;

    var currentOperation = progressPanel.add("statictext", undefined, undefined, {name: "currentOperation"});
    currentOperation.text = "Idle";
    currentOperation.alignment = ["fill","top"];

    var progressBar = progressPanel.add("progressbar", undefined, undefined, {name: "progressBar"});
    progressBar.maxvalue = 100;
    progressBar.value = 50;
    progressBar.preferredSize.width = 400;
    progressBar.preferredSize.height = 16;

    // BUTTONSGROUP
    // ============
    var buttonsGroup = exportDialog.add("group", undefined, {name: "buttonsGroup"});
    buttonsGroup.orientation = "row";
    buttonsGroup.alignChildren = ["center","center"];
    buttonsGroup.spacing = 10;
    buttonsGroup.margins = 0;

    var startButton = buttonsGroup.add("button", undefined, undefined, {name: "startButton"});
    startButton.enabled = false;
    startButton.text = "Run";

    var closeButton = buttonsGroup.add("button", undefined, undefined, {name: "closeButton"});
    closeButton.text = "Close";




    //////////////////////////////////////////////////////////////
    // Initial fixes
    //////////////////////////////////////////////////////////////
    var IDLE_TEXT = "Idle";
    var DONE_TEXT = "Done!";

    progressBar.value = 0;
    currentOperation.text = IDLE_TEXT;

    //////////////////////////////////////////////////////////////
    // Local functions
    //////////////////////////////////////////////////////////////
    var doc = app.activeDocument;

    var fillArtBoardsList = function() {
        var doc = app.activeDocument;

        var abNames = [];
        for (var i = 0; i < doc.artboards.length; i++) {
            abNames.push(doc.artboards[i].name);
        }

        // Sort artboards by name
        abNames.sort();

        // Remove all items from the list
        // artboardsList.items.removeAll();

        // Add items to the list
        for (var i = 0; i < abNames.length; i++) {
            artboardsList.add("item", abNames[i]);
        }
    };

    //////////////////////////////////////////////////////////////
    // Setup handlers
    //////////////////////////////////////////////////////////////
    artboardsList.onChange = function() {
        if (this.selection){
            startButton.enabled = true;
        } else {
            startButton.enabled = false;
        }
    };

    startButton.onClick = function() {
        progressBar.value = 0;
        startButton.enabled = false;
        closeButton.enabled = false;

        if (!artboardsList.selection){
            alert("Please select at least one artboard");
            return;
        }

        //Run
        try {
            var progress = new Progress(function(stage, totalProgress){
                progressBar.value = totalProgress;
                currentOperation.text = stage;
                exportDialog.update();
                // $.writeln("Progress: " + stage + " " + totalProgress);
            });

            var artboardIndexes = [];
            for (var i = 0; i < artboardsList.selection.length; i++) {
                var sel = artboardsList.selection[i];
                var abIndex = _.indexOf(doc.artboards, doc.artboards.getByName(sel.text));
                artboardIndexes.push(abIndex);
            }

            var options = {
                exportTypes: {
                    ALL: true,
                    CUT: true,
                    PRINT: true
                },
                exportPresets: {
                    // FIXME: Fill from dialog elements
                    ALL: '[PDF/X-4:2008]',
                    CUT: '[PDF/X-3:2002]',
                    PRINT: '[PDF/X-3:2002]'
                }
            };

            Exporter.run(doc, artboardIndexes, options, progress);

            $.writeln('Export done!');
            currentOperation.text = DONE_TEXT;
        } catch (e) {
            $.writeln('Export error: ' + e);
            alert(e);
        }

        startButton.enabled = true;
        closeButton.enabled = true;
    };

    closeButton.onClick = function() {
        exportDialog.close();
    };


    //////////////////////////////////////////////////////////////
    // Run
    //////////////////////////////////////////////////////////////

    fillArtBoardsList();
    exportDialog.show();

    return true;
})();
