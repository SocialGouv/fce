npx ./shell/run.js DownloadSirene
npx ./shell/run.js ImportSirene --enterprises_filename StockUniteLegale_utf8_small.zip --establishments_filename StockEtablissement_utf8_small.zip
rm -f StockUniteLegale_utf8_small.zip
rm -f StockEtablissement_utf8_small.zip

npx scripts/appsearchIndexer.js
