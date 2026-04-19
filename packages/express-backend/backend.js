// backend.js

import express from "express"; //express = HTTP middleware dispatch
import cors from "cors";

const app = express(); 	// instance of express
const port = 8000;	 	// listening port

// hardcoding a table (for now)
const users = 
{
	users_list: 
	[
		{
			id: "xyz789",
			name: "Charlie",
			job: "Janitor",
		},
		{
			id: "abc123",
			name: "Mac",
			job: "Bouncer",
		},
		{
			id: "ppp222",
			name: "Mac",
			job: "Professor",
		},
		{
			id: "yat999",
			name: "Dee",
			job: "Aspring actress",
		},
		{
			id: "zap555",
			name: "Dennis",
			job: "Bartender",
		},
	],
};

app.use(cors());
app.use(express.json());// format incoming data as JSON


// Retrieve the desired user (if exists)
const findUserByName = (name) =>
{
	return users["users_list"].filter((user) => 
		user["name"] === name);
};

const findUserById = (id) =>
{
	return users["users_list"].find((user) => //return first found instance w/ find()
		user["id"] === id);
}

const addUser = (user) => {

	users["users_list"].push(user);
	return user;
};

const deleteUserById = (id) => {
	// Purpose : delete user (by filtering)
	// Input : requested id of user
	// Output : bool if id was found (and deleted)
	// Note : difference in length before/after will let us
	// 			know if a id was found and deleted.

	const idToRemove = findUserById(id); 	

	if(idToRemove === undefined){return undefined;}

	users.users_list = users.users_list
							.filter((user) =>
								user.id !== id
							); 
};

const findUserByNameAndJob = (name, job) =>
{
	return users["users_list"]
		.filter((user) => user["name"] === name && 
			user["job"] === job)
};


		
// Specific user if exists or user table if desired DNE
app.get("/users", (req, res) =>   
	{
		const name = req.query.name;
		const job = req.query.job;
		
		if(name != undefined && job != undefined)
		{
			let result = findUserByNameAndJob(name, job);
			result = {users_list: result};
			res.send(result);
		}
		else if(name != undefined)
		{
			let result = findUserByName(name);
			result = {users_list: result};
			res.send(result);
		}
		else
		{
			res.send(users);
		}
	}
);

// HW at home directory
app.get("/", (req, res) =>   
	{
		res.send("Hello World!");
	}
);

app.get("/users/:id", (req, res) =>
	{
		const id = req.params["id"]; 
		let result = findUserById(id);
		if(result === undefined)
		{
			res.status(404).send("Resource not found.");
		}
		else
		{
			res.send(result);
		}

	}
);

app.post("/users", (req, res) => 
	{
		const userToAdd = {id: Math.floor(Math.random() * 10000).toString(),
			...req.body};
		const added = addUser(userToAdd);
		res.status(201).send(added);
	}
);


app.delete("/users/:id", (req, res) =>
	{
		const id = req.params["id"]; 
		let result = deleteUserById(id);

		if(result === false)
		{
			res.status(404).send("Resource not found.");
		}
		else
		{
			res.status(204).send();
		}
	}
);


app.listen(port, () => 
	{
		console.log(`Example app listening at http://localhost:${port}`);
	}
);


