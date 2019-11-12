npm run shell DownloadSirene
npm run shell ImportSirene --enterprises_filename StockUniteLegale_utf8_small.zip --establishments_filename StockEtablissement_utf8_small.zip
rm -f StockUniteLegale_utf8_small.zip
rm -f StockEtablissement_utf8_small.zip

npm run appsearch-indexer
