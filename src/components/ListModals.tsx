import React, { useState } from 'react';
import { InputModal, OptionModal } from './SmallComponents';

const CreateListModal = (props: any): React.JSX.Element => {
    /**
     * Describes modal used to create a new todo list
     */
    const [listName, setListName] = useState<string>('');

    async function createList() {
        try {
            // API: Create new todo list
            await fetch('https://ttm-todo-sample.herokuapp.com/api/todo-lists',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: listName,
                    }),
                }
            ).then(() => {
                props.closeModal(true);
            });
        } catch (e) {
            console.log(e);
            props.closeModal(false);
        }
    }

    return (
        <InputModal
            visible={props.visible}
            titleText="Create new list?"
            placeholder="Enter name of list"
            leftButtonText="Cancel"
            rightButtonText="Create"
            leftButtonOnPress={() => props.closeModal(false)}
            rightButtonOnPress={createList}
            onChangeText={(text: any) => setListName(text)} />
    );
};

const UpdateListModal = (props: any): React.JSX.Element => {
    /**
     * Describes modal used to update the name of an existing todo list
     */
    const [listName, setListName] = useState<string>('');

    async function updateList() {
        try {
            // API: Update name of existing todo list
            await fetch('https://ttm-todo-sample.herokuapp.com/api/todo-lists/' + props.listId,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: listName,
                    }),
                }
            ).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
                props.closeModal(true);
            });
        } catch (e) {
            console.log(e);
            props.closeModal(false);
        }
    }

    return (
        <InputModal
            visible={props.visible}
            titleText="Update name of list?"
            placeholder={props.listName}
            leftButtonText="Cancel"
            rightButtonText="Update"
            leftButtonOnPress={() => props.closeModal(false)}
            rightButtonOnPress={updateList}
            onChangeText={(text: any) => setListName(text)} />
    );
};

const DeleteListModal = (props: any): React.JSX.Element => {
    /**
     * Describes modal used to delete an existing todo list
     */
    async function deleteList() {
        try {
            let todoItems;
            // API: Get all todo items for this list
            await fetch('https://ttm-todo-sample.herokuapp.com/api/todo-lists/' + props.listId
            ).then(res => { return res.json(); }
            ).then(data => {
                todoItems = data.todos;
                let deleteTasks = [];
                // API: Delete all todo items
                for (const item of todoItems) {
                    deleteTasks.push(fetch('https://ttm-todo-sample.herokuapp.com/api/todos/' + item.id,
                        {
                            method: 'DELETE',
                        }
                    ));
                }
                // API: Delete todo list
                deleteTasks.push(fetch('https://ttm-todo-sample.herokuapp.com/api/todo-lists/' + props.listId,
                    {
                        method: 'DELETE',
                    }
                ));
                // Wait until all todo items and list itself is deleted
                Promise.all(deleteTasks).then(() => {
                    console.log('all deleted');
                    props.closeModal(true);
                    return;
                });
            });
        } catch (e) {
            console.log(e);
            props.closeModal(false);
        }
    }
    return (
        <OptionModal
            visible={props.visible}
            titleText="Delete list?"
            leftButtonText="Cancel"
            leftButtonOnPress={() => props.closeModal(false)}
            rightButtonText="Delete"
            rightButtonOnPress={deleteList} />
    );
};

export { CreateListModal, UpdateListModal, DeleteListModal };
