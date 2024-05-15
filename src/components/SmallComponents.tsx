import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PencilImg from '../assets/pencil.svg';
import RightChevronImg from '../assets/rightchevron.svg';
import AddImg from '../assets/add.svg';
import CheckedImg from '../assets/checked.svg';
import UncheckedImg from '../assets/unchecked.svg';

const UpdateButton = (props: any): React.JSX.Element => {
    return (
        <View style={props.style}>
            <TouchableOpacity onPress={props.onPress}>
                <PencilImg width={25} height={25} />
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
                {checked && <CheckedImg width={50} height={50} />}
                {!checked && <UncheckedImg width={50} height={50} />}
            </View>
        </TouchableOpacity>
    );
};

export { UpdateButton, RightChevron, FloatingAdd, CheckBox };
