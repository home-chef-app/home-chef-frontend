import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'native-base'
import { colors } from 'theme/colors';
import { navigate } from 'services/NavigationService';
import { TouchableHighlight } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    item: {
        padding: 10,
        flexDirection: 'column',
    },
    titleText: {
        fontWeight: 'bold',
    },
});

const getNext = () => {
    console.log("FETCH MORE")
}

const renderSeparator = () => (
    <View
        style={{
            backgroundColor: colors.dark[400],
            height: 0.5,
        }}
    />
);
const InfiniteHits = ({ hits, hasMore }: any) => (
    <FlatList
        data={hits}
        keyExtractor={item => item._id}
        onEndReached={() => hasMore && getNext()}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({ item }) => (
            <View style={styles.item}>
                <TouchableHighlight onPress={() => navigate('SellerProfile', { seller: item })}>
                    <Text fontSize="lg">{item._source.name}</Text>
                </TouchableHighlight>
            </View >
        )}
    />


);

// [...]

export default InfiniteHits;