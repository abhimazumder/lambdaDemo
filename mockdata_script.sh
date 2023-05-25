#!/bin/bash

URL="https://clsrit41f6.execute-api.ap-south-1.amazonaws.com/dev/addaddress"
fullnames=("abhishek" "prakhar" "ankit" "rishabh" "manish" "abhinav" "narayan" "anil" "ayush" "rohan")
addresses=("kolkata" "guwahati" "jaipur" "chennai" "pune" "lucknow" "ahmedabad" "pune" "mumbai" "goa")
phones=(9900 9090 0099 0909 9898 9988 8899 9898 7878 8787)

for ((i=0; i<10; i++))
do
    echo "Sending POST request $((i+1))..."
    PAYLOAD="{\"fullname\":\"${fullnames[$i]}\",\"address\":\"${addresses[$i]}\",\"phone\":\"${phones[$i]}\"}"
    curl -X POST -H "Content-Type: application/json" -d "$PAYLOAD" "$URL"
    echo "Request $((i+1)) complete."
done
