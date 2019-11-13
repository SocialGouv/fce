npx ./shell/run.js DownloadSirene
npx ./shell/run.js ImportSirene --enterprises_filename StockUniteLegale_utf8.zip --establishments_filename StockEtablissement_utf8.zip
rm -f StockUniteLegale_utf8.zip
rm -f StockEtablissement_utf8.zip

npx scripts/appsearchIndexer.js
