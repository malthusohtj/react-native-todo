/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Button } from 'react-native';
import styles from '../styles/Style';
import TodoItem from '../components/TodoItem';
import { CreateItemModal, DeleteItemModal, UpdateItemModal } from '../components/ItemModals';

const Details = ({ route }: any): React.JSX.Element => {
    const [todoItems, setTodoItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState<number>();
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    let { listId } = route.params;

    useEffect(() => {
        fetchTodoItems();
    }, []);

    async function fetchTodoItems() {
        /**
         * Fetches all todo items for this todo list
         */
        try {
            // API: Fetch all todo items for this list
            await fetch('https://ttm-todo-sample.herokuapp.com/api/todo-lists/' + listId,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            ).then((res) => {
                return res.json();
            }).then((data) => {
                let sortedItems = data.todos.sort((a: any, b: any) => { return a.id - b.id; });
                setTodoItems(sortedItems);
            });
        } catch (e) {
            console.log(e);
        }
    }

    function openUpdate(id: number) {
        /**
         * Opens the update todo item modal
         */
        setSelectedItem(id);
        setShowUpdateModal(true);
    }

    function openDelete(id: number) {
        /**
         * Opens the delete todo item modal
         */
        setSelectedItem(id);
        setShowDeleteModal(true);
    }

    async function closeCreate(submitted: boolean) {
        /**
         * Closes the create todo item modal
         */
        if (submitted) { await fetchTodoItems(); }
        setShowCreateModal(false);
    }

    async function closeUpdate(submitted: boolean) {
        /**
         * Closes the update todo item modal
         */
        if (submitted) { await fetchTodoItems(); }
        setShowUpdateModal(false);
    }

    async function closeDelete(submitted: boolean) {
        /**
         * Closes the delete todo item modal
         */
        if (submitted) { await fetchTodoItems(); }
        setShowDeleteModal(false);
    }

    return (
        <SafeAreaView style={styles.outerMostContainer}>
            <CreateItemModal visible={showCreateModal} closeModal={closeCreate} />
            <UpdateItemModal visible={showUpdateModal} itemId={selectedItem} closeModal={closeUpdate} />
            <DeleteItemModal visible={showDeleteModal} itemId={selectedItem} closeModal={closeDelete} />
            <ScrollView>
                {
                    todoItems && todoItems.map((item: any) => {
                        return (
                            <View style={styles.itemContainer}>
                                <TodoItem key={item.id} item={item} openUpdate={openUpdate} openDelete={openDelete} />
                                <View style={styles.divider} />
                            </View>
                        );
                    })
                }
            </ScrollView>
            <Button title="Add item" onPress={() => { setShowCreateModal(true); }} />
        </SafeAreaView>
    );
};

export default Details;
