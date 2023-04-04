import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    StatusBar,
    Button,
} from 'react-native';
import {
    InstantSearch,
    connectRefinementList,
} from 'react-instantsearch-native';
import SearchBox from './SearchBox';
import InfiniteHits from './InfiniteHits';
import Filters from './Filters';

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#252b33',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

const VirtualRefinementList = connectRefinementList(() => null);

class App extends React.Component<any, any> {
    root = {
        Root: View,
        props: {
            style: {
                flex: 1,
            }
        },
    };

    state = {
        isModalOpen: false,
        searchState: {},
    };

    toggleModal = () =>
        this.setState(({ isModalOpen }: { isModalOpen: boolean }) => ({
            isModalOpen: !isModalOpen,
        }));

    onSearchStateChange = (searchState: any) =>
        this.setState(() => ({
            searchState,
        }));

    render() {
        const { isModalOpen, searchState } = this.state;

        return (
            <View style={styles.container}>

                <VirtualRefinementList attribute="brand" />

                <Filters
                    isModalOpen={isModalOpen}
                    searchState={searchState}
                    toggleModal={this.toggleModal}
                    onSearchStateChange={this.onSearchStateChange}
                />
                {/*@ts-ignore*/}
                <SearchBox onFilter={this.props.onFilter} onFocus={this.props.onFocus} onBlur={this.props.onBlur} />
                <Button
                    title="Filters"
                    color="#252b33"
                    onPress={this.toggleModal}
                />
                <InfiniteHits />
            </View>
        );
    }
}

export default App;