import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput } from 'react-native';
import { InputModal, OptionModal } from './SmallComponents';

const CreateItemModal = (props: any): React.JSX.Element => {
    /**
     * Describes modal used to create a new todo item for the current list
     */
    const [itemDesc, setItemDesc] = useState<string>('');

    async function createItem() {
        try {
            // API: Create new todo item
            await fetch('https://ttm-todo-sample.herokuapp.com/api/todos',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        description: itemDesc,
                        todo_list_id: props.listId,
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
            titleText="Add new task?"
            placeholder="Enter description"
            leftButtonText="Cancel"
            rightButtonText="Create"
            leftButtonOnPress={() => props.closeModal(false)}
            rightButtonOnPress={createItem}
            onChangeText={(text: any) => setItemDesc(text)} />
    );
};

const UpdateItemModal = (props: any): React.JSX.Element => {
    /**
     * Describes modal used to update the description of an existing todo item
     */
    const [desc, setDesc] = useState<string>('');

    async function updateItem() {
        try {
            // API: Update name of existing todo list
            await fetch('https://ttm-todo-sample.herokuapp.com/api/todos/' + props.itemId,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        description: desc,
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
            titleText="Update item description?"
            placeholder={props.itemDesc}
            leftButtonText="Cancel"
            rightButtonText="Update"
            leftButtonOnPress={() => props.closeModal(false)}
            rightButtonOnPress={updateItem}
            onChangeText={(text: any) => setDesc(text)} />
    );
};

const DeleteItemModal = (props: any): React.JSX.Element => {
    /**
     * Describes modal used to delete an existing todo list
     */
    async function deleteItem() {
        try {
            // API: Update name of existing todo list
            await fetch('https://ttm-todo-sample.herokuapp.com/api/todos/' + props.itemId,
                {
                    method: 'DELETE',
                }
            ).then(() => { props.closeModal(true); });
        } catch (e) {
            console.log(e);
            props.closeModal(false);
        }
    }

    return (
        <OptionModal
            visible={props.visible}
            titleText="Delete item?"
            leftButtonText="Cancel"
            leftButtonOnPress={() => props.closeModal(false)}
            rightButtonText="Delete"
            rightButtonOnPress={deleteItem} />
    );
};

export { CreateItemModal, UpdateItemModal, DeleteItemModal };
