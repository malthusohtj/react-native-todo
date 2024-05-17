import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/Style';
import { RightChevron } from './SmallComponents';

const TodoList = (props: any): React.JSX.Element => {
    /**
     * Component for each todo list on the home page
     */
    let listInfo = props.list;
    return (
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('Items', {
                listId: listInfo.id,
                listName: listInfo.name,
                notifyChange: props.notifyChange,
            });
        }}>
            <View style={styles.listOuterContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.listText}>
                        {listInfo.name}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <RightChevron />
                </View>
            </View>
        </TouchableOpacity>
    );
};


export default TodoList;
