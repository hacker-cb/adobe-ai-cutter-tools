@echo off
cls 

set plugin_folder_src_dir=%~p0%
set plugin_dst_folder_basename=adobe-ai-cutter-tools


echo Source dir: %plugin_folder_src_dir%

set cep_dir=%APPDATA%\Adobe\CEP

IF exist %cep_dir% (
	echo CEP dir exists: %cep_dir%
) ELSE (
	echo Creating %cep_dir%
	mkdir %cep_dir% > nul
	if %errorlevel% NEQ 0 (goto exit_error)
	echo Created dir: %cep_dir%
)

set cep_ext_dir=%APPDATA%\Adobe\CEP\extensions
IF exist %cep_ext_dir% (
	echo CEP dir exists: %cep_ext_dir%
) ELSE (
	echo Creating %cep_ext_dir%
	mkdir %cep_ext_dir% > nul
	if %errorlevel% NEQ 0 (goto exit_error)
	echo Created dir: %cep_ext_dir%
)


set install_dir=%APPDATA%\Adobe\CEP\extensions\%plugin_dst_folder_basename%
IF exist %install_dir% (
	echo Removing old installation from %install_dir%	
    rmdir /s /q %install_dir% > nul
	if %errorlevel% NEQ 0 (goto exit_error)
	echo Old installation removed
)

echo Creating %install_dir%
mkdir %install_dir% > nul
if %errorlevel% NEQ 0 (goto exit_error)
echo Dir created: %install_dir%

echo Copying plugin to "%install_dir%"
xcopy "%plugin_folder_src_dir%" "%install_dir%" /e /k /h /i > nul
if %errorlevel% NEQ 0 (goto exit_error)

echo Updating registry: CEP8
@REG ADD HKCU\Software\Adobe\CSXS.8 /f /v PlayerDebugMode /t REG_SZ /d 1 > nul
if %errorlevel% NEQ 0 (goto exit_error)

echo Updating registry: CEP9
@REG ADD HKCU\Software\Adobe\CSXS.9 /f /v PlayerDebugMode /t REG_SZ /d 1 > nul
if %errorlevel% NEQ 0 (goto exit_error)

echo Updating registry: CEP10
@REG ADD HKCU\Software\Adobe\CSXS.10 /f /v PlayerDebugMode /t REG_SZ /d 1 > nul
if %errorlevel% NEQ 0 (goto exit_error)

echo Updating registry: CEP11
@REG ADD HKCU\Software\Adobe\CSXS.11 /f /v PlayerDebugMode /t REG_SZ /d 1 > nul
if %errorlevel% NEQ 0 (goto exit_error)

echo .
echo =========================================
echo Succsess: Plug-in installed
echo =========================================
echo .
echo Press ENTER to close window
pause

exit 0

:exit_error

echo .
echo =========================================
echo ERROR
echo =========================================
echo .
echo Press ENTER to close window
pause

exit 1
