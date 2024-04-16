#!/bin/bash

ytarchive $@ &
PID=$!
echo "Script is running with PID: $PID. Press Ctrl+C to stop..."

handle_signal() {
    echo -e "\n$1 trapped. Exiting gracefully..."
    echo -e "Killing subprocess $PID with SIGINT..."
    kill -SIGINT $PID
    exit 0
}

trap 'handle_signal SIGINT' SIGINT
trap 'handle_signal SIGTERM' SIGTERM
trap 'handle_signal SIGKILL' SIGKILL

wait $PID