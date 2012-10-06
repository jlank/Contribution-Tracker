#!/bin/bash

while read p; do
  cat ./html/$p | grep docdate | awk -F'>' '{ print $7 }' | cut #> text/`echo $p'`.txt
  exit
done < "${1:-/proc/${$}/fd/0}"