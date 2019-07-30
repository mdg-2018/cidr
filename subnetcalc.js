var IpSubnetCalculator = require('ip-subnet-calculator');
const MongoClient = require('mongodb').MongoClient;

function getLowAndHighIP(block) {
    var ip = block.split("/")[0];
    var prefixSize = block.split("/")[1];
    return IpSubnetCalculator.calculateSubnetMask(ip, prefixSize);
}

var mongoClient = new MongoClient("mongodb://localhost");

mongoClient.connect((err,client) => {
    if(err){
        console.log(err);
    }

    var collection = client.db('test').collection('cidr_blocks');

    collection.find({"invertedMask":{$exists:false}},function(err,result){
        if(err){
            console.log(err);
        }

        var counter = 0;

        result.forEach(function(doc){
            var ipdetails = getLowAndHighIP(doc.cidr_block);
            ipdetails.prefixSize = parseInt(ipdetails.prefixSize,10);
            collection.updateOne({"_id":doc._id},{$set:ipdetails}).then(function(result){
                counter ++;
                if(counter % 100 == 0){
                    console.log("Modified: " + counter);
                }
            })
        })
        
    })

})
