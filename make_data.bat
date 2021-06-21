@echo OFF

SET CUR_DIR=%~dp0
SET TOOL=%CUR_DIR%\tools\ExcelParser.js
SET TEXT_DATA=%CUR_DIR%\data\text.xlsx
SET OUTPUT=%CUR_DIR%\src\Translations

node %TOOL% %TEXT_DATA% %OUTPUT%
