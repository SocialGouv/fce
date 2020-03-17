#!/bin/bash
set -ex

start_date=$(date)
start_time=$(date +%s%N)

echo_exec_time() {
    a=$1
    b=$2
    diff=$((b-a))
    diff_sec=${diff:0: -9}

    echo "Execution time : ${diff_sec}s /// $((diff_sec / 60))m /// $((diff_sec / 3600))h"
}

echo "-----------------------------------------------------"
echo "START import interactions_pole_t / Date: $start_date"
echo "-----------------------------------------------------"

#
# download file
#
echo "----- START download file -----"
start_download_time=$(date +%s%N)

docker exec server ash -c "NODE_ENV=production node ./shell/run.js DownloadFile --id interactions_pole_t"

end_download_time=$(date +%s%N)
echo_exec_time "$start_download_time" "$end_download_time"


#
# import file into database
#
echo "----- START ingest file into database -----"
start_import_time=$(date +%s%N)

docker exec server ash -c "NODE_ENV=production node ./shell/run.js IngestFile --id interactions_pole_t"

end_import_time=$(date +%s%N)
echo_exec_time "$start_import_time" "$end_import_time"


echo "----- FINISH -----"
echo_exec_time "$start_time" "$end_import_time"
