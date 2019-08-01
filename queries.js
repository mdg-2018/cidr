//Sample find command

db.cidr_blocks.find({ "ipHigh": { "$gte": 3232265241 }, "ipLow": { "$lte": 3232265241 } }).sort({ "prefixMask": -1 }).pretty()