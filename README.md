<h1>Example scripts for enriching cidr block data with numeric representations of cidr blocks</h1>
<p> This project provides examples for enriching cidr block data to make it easier to query in MongoDB </p>

<h6>Sample:</h6>

CIDR blocks inserted are: (Indexed on ipAddress - ascending)

 
<code>192.168.100.14/22</code><br>
<code>192.168.100.14/16</code><br>
<code>192.168.100.14/24</code><br>
<code>192.168.100.14/4</code><br>
<code>192.168.100.13/28</code><br>
<code>192.168.100.14/16</code><br>

 

Case-1

Searching for IP - 192.168.100.15 is not returning any. Expected result is 192.168.100.13/28 as this is smaller block (16 IPs) & contains IP=192.168.100.15

<code>> db.subscriber.find({"ipAddress":{$regex:'^192.168.100.15.*'}}).sort({"ipAddress":1}).limit(1)</code>

 

Case-2

Searching for IP - 192.168.101.14 is not returning any. Expected result is 192.168.100.14/22 as this is smaller block(1024 IPs) & contains IP=192.168.101.14

<code>> db.subscriber.find({"ipAddress":{$regex:'^192.168.101.14.*'}}).sort({"ipAddress":1}).limit(1)<code>