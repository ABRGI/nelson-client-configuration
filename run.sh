#!/bin/bash

# Script to run this on a dedicated server or local dev instance
# To stop the process, run command ps aux | grep http-serve
# Then find the process id for the correct port and run kill <PID>
# Or run command kill $(lsof -t -i :<PORT>) to find the process id and kill it
# To see the logs in action, run command tail -f logs.log

current_datetime=$(date +%Y%m%d_%H%M%S)
logs_folder="logs"
log_file="$logs_folder/logs.log"

if [ ! -d "$logs_folder" ]; then
    mkdir "$logs_folder"
    echo "Created logs folder"
fi

if [ -f "$log_file" ]; then
    cp "$log_file" "$logs_folder/logs_${current_datetime}.log"
    echo "logs.log has been copied to $logs_folder/logs_${current_datetime}.log"
else
    echo "logs.log does not exist in the logs folder"
fi

PORT=4000
CLIENT=demo
npm run start $CLIENT $PORT> logs/logs.log 2>&1 &

echo "serving $CLIENT on port $PORT"