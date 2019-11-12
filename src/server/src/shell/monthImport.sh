npm run shell DownloadSirene
npm run shell ImportSirene --enterprises_filename /tmp/StockUniteLegale_utf8_small.zip --establishments_filename /tmp/StockEtablissement_utf8_small.zip
rm -f /tmp/StockUniteLegale_utf8_small.zip
rm -f /tmp/StockEtablissement_utf8_small.zip

npm run appsearch-indexer
