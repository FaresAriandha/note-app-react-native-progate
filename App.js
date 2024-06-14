import React, { useState } from "react";
import { Alert } from "react-native";
import Home from "./src/screens/home";
import AddNote from "./src/screens/addNote";
import EditNote from "./src/screens/editNote";

const CurrentPageWidget = ({
	currentPage,
	noteList,
	setCurrentPage,
	setItemSelected,
	addNote,
	itemSelected,
	updateNote,
	showAlertDelete,
}) => {
	switch (currentPage) {
		case "home":
			return (
				<Home
					noteList={noteList}
					setCurrentPage={setCurrentPage}
					setItemSelected={setItemSelected}
					showAlertDelete={showAlertDelete}
				/>
			);
		case "add":
			return (
				<AddNote
					setCurrentPage={setCurrentPage}
					addNote={addNote}
				/>
			);
		case "edit":
			return (
				<EditNote
					setCurrentPage={setCurrentPage}
					itemSelected={itemSelected}
					updateNote={updateNote}
				/>
			);
		default:
			return <Home />;
	}
};

const App = () => {
	const [currentPage, setCurrentPage] = useState("home");
	const [itemSelected, setItemSelected] = useState("");

	const [noteList, setNoteList] = useState([
		{
			id: 1,
			title: "Note pertama",
			desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",
		},
	]);

	const addNote = (title, desc) => {
		const id =
			noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;
		setNoteList([
			...noteList,
			{
				id,
				title: title,
				desc: desc,
			},
		]);
	};

	const updateNote = (noteId, title, desc) => {
		const updatedNoteList = noteList.map((item) => {
			if (item.id === noteId) {
				item = { id: noteId, title, desc };
			}
			return item;
		});
		setNoteList(updatedNoteList);
	};

	const deleteNote = (noteId) => {
		const updatedNoteList = noteList.filter((item) => item.id !== noteId);
		setNoteList(updatedNoteList);
	};

	const showAlertDelete = (noteId) => {
		Alert.alert(
			"Pesan Konfirmasi",
			"Apakah kamu ingin yakin menghapusnya?",
			[
				{ text: "Ya", onPress: () => deleteNote(noteId) },
				{
					text: "Batal",
					style: "cancel",
				},
			],
			{
				cancelable: true,
			}
		);
	};

	return (
		<CurrentPageWidget
			currentPage={currentPage}
			setCurrentPage={setCurrentPage}
			setItemSelected={setItemSelected}
			noteList={noteList}
			addNote={addNote}
			itemSelected={itemSelected}
			updateNote={updateNote}
			showAlertDelete={showAlertDelete}
		/>
	);
};

export default App;
