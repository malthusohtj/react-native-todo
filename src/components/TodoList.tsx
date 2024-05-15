import React from 'react';
import { View, TouchableOpacity, Text, Button } from 'react-native';
import styles from '../styles/Style';
import { UpdateButton, RightChevron } from './SmallComponents';

const TodoList = (props: any): React.JSX.Element => {
    let listInfo = props.list;
    return (
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('Items', {
                listId: listInfo.id,
            });
        }}>
            <View style={styles.listOuterContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.listText}>
                        {listInfo.name}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    {/* <UpdateButton style={styles.buttonImage} onPress={() => { props.openUpdate(listInfo.id); }} /> */}
                    <RightChevron />
                    {/* <Button title="Update" onPress={() => { props.openUpdate(listInfo.id); }} /> */}
                    {/* <Button title="Delete" onPress={() => { props.openDelete(listInfo.id); }} /> */}
                </View>
            </View>
        </TouchableOpacity>
    );
};


export default TodoList;
