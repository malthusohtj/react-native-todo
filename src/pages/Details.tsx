/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import styles from '../styles/Style';
import TodoItem from '../components/TodoItem';
import { CreateItemModal, DeleteItemModal, UpdateItemModal } from '../components/ItemModals';
import { UpdateListModal, DeleteListModal } from '../components/ListModals';
import { FloatingAdd } from '../components/SmallComponents';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import ThreeDotsImg from '../assets/threedots.svg';
import { LoadingModal } from '../components/SmallComponents';

const Details = ({ route, navigation }: any): React.JSX.Element => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [todoItems, setTodoItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState<any>();
    const [listName, setListName] = useState();
    const [showUpdateListModal, setShowUpdateListModal] = useState<boolean>(false);
    const [showDeleteListModal, setShowDeleteListModal] = useState<boolean>(false);
    const [showCreateItemModal, setShowCreateItemModal] = useState<boolean>(false);
    const [showUpdateItemModal, setShowUpdateItemModal] = useState<boolean>(false);
    const [showDeleteItemModal, setShowDeleteItemModal] = useState<boolean>(false);

    let { listId } = route.params;

    useEffect(() => {
        fetchTodoList();
        fetchTodoItems();
    }, []);

    async function fetchTodoItems() {
        /**
         * Fetches all todo items for this todo list
         */
        try {
            // API: Fetch all todo items for this list
            const { listsURL } = require('../../secrets.json');
            await fetch(listsURL + '/' + listId,
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
                setLoading(false);
            });
        } catch (e) {
            console.log(e);
        }
    }

    async function fetchTodoList() {
        /**
         * Fetches metadata for this particular list
        */
        const { listsURL } = require('../../secrets.json');
        await fetch(listsURL + '/' + listId,
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
            setListName(data.name);
        });
    }

    async function closeListUpdate(submitted: boolean) {
        /**
         * Closes the update todo list modal
         */
        if (submitted) { await fetchTodoList(); }
        setShowUpdateListModal(false);
    }

    async function closeListDelete(submitted: boolean) {
        /**
         * Closes the delete todo list modal
         */
        setShowDeleteListModal(false);
        if (submitted) { navigation.goBack(); }
    }

    async function closeItemCreate(submitted: boolean) {
        /**
         * Closes the create todo item modal
         */
        if (submitted) { await fetchTodoItems(); }
        setShowCreateItemModal(false);
    }

    async function closeItemUpdate(submitted: boolean) {
        /**
         * Closes the update todo item modal
         */
        if (submitted) { await fetchTodoItems(); }
        setShowUpdateItemModal(false);
    }

    async function closeItemDelete(submitted: boolean) {
        /**
         * Closes the delete todo item modal
         */
        if (submitted) { await fetchTodoItems(); }
        setShowDeleteItemModal(false);
    }

    return (
        <SafeAreaView style={styles.outerMostContainer}>
            <LoadingModal visible={isLoading} />
            <UpdateListModal visible={showUpdateListModal} listId={listId} listName={listName} closeModal={closeListUpdate} />
            <DeleteListModal visible={showDeleteListModal} listId={listId} closeModal={closeListDelete} />
            <CreateItemModal visible={showCreateItemModal} listId={listId} closeModal={closeItemCreate} />
            <UpdateItemModal visible={showUpdateItemModal} itemId={selectedItem && selectedItem.id} itemDesc={selectedItem && selectedItem.description} closeModal={closeItemUpdate} />
            <DeleteItemModal visible={showDeleteItemModal} itemId={selectedItem && selectedItem.id} itemDesc={selectedItem && selectedItem.description} closeModal={closeItemDelete} />
            <View style={styles.listHeader}>
                <Text style={styles.listHeaderTitle}>{listName}</Text>
                <View>
                    <Menu>
                        <MenuTrigger>
                            <ThreeDotsImg width={30} height={30} />
                        </MenuTrigger>
                        <MenuOptions customStyles={{
                            optionsContainer: {
                                marginTop: 40,
                            },
                        }}>
                            <MenuOption onSelect={() => { setShowUpdateListModal(true); }} >
                                <Text style={styles.menuText}>Update</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => { setShowDeleteListModal(true); }} >
                                <Text style={styles.menuText}>Delete</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
            </View>
            <ScrollView>
                {
                    todoItems && todoItems.map((item: any) => {
                        return (
                            <View key={item.id} style={styles.itemContainer}>
                                <TodoItem item={item} openUpdate={() => {
                                    setSelectedItem(item);
                                    setShowUpdateItemModal(true);
                                }} openDelete={() => {
                                    setSelectedItem(item);
                                    setShowDeleteItemModal(true);
                                }} />
                                <View style={styles.divider} />
                            </View>
                        );
                    })
                }
            </ScrollView>
            <FloatingAdd style={styles.floatingRightButton} onPress={() => { setShowCreateItemModal(true); }} />
        </SafeAreaView>
    );
};

export default Details;
