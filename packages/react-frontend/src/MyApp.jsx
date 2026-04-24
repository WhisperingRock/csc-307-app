// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp()
{
	const [characters, setCharacters] = useState([]); 

		
	function removeOneCharacter(index)
	{
		deleteUser(characters.at(index)._id)
			.then(() =>
				{
					const updated = characters.filter((character, i) =>
						{
							return i !== index;
						}
					);
					setCharacters(updated);
				}
			)
			.catch((error) =>
				{
					console.log(error); 
				}
			); 
	}

	function updateList(person)
	{
		postUser(person)
			.then((createdUser) => setCharacters([...characters, createdUser]))
			.catch((error) => {console.log(error);});
	}

	function fetchUsers()
	{
		const promise = fetch("http://localhost:8000/users");
		return promise; 
	}

	function postUser(person)
	{
		const promise = fetch("http://localhost:8000/users", 
			{
				method: "POST", 
				headers: 
				{
					"Content-Type": "application/json",
				},
				body: JSON.stringify(person), 
			}
		)
		.then((res) => 
			{
				if (res.status !== 201)
				{
					//throw new Error(`Wrong status: ${res.status}`); 
					return Promise.reject();
				}
				else
				{
					return res.json();
				}
			}
		);

		return promise; 
	}

	function deleteUser(_id)
	{
		return fetch(`http://localhost:8000/users/${_id}`, 
			{
				method: "DELETE", 
				headers: 
				{
					"Content-Type": "application/json",
				},
			},
		)
		.then((res) => 
			{
				if(res.status === 404)
				{
					throw new Error(res.statusText); 
				}
			}
		);
	}

	useEffect(() => 
		{
		fetchUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => {console.log(error);});
		},
		[]
	);
	

	return(
		<div className="container">
			<Table 
				characterData={characters} 
				removeCharacter={removeOneCharacter}
			/>
			<Form handleSubmit={updateList} />
    	</div>
	);
}
export default MyApp;
