# Cutter Tools plugin for Adobe Illustrator

Plugin designed to replace [Signcut] plugin for Adobe Illustrator to make work with Cutters more easy.

## Features

* Create registration marks for all Artboards
* Support Symbols
* Export 3 PDF versions: *PRINT*, *CUT* and *ALL* version.

## Installation on Windows with cmd (recommended)

1. [Download] repo, unzip to any folder.
2. Run [install_windows.cmd](install_windows.cmd) from the extracted folder.
5. Logout, login and Launch Adobe Illustrator.


## Manual installation (Windows/MacOS)

1. [Download] repo, unzip and move folder into the extensions folder

    **NOTE:** You need to create folder if it does not exist.

    **Win:** `%APPDATA%\AppData\Roaming\Adobe\CEP\extensions`

    **Mac:** `~/Library/Application Support/Adobe/CEP/extensions`

2. Set `PlayerDebugMode` to 1 (enable run of the unsigned plugins).

    ### With script (recommended)

    **Win:** Run [install/windows_debug_mode.cmd](install/windows_debug_mode.cmd)

    **Mac:** Open [install/macos_debug_mode.scpt](install/macos_debug_mode.scpt) script and click *Run* in script editor.
    **NOTE:** the script covers CSXS 8-13, including Illustrator 2026 (CEP 12.1).

    ### Manual

    `PlayerDebugMode` must be set for the **CEP version your Illustrator actually uses**.
    The panel appears in the menu even with a wrong/missing flag, but stays blank,
    so check the table:

    | Illustrator | CEP runtime | Plist / registry key |
    |---|---|---|
    | 2023 - 2025 (up to v29.5) | CEP 11 | `com.adobe.CSXS.11` |
    | 2025 (v29.5.1+), 2026 (v30.x) | CEP 12 | `com.adobe.CSXS.12` |

    See compatibility tables [CEP9], [CEP11] and [CEP12].

    **Win:** `regedit > HKEY_CURRENT_USER\Software\Adobe\CSXS.<N>`,
    then add a new entry `PlayerDebugMode` of type `string` with the value of `1`.

    **Mac:** In the terminal, type:

    ```bash
    # enable for all recent CEP versions at once
    for v in 8 9 10 11 12 13; do defaults write com.adobe.CSXS.$v PlayerDebugMode 1; done
    killall cfprefsd
    ```

    Verify with `defaults read com.adobe.CSXS.12 PlayerDebugMode` (must print `1` for your CEP version).

    **May require restart or log-out/in**

### macOS specific: remove quarantine

Files downloaded with a browser are marked with the `com.apple.quarantine`
extended attribute, and the CEP HTML engine may refuse to load them
(the panel opens as a blank grey pane). Remove the attribute:

```bash
xattr -dr com.apple.quarantine ~/Library/Application\ Support/Adobe/CEP/extensions/adobe-ai-cutter-tools
```

(adjust the folder name if you renamed it)

## Usage

**NOTE:** see [samples](samples/) directory with AI samples.

1. Open *Window -> Extensions -> Cutter Tools* panel.

2. Create Registration marks.

3. At any layer of document or Symbols create **groups** with names: *Print* and *Cut*.
This layers will be used in the resulting PDFs.

4. Export PDFs:

* *PRINT* - Version for printing. Default profile is *PDF/X-3:2002*.
* *CUT* - Version for cutting. Default profile is *PDF/X-3:2002* which is acceptable to import to [SignCut].
* *ALL* - Version for preview. Has Layers *Cut* and *Print*. Default profile is default AI multi-layer profile.

**NOTE:**  You can choose any other user-defined profile in the Export dialog.

## Troubleshooting

### Extension panel content does not show (blank / grey panel)

1. Make sure you set `PlayerDebugMode` to `1` for the **correct CSXS version**
   (see the table above; Illustrator 2026 needs `CSXS.12`) and you have rebooted
   your computer.

2. On macOS, remove the quarantine attribute (see *macOS specific* section above).

3. Clear the CEP cache (quit Illustrator first):

   ```bash
   rm -rf ~/Library/Caches/CSXS/cep_cache
   ```

   On Windows the cache is `%LOCALAPPDATA%\Temp\cep_cache`.

4. **Reported CEP issue** (not confirmed by Adobe yet): on *Illustrator 2026 / CEP 12.1 /
   Apple Silicon* CEP panels may randomly render as an empty grey pane for the whole session
   ([Adobe-CEP/CEP-Resources issue #553][CEPBlankPanel]).
   Closing/reopening the panel does not help — only a **full restart of Illustrator**
   (quit with Cmd+Q, relaunch, open the panel again) clears it.

5. To check whether CEP itself is broken, open a built-in CEP panel
   such as *Window -> Libraries*. If it is blank too,
   the problem is the Illustrator CEP runtime, not this plugin.

6. CEP logs are in `~/Library/Logs/CSXS` (Windows: `%LOCALAPPDATA%\Temp`):
   `CEP<N>-ILST.log` and `CEPHtmlEngine<N>-ILST-<version>-com.hackercb.cuttertools*.log`.
   For more detail raise the log level and restart Illustrator:

   ```bash
   defaults write com.adobe.CSXS.12 LogLevel 6
   ```

### Using the plugin without the panel

All functionality is implemented as ExtendScript scripts; the panel only calls them.
You can run the scripts directly via *File -> Scripts -> Other Script (Cmd+F12)*:

| Script | Action |
|---|---|
| `jsx/regmarks/fab/open_regmarks_dialog.jsx` | Registration marks dialog |
| `jsx/export/fab/export_print_and_cut.jsx` | Export PRINT / CUT / ALL PDFs |
| `jsx/fab/clear_prefs.jsx` | Reset plugin preferences |

You can also bind the scripts to keyboard shortcuts through the *Actions* panel.

## Tested with

* macOS (Apple Silicon) + Adobe Illustrator 2026 (v30.x, CEP 12.1) — manual installation,
  panel works after enabling `PlayerDebugMode` for `CSXS.12` and removing quarantine.

[Download]: https://github.com/hacker-cb/adobe-ai-cutter-tools/archive/master.zip
[SignCut]: http://signcutpro.com
[CEP9]: https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_9.x/Documentation/CEP%209.0%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep
[CEP11]: https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/Documentation/CEP%2011.1%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep
[CEP12]: https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_12.x/Documentation/CEP%2012%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep
[CEPBlankPanel]: https://github.com/Adobe-CEP/CEP-Resources/issues/553
