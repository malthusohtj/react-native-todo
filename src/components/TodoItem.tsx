import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles/Style';
import { CheckBox } from './SmallComponents';

const TodoItem = (props: any): React.JSX.Element => {
    let itemInfo = props.item;
    const [isDone, setIsDone] = useState(itemInfo.is_done);

    async function toggleDone() {
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
            {/* <Button title="Update" onPress={() => { props.openUpdate(itemInfo.id); }} />
            <Button title="Delete" onPress={() => { props.openDelete(itemInfo.id); }} /> */}
        </View>
    );
};


export default TodoItem;
