var selectFilter = "all";

//wird gealden mit der Seite
window.addEventListener('load', () => {

	//mit dem parse macht es zu einem string!!!
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const newTodoForm = document.querySelector('#new-todo-form');










	
	//macht eine neue Tabelle für die Todo-Liste
	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();
		
		
		
		//Holt die Werte von Content (den Text Input) und Category (Work, Private, Holiday)
		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
		}
		
		//Hier wird zu der globalen Variable der neue Todo hinzugefügt
		todos.push(todo);
		//und anschliessend wird das Ganze im local storage gespeichert als string
		localStorage.setItem('todos', JSON.stringify(todos));
		
		//setzt  Content und Category wieder zurück (Die Form)
		e.target.reset();
		DisplayTodos()
	})
	
	DisplayTodos();
	
	document.querySelectorAll("#optionsFiltering label input").forEach(item => {

		item.addEventListener("click", element => {
			selectFilter = element.target.value;
			DisplayTodos();
		})

	})

})


// function SortTodos (e) {
//      const todos=todoList.childNodes
//         todos.forEach(function (DisplayTodos){
//             if(e.target.value==="business"){
//                 todo.display="business"

//             }else if(e.target.value==="personal"){
//                 todo.display="personal"

// 			}else{
// 				todo.display="holiday"
//         }
// }

// }




//Hier ist die Function, wo die Werte vom Todo (Content und Category gezeigt werden)
function DisplayTodos() {
	//hier werden die neuen Todo's gepuscht
	const todoList = document.querySelector('#todo-list');
	//löscht die Elemente
	todoList.innerHTML = "";

	//loops over the todo-list

	todos.forEach(todo => {
		console.log(selectFilter)
		console.log((selectFilter === "business" || selectFilter === "holiday" || selectFilter === "personal") && todo.category === selectFilter)
		if (((selectFilter === "business" || selectFilter === "holiday" || selectFilter === "personal") && todo.category === selectFilter) || selectFilter === "all") {
			console.log(todo)
			//div für die neuen Einträge
			const todoItem = document.createElement('div');
			console.debug()
			todoItem.classList.add('todo-item');

			//alle inputs für die Liste (Text, Delet Button, Edit Button etc.)
			const label = document.createElement('label');
			const input = document.createElement('input');
			const span = document.createElement('span');
			const content = document.createElement('div');
			const actions = document.createElement('div');
			const edit = document.createElement('button');
			const deleteButton = document.createElement('button');

			//checkbox wenn du es als gemacht markiert hast
			input.type = 'checkbox';
			input.checked = todo.done;
			span.classList.add('bubble');


			//hier wird entschieden welche Category und dementsprechend die Farbe
			if (todo.category == 'personal') {
				span.classList.add('personal');

			} else if (todo.category == 'holiday') {
				span.classList.add('holiday');

			} else {
				span.classList.add('business');
			}

			//wird hinzugefügt mit .add (content, actions, und die zwei Knöpfe)
			content.classList.add('todo-content');
			actions.classList.add('actions');
			edit.classList.add('edit');
			deleteButton.classList.add('delete');

			//textelement wird generiert.
			content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
			edit.innerHTML = 'Edit';
			deleteButton.innerHTML = 'Delete';

			//alles wird angefügt
			label.appendChild(input);
			label.appendChild(span);
			actions.appendChild(edit);
			actions.appendChild(deleteButton);
			todoItem.appendChild(label);
			todoItem.appendChild(content);
			todoItem.appendChild(actions);

			//Hier wird das todo-item der liste hinzugefügt
			todoList.appendChild(todoItem);

			//setzt den todo-Kreis zu gemacht. Füllt den Kreis aus
			if (todo.done) {
				todoItem.classList.add('done');
			}

			//Hier wird das item durchgesrichen, wenn es bearbeitet wurde und es wird zusätlich im local storage gespeichert
			input.addEventListener('change', (e) => {
				todo.done = e.target.checked;
				localStorage.setItem('todos', JSON.stringify(todos));

				if (todo.done) {
					todoItem.classList.add('done');
				} else {
					todoItem.classList.remove('done');
				}

				DisplayTodos()

			})





			//hier kann man die Einträge bearbeiten
			edit.addEventListener('click', (e) => {
				const input = content.querySelector('input');
				//hier wird das readyonly wo oben gesetzt wurde entfernt und man kann es bearbeiten
				input.removeAttribute('readonly');
				//highlight the input
				input.focus();
				//mit blur wird durch klicken neben dem input das editen gestoppt
				input.addEventListener('blur', (e) => {
					//hier wird wieder das readonly aktiviert
					input.setAttribute('readonly', true);
					//hier wird der neue wert hinzugefügt
					todo.content = e.target.value;
					//wird alles wieder im local storage gespeichert
					localStorage.setItem('todos', JSON.stringify(todos));
					DisplayTodos()

				})
			})






			//hier kann man die Einträge löschen
			deleteButton.addEventListener('click', (e) => {
				//schaut ob es gecklickt wurde
				todos = todos.filter(t => t != todo);
				//hier wird es wider gespeicht und somit gelöscht
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()
			})
		}
	})
}