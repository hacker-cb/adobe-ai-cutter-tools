# Cutter Tools plugin for Adobe Illustrator

Plugin designed to replace [Signcut] plugin for Adobe Illustrator to make work with Cutters more easy.

## Features

* Create registration marks for all Artboards
* Support Symbols
* Export 3 PDF versions: *PRINT*, *CUT* and *ALL* version.

## Installation

1. [Download] repo, unzip and move folder into the extensions folder

    NOTE: You need to create folder if it does not exist.

    **Win:** `%APPDATA%\AppData\Roaming\Adobe\CEP\extensions`

    **Mac:** `~/Library/Application Support/Adobe/CEP/extensions`

2. Set `PlayerDebugMode` to 1 (enable run of the unsigned plugins).

    **CEP Version below (CEP 11) is suitable with AI 2023!**
    You have to replace it with correct one for your application!
    See compatibility tables [CEP9] and [CEP11].

    **Win:** `regedit > HKEY_CURRENT_USER\Software\Adobe\CSXS.11`,
    then add a new entry `PlayerDebugMode` of type `string` with the value of `1`.

    **Mac:** In the terminal, type: `defaults write com.adobe.CSXS.11 PlayerDebugMode 1`
    (The plist is also located at `~/Library/Preferences/com.adobe.CSXS.11.plist`

    **May require restart or log-out/in**

## Usage

*NOTE: *see [samples](samples/) directory with AI samples.

1. Open *Window -> Extensions -> Cutter Tools* panel.

2. Create Registration marks.

3. At any layer of document or Symbols create **groups** with names: *Print* and *Cut*.
This layers will be used in the resulting PDFs.

4. Export PDFs:

* *PRINT* - Version for printing. Default profile is *PDF/X-3:2002*.
* *CUT* - Version for cutting. Default profile is *PDF/X-3:2002* which is acceptable to import to [SignCut].
* *ALL* - Version for preview. Has Layers *Cut* and *Print*. Default profile is default AI multi-layer profile.

NOTE: You can choose any other user-defined profile in the Export dialog.

[Download]: https://github.com/hacker-cb/adobe-ai-cutter-tools/archive/master.zip
[SignCut]: http://signcutpro.com
[CEP9]: https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_9.x/Documentation/CEP%209.0%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep
[CEP11]: https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/Documentation/CEP%2011.1%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep