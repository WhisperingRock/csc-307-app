// backend.js

import express from "express"; //express = HTTP middleware dispatch
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userServices from "./services/user-service.js"; 


dotenv.config();
const {MONGO_USER, MONGO_PWD, MONGO_CLUSTER} = process.env;
mongoose.set("debug", true); 
mongoose
	.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}` + "users") //connect to Db "users"
	.catch((error) => console.log(error)); 

const app = express(); 	// instance of express
const port = 8000;	 	// listening port

app.use(cors());
app.use(express.json());// format incoming data as JSON




app.get("/", (req, res) =>   
	{
		res.send("Hello World!");
	}
);

app.get("/users", (req, res) =>   
	{
		const name = req.query.name;
		const job = req.query.job;
	
		userServices.getUsers(name, job)
			.then((result) => 
				{
					res.send({ users_list:result });
				})
			.catch((error) =>
				{
					console.log(error);
					res.status(500).send("error on server"); 
				});
	}
);

app.get("/users/:_id", (req, res) =>
	{
		const id = req.params["_id"]; 

		userServices.findUserById(id)
			.then((result) =>
				{
					if(result === undefined)
					{
						res.status(404).send("Resource not found.");
					}
					else
					{
						res.send({ users_list:result });
					}
				})
			.catch((error) =>
				{
					console.log(error);
					res.status(500).send("error on server"); 
				});
	}
);

app.post("/users", (req, res) => 
	{
		//const userToAdd = {id: Math.floor(Math.random() * 10000).toString(),
		//	...req.body};
		
		const userToAdd = {...req.body};


		userServices.addUser(userToAdd)
			.then((savedUser) =>
				{
					if(savedUser === undefined)
					{
						res.status(404).send("Resource not found.");
					}
					else
					{
						res.status(201).send(savedUser);
					}
				})
			.catch((error) =>
				{
					console.log(error);
					res.status(500).send("error on server"); 
				});
	}
);

app.delete("/users/:_id", (req, res) =>
	{
		const id = req.params["_id"]; 
		
		userServices.removeUserById(id)
			.then((result) =>
				{
					if(result === undefined || result === false)
					{
						res.status(404).send("Resource not found.");
					}
					else
					{
						res.status(204).send();
					}
				})
			.catch((error) =>
				{
					console.log(error);
					res.status(500).send("error on server"); 
				});

	}
);

app.listen(port, () => 
	{
		console.log(`Example app listening at http://localhost:${port}`);
	}
);


