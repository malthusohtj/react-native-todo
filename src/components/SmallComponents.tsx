import React, { useState } from 'react';
import PencilImg from '../assets/pencil.svg';
import RightChevronImg from '../assets/rightchevron.svg';
import AddImg from '../assets/add.svg';
import CheckedImg from '../assets/checked.svg';
import UncheckedImg from '../assets/unchecked.svg';
import TrashImg from '../assets/trash.svg';
import styles from '../styles/Style';
import { ActivityIndicator } from 'react-native';

import { TouchableOpacity, Modal, View, Text, TextInput, Button } from 'react-native';

const UpdateButton = (props: any): React.JSX.Element => {
    return (
        <View style={props.style}>
            <TouchableOpacity onPress={props.onPress}>
                <PencilImg width={props.width ? props.width : 32} height={props.height ? props.height : 32} />
            </TouchableOpacity>
        </View>
    );
};

const DeleteButton = (props: any): React.JSX.Element => {
    return (
        <View style={props.style}>
            <TouchableOpacity onPress={props.onPress}>
                <TrashImg width={props.width ? props.width : 40} height={props.height ? props.height : 40} />
            </TouchableOpacity>
        </View>
    );
};

const RightChevron = (props: any): React.JSX.Element => {
    return (
        <View style={props.style}>
            <RightChevronImg width={30} height={30} />
        </View>
    );
};

const FloatingAdd = (props: any): React.JSX.Element => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={props.style}>
                <AddImg width={50} height={50} />
            </View>
        </TouchableOpacity>
    );
};

const CheckBox = (props: any): React.JSX.Element => {
    const [checked, setChecked] = useState(props.isDone);
    return (
        <TouchableOpacity onPress={() => {
            props.onPress();
            setChecked((prev: any) => !prev);
        }}>
            <View style={props.style}>
                {checked && <CheckedImg width={30} height={30} />}
                {!checked && <UncheckedImg width={30} height={30} />}
            </View>
        </TouchableOpacity>
    );
};

const InputModal = (props: any): React.JSX.Element => {
    return (
        <Modal visible={props.visible} animationType="slide" transparent={true}>
            <View style={styles.modalInnerContainer} >
                <Text style={styles.modalTitle}>{props.titleText}</Text>
                <TextInput style={styles.modalInput} placeholder={props.placeholder} cursorColor={'black'} onChangeText={text => props.onChangeText(text)} />
                <View style={styles.modalButtonContainer}>
                    <Button title={props.leftButtonText} color={'black'} onPress={props.leftButtonOnPress} />
                    <Button title={props.rightButtonText} color={'black'} onPress={props.rightButtonOnPress} />
                </View>
            </View>
        </Modal>
    );
};

const OptionModal = (props: any): React.JSX.Element => {
    return (
        <Modal visible={props.visible} animationType="slide" transparent={true}>
            <View style={styles.modalInnerContainer} >
                <Text style={styles.modalTitle}>{props.titleText}</Text>
                <View style={styles.modalButtonContainer}>
                    <Button title={props.leftButtonText} color={'black'} onPress={props.leftButtonOnPress} />
                    <Button title={props.rightButtonText} color={'black'} onPress={props.rightButtonOnPress} />
                </View>
            </View>
        </Modal>
    );
};

const LoadingModal = (props: any): React.JSX.Element => {
    return (
        <Modal visible={props.visible} transparent={true}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="black" />
                <Text style={styles.loadingText}>Hold on!</Text>
            </View>
        </Modal>
    );
};

export { UpdateButton, RightChevron, FloatingAdd, CheckBox, DeleteButton, InputModal, OptionModal, LoadingModal };
