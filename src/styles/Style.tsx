import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    outerMostContainer: {
        flex: 1,
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
    },
    itemCheckTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 10,
    },
    itemTextContainer: {
        // flex
        flexDirection: 'column',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'left',
        paddingLeft: 20,
        paddingRight: 10,
    },
    menuButtonContainer: {
        flex: 1,
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
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 40,
        paddingVertical: 10,
        elevation: 7,
    },
    listHeaderButtons: {
        flexDirection: 'row',
    },
    listHeaderTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 20,
    },
    menuText: {
        color: 'black',
    },
    modalInnerContainer: {
        // positioning
        marginVertical: 'auto',
        // box
        marginHorizontal: 20,
        borderRadius: 20,
        // design
        backgroundColor: 'white',
        elevation: 10,
        // flex
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        color: 'black',
        marginVertical: 20,
    },
    modalInput: {
        fontSize: 20,
        color: 'black',
        // backgroundColor: 'grey',
        borderWidth: 1,
        borderColor: 'grey',
        width: '80%',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 20,
    },
});

export default styles;
