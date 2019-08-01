var IpSubnetCalculator = require('ip-subnet-calculator'); //This library calculates additional helpful informaiton when given an IP address as an input. Something similar is likely available in maven or gradle
const MongoClient = require('mongodb').MongoClient;

function getLowAndHighIP(block) {
    var ip = block.split("/")[0];
    var prefixSize = block.split("/")[1];
    return IpSubnetCalculator.calculateSubnetMask(ip, prefixSize);
}

//create mongodb client - provide connection string
var mongoClient = new MongoClient("mongodb://localhost");

//establish connection to mongodb
mongoClient.connect((err,client) => {
    if(err){
        console.log(err);
    }

    var collection = client.db('test').collection('cidr_blocks');

    //Find documents that have not been enriched with additional IP information
    collection.find({"invertedMask":{$exists:false}},function(err,result){
        if(err){
            console.log(err);
        }

        var counter = 0;

        //Iterate through result set and add details such as numeric conversion for minimum ip, max ip, and subnet mask
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
