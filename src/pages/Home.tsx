import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import styles from '../styles/Style';
import { CreateListModal } from '../components/ListModals';
import TodoList from '../components/TodoList';
import { FloatingAdd } from '../components/SmallComponents';
import { useFocusEffect } from '@react-navigation/native';
import { LoadingModal } from '../components/SmallComponents';

const Home = ({ navigation }: any): React.JSX.Element => {
    /**
     * Describes the home page, basically a list of todo lists
     */
    const [isLoading, setLoading] = useState<boolean>(true);
    const [todoData, setTodoData] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

    // Fetch all todo lists when home screen is in "focus" state (React Navigation)
    useFocusEffect(
        useCallback(() => {
            fetchTodoLists();
        }, []));

    async function fetchTodoLists() {
        /**
         * Fetches all todo lists from the API
        */
        try {
            setLoading(true);
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
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function closeCreate(submitted: boolean) {
        /**
         * Closes the create todo list modal
         */
        if (submitted) { await fetchTodoLists(); }
        setShowCreateModal(false);
    }


    return (
        <SafeAreaView style={styles.outerMostContainer}>
            <LoadingModal visible={isLoading} />
            <CreateListModal visible={showCreateModal} closeModal={closeCreate} />
            <ScrollView>
                {todoData && todoData.map((list: any) => {
                    return (
                        <View key={list.id} style={styles.listContainer}>
                            <TodoList list={list} navigation={navigation} />
                            <View style={styles.divider} />
                        </View>
                    );
                })}
            </ScrollView>
            <FloatingAdd style={styles.floatingRightButton} onPress={() => { setShowCreateModal(true); }} />
        </SafeAreaView>
    );
};

export default Home;
