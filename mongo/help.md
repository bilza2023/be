

Get Into Mongo
==============

sudo docker exec -it be-mongo-1 mongosh -u taleemAdmin -p bils32611246950 --authenticationDatabase admin


once in try ==> show dbs
use taleemDB

db.createUser({
  user: "taleemAdmin",
  pwd: "bils32611246950",
  roles: [
    { role: "readWrite", db: "taleemDB" }
  ]
})

sudo docker exec -it taleem-mongo-server mongosh -u taleemAdmin -p bils32611246950 --authenticationDatabase taleemDB

mongodb://taleemAdmin:bils32611246950@mongo:27017/taleemDB?authSource=admin
mongodb://taleemAdmin:bils32611246950@mongo:27017/taleemDB?authSource=taleemDB


