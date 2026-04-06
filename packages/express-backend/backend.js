// backend.js

import express from "express"; //express = HTTP middleware dispatch

const app = express(); 	// instance of express
const port = 8000;	 	// listening port

app.use(express.json());// format incoming data as JSON

// Respond with plain-text
app.get("/", (req, res) =>   //first arg, "/" is URL pattern, other is callback func
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
