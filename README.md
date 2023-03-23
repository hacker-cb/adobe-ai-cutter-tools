# Cutter Tools plugin for Adobe Illustrator

Plugin designed to replace [Signcut] plugin for Adobe Illustrator to make work woth Cutters more easy.

## Features

* Create registration marks for all Artboards
* Support Symbols
* Export 3 PDF: *PRINT*, *CUT* and *ALL* version.

## Installation

1. [Download] repo, unzip and move folder into the extensions folder

**Win:** `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions`
**Mac:** `/Library/Application Support/Adobe/CEP/extensions`

or

**Win:** `C:\<username>\AppData\Roaming\Adobe\CEP\extensions`
**Mac:** `~/Library/Application Support/Adobe/CEP/extensions`

2. Set `PlayerDebugMode` to 1.

This need becuase plugin is unsigned.

**CEP Version below is suitable with AI 2023!**

You have to replace it with correct one for your application!
See compatibility tables [CEP9](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_9.x/Documentation/CEP%209.0%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep)
and [CEP11](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/Documentation/CEP%2011.1%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep)

### How to set `PlayerDebugMode`:

**Win:** `regedit > HKEY_CURRENT_USER/Software/Adobe/CSXS.11`,
then add a new entry PlayerDebugMode of type "string" with the value of "1".

**Mac:** In the terminal, type: `defaults write com.adobe.CSXS.11 PlayerDebugMode 1`
(The plist is also located at `~/Library/Preferences/com.adobe.CSXS.11.plist`

**May require restart or log-out/in**

More info here: [Adobe CEP Cookbok Resources]

## Usage

NOTE: see [samples](samples/) directory with AI samples.

1. Open *Window -> Extensions -> Cutter Tools* panel.

2. At any layer of document or Symbols create **groups** with names: *Print* and *Cut*.
This layers will be used in the resulting PDFs.

3. Export PDFs:

* *PRINT* - Version for printing. Default profile is *PDF/X-3:2002*.
* *CUT* - Version for cutting. Default profile is *PDF/X-3:2002* which is acceptable to import to [SignCut].
* *ALL* - Version for preview. Has Layers *Cut* and *Print*. Default profile is default AI pofile.

NOTE: You can choose any other user-defined profile in the Export dialog.

[Download]: https://github.com/majman/ai-scripts-panel/archive/master.zip
[SignCut]: http://signcutpro.com
[Adobe CEP Cookbok Resources]: https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md