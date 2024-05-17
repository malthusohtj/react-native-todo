import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/Style';
import { CheckBox } from './SmallComponents';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import ThreeDotsImg from '../assets/threedots.svg';

const TodoItem = (props: any): React.JSX.Element => {
    /**
     * Component for each todo item in the details page
     */
    let itemInfo = props.item;
    const [isDone, setIsDone] = useState(itemInfo.is_done);

    async function toggleDone() {
        /**
         * Updates the is_done field of the todo item
         */
        await fetch('https://ttm-todo-sample.herokuapp.com/api/todos/' + itemInfo.id,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    is_done: !isDone,
                }),
            }
        ).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            setIsDone((prev: any) => !prev);
        });
    }

    return (
        <View style={styles.itemOuterContainer}>
            <View style={styles.itemCheckTextContainer}>
                <CheckBox isDone={isDone} onPress={toggleDone} />
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>
                        {itemInfo.description}
                    </Text>
                </View>
            </View>
            <View style={styles.menuButtonContainer}>
                <Menu>
                    <MenuTrigger>
                        <ThreeDotsImg width={30} height={30} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{
                        optionsContainer: {
                            marginTop: 35,
                            paddingRight: 30,
                            width: 'auto',
                        },
                    }}>
                        <MenuOption onSelect={() => props.openUpdate(true)} >
                            <Text style={styles.menuText}>Update</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => props.openDelete(true)} >
                            <Text style={styles.menuText}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    );
};


export default TodoItem;
