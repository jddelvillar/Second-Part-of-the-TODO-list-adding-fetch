import React, { useState, useEffect } from "react";
//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [list, setlist] = useState([]);
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/juandavid")
			.then(response => response.json())
			.then(response => {
				setlist(response);
			});
	}, []);
	const handleKeyDown = e => {
		const value = inputValue.trim();
		if (e.key === "Enter" && value !== "") {
			let listToSend = list;
			listToSend.push({ label: value, done: false });
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/juandavid",
				{
					method: "PUT",
					body: JSON.stringify(listToSend), //solo para enviar variables de JS se usa para enviar info a la API
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			setInputValue("");
		}
	};
	// recuerda no usas el Delet directamente, a traves d ela función actualizazas el listado  y si es != no entra
	const deleteList = i => {
		let updatelist = list.filter((item, index) => index != i);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/juandavid", {
			method: "PUT",
			body: JSON.stringify(updatelist), //solo para enviar variables de JS se usa para enviar info a la API
			headers: {
				"Content-Type": "application/json"
			}
		}).then(response => {
			if (response.ok) {
				// prop tipo bool
				setlist(updatelist);
			}
		});
	};
	const handleonChange = e => {
		setInputValue(e.target.value);
	};
	const DeleteItems = indexItem => {
		setlist(prevState =>
			prevState.filter((todo, index) => index !== indexItem)
		);
	};
	return (
		<div className="card shadow p-3 mb-5 ">
			<div className="container notebook text-center mt-5 shadow p-3 mb-5 bg-body ">
				<h2 className="mb-4">TODO LIST</h2>
				<div className="checklist w-50 mx-auto">
					<div>
						<input
							className="input"
							type="text"
							onKeyDown={handleKeyDown}
							onChange={handleonChange}
							value={inputValue}
							placeholder={
								list.length > 0
									? "What needs to be done?"
									: "No task, Add a task"
							} //{changeValorInput}
						/>
						<div className="text-center">
							<ul className="lista">
								{list.map((item, index) => (
									<li key={index} className="border-bottom">
										{item.label}
										<button
											className="btn"
											onClick={() => deleteList(index)}>
											<i className="fas fa-times" />
										</button>
									</li>
								))}
							</ul>
						</div>
						<p className="text-start fs-6 fst-italic">
							{" "}
							{list.length} Item Left{" "}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Home;
