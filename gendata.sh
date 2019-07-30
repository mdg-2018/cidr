mgeneratejs -n 1000000 cidr.json | mongoimport --db test --collection cidr_blocks

#mongoimport --db test --collection cidr_blocks sampledata.json --jsonArray