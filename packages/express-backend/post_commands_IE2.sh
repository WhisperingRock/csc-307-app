#!/bin/sh
curl -X POST http://localhost:8000/users \
	 -H "Content-Type: application/json" \
  	 -d '{"id":"qwe123","job":"Zookeeper","name":"Cindy"}'

curl http://localhost:8000/users
