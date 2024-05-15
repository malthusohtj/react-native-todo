import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput } from 'react-native';

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
        <Modal visible={props.visible}>
            <View>
                <Text>Add new item?</Text>
                <TextInput onChangeText={text => setItemDesc(text)} />
                <Button title="Add" onPress={createItem} />
                <Button title="Cancel" onPress={() => { props.closeModal(false); }} />
            </View>
        </Modal>
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
        <Modal visible={props.visible}>
            <View>
                <Text>Update item description?</Text>
                <TextInput onChangeText={text => setDesc(text)} />
                <Button title="Update" onPress={updateItem} />
                <Button title="Cancel" onPress={() => { props.closeModal(false); }} />
            </View>
        </Modal>
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
        <Modal visible={props.visible}>
            <View>
                <Text>Delete item?</Text>
                <Button title="Delete" onPress={deleteItem} />
                <Button title="Cancel" onPress={() => { props.closeModal(false); }} />
            </View>
        </Modal>
    );
};

export { CreateItemModal, UpdateItemModal, DeleteItemModal };
