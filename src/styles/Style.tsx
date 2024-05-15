import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    outerMostContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    listContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    listOuterContainer: {
        // box
        width: '80%',
        marginHorizontal: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginVertical: 5,
        // flex
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        // flex
        flexDirection: 'column',
        justifyContent: 'center',
        // box
        paddingLeft: 5,
    },
    listText: {
        fontSize: 22,
        color: 'black',
        textAlign: 'left',
    },
    itemContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    itemOuterContainer: {
        // box
        width: '80%',
        marginHorizontal: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginVertical: 5,
        // flex
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    itemCheckTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    itemTextContainer: {
        // flex
        flexDirection: 'column',
        justifyContent: 'center',
        // box
        paddingLeft: 5,
    },
    itemText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'left',
        // backgroundColor: 'green',
    },
    divider: {
        height: 1,
        backgroundColor: 'black',
        width: '80%',
    },
    buttonContainer: {
        width: 'auto',
        // flex
        flexDirection: 'row',
    },
    item: {
        fontSize: 20,
        color: 'red',
        textAlign: 'left',
        paddingHorizontal: 20,
    },
    floatingRightButton: {
        // container
        width: 80,
        height: 80,
        borderRadius: 45,
        position: 'absolute',
        bottom: 40,
        right: 40,
        // design
        backgroundColor: 'grey',
        elevation: 5,
        // inner positioning
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
