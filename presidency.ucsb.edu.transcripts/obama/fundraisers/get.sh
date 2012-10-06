#!/bin/bash

while read p; do
  curl -s $p > html/`echo $p | awk -F= '{ print $3 }'`.html
done < "${1:-/proc/${$}/fd/0}" 