#!/bin/sh

# Note : quotations needed for http addressing

printf "\n\n\n| ~~~~~~~~ Entire List ~~~~ |\n\n"

curl "http://localhost:8000/users"


printf "\n\n| ~~~~~~~~ POST id:qwe123 ~~~~ |\n\n"
curl -X POST http://localhost:8000/users \
	 -H "Content-Type: application/json" \
  	 -d '{"id":"qwe123","job":"Zookeeper","name":"Cindy"}'
curl http://localhost:8000/users




printf "\n\n\n| ~~~~~~~~ DELETE id:xyz789 ~~~~ |\n"
curl -X DELETE "http://localhost:8000/users/xyz789"
curl "http://localhost:8000/users"



printf "\n\n\n| ~~~~~~~~ GET by name (Mac) ~~~~ |\n\n"
curl "http://localhost:8000/users?name=Mac"

printf "\n\n\n| ~~~~~~~~ GET by name and job (Mac, Bouncer) ~~~~ |\n\n"
curl "http://localhost:8000/users?name=Mac&job=Bouncer"

printf "\n\n\n| ~~~~~~~~ Entire List ~~~~ |\n\n"
curl "http://localhost:8000/users"

printf "\n\n\n"
