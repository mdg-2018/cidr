#!/bin/bash
## Script to generate 1 million cidr blocks. Requires mgeneratejs to be installed. Use "npm install -g mgeneratejs"

mgeneratejs -n 1000000 cidr.json | mongoimport --db test --collection cidr_blocks

#mongoimport --db test --collection cidr_blocks sampledata.json --jsonArray