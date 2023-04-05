//@include "../CutterToolsPrefs.jsxinc"

try {
    CutterToolsPrefs.clearAll();
    alert('Preferences were cleared.');
} catch (e) {
    $.writeln('ERROR: "' + e.message + '" ' + e.fileName + ":" + e.line);
    alert(e.message + "\n(" + (new File(e.fileName)).name + " line " + e.line + ")");
}