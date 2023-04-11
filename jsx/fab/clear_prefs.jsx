//@include "../CutterToolsPrefs.jsxinc"
//@include "../lib/Utils.jsxinc"

try {
    CutterToolsPrefs.clearAll();
    alert('Preferences were cleared.');
} catch (e) {
    Utils.handleException(e);
}