//@include "../CutterToolsPrefs.jsxinc"

try {
    CutterToolsPrefs.clearAll();
    alert('Preferences were cleared.');
} catch (e) {
    alert('Error: ' + e);
}

