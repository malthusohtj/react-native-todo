import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Button, ScrollView } from 'react-native';
import styles from '../styles/Style';
import { CreateListModal, UpdateListModal, DeleteListModal } from '../components/ListModals';
import TodoList from '../components/TodoList';
import { FloatingAdd } from '../components/SmallComponents';

const Home = ({ navigation }: any): React.JSX.Element => {
    /**
     * Describes the home page, basically a list of todo lists
     */
    const [todoData, setTodoData] = useState([]);
    const [selectedList, setSelectedList] = useState<number>();
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    // Fetch all todo lists upon initial render
    useEffect(() => {
        fetchTodoLists();
    }, []);

    async function fetchTodoLists() {
        /**
         * Fetches all todo lists from the API
         */
        try {
            // Fetch all todo lists (without "todos" attribute)
            await fetch('https://ttm-todo-sample.herokuapp.com/api/todo-lists', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                return res.json();
            }).then((data) => {
                let sortedLists = data.sort((a: any, b: any) => { return a.id - b.id; });
                setTodoData(sortedLists);
            });
        } catch (error) {
            console.log(error);
        }
    }

    function openUpdate(id: number) {
        /**
         * Opens the update todo list modal
         */
        setSelectedList(id);
        setShowUpdateModal(true);
    }

    function openDelete(id: number) {
        /**
         * Opens the delete todo list modal
         */
        setSelectedList(id);
        setShowDeleteModal(true);
    }

    async function closeCreate(submitted: boolean) {
        /**
         * Closes the create todo list modal
         */
        if (submitted) { await fetchTodoLists(); }
        setShowCreateModal(false);
    }

    async function closeUpdate(submitted: boolean) {
        /**
         * Closes the update todo list modal
         */
        if (submitted) { await fetchTodoLists(); }
        setShowUpdateModal(false);
    }
    async function closeDelete(submitted: boolean) {
        /**
         * Closes the delete todo list modal
         */
        if (submitted) { await fetchTodoLists(); }
        setShowDeleteModal(false);
    }


    return (
        <SafeAreaView style={styles.outerMostContainer}>
            <CreateListModal visible={showCreateModal} closeModal={closeCreate} />
            <UpdateListModal visible={showUpdateModal} listId={selectedList} closeModal={closeUpdate} />
            <DeleteListModal visible={showDeleteModal} listId={selectedList} closeModal={closeDelete} />
            <ScrollView>
                {todoData && todoData.map((list: any) => {
                    return (
                        <View style={styles.listContainer}>
                            <TodoList key={list.id} list={list} openUpdate={openUpdate} openDelete={openDelete} navigation={navigation} />
                            <View style={styles.divider} />
                        </View>
                    );
                })}
                <Button title="Add list" onPress={() => { setShowCreateModal(true); }} />
            </ScrollView>
            <FloatingAdd style={styles.floatingRightButton} onPress={() => { setShowCreateModal(true); }} />
        </SafeAreaView>
    );
};

export default Home;
