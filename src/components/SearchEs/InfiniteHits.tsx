import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Highlight from './Highlight';

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

const InfiniteHits = ({ hits, hasMore, refineNext }: any) => (
    <FlatList
        data={hits}
        keyExtractor={item => item.objectID}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={() => hasMore && refineNext()}
        renderItem={({ item }) => (
            <View style={styles.item}>
                <Highlight attribute="name" hit={item} />
            </View >
        )}
    />


);

// [...]

export default InfiniteHits;