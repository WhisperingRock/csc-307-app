// backend.js

import express from "express"; //express = HTTP middleware dispatch

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

// Retrieve the desired user (if exists)
const findUserByName = (name) =>
{
	return users["users_list"].filter((user) => 
		user["name"] === name);
};

app.use(express.json());// format incoming data as JSON

// Specific user if exists or user table if desired DNE
app.get("/users", (req, res) =>   
	{
		const name = req.query.name;
		if(name != undefined)
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


// backend just listening
app.listen(port, () => 
	{
		console.log(`Example app listening at http://localhost:${port}`);
	}
);


