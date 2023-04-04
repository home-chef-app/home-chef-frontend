import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Modal,
    Text,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { InstantSearch } from 'react-instantsearch-native';
import RefinementList from './RefinementList';

const styles = StyleSheet.create({
    closeButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        fontSize: 18,
    },
});

const Filters = ({
    isModalOpen,
    searchState,
    toggleModal,
    onSearchStateChange,
}: any) => (
    <Modal animationType="slide" visible={isModalOpen}>
        <SafeAreaView>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </Modal>
);

Filters.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    searchState: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onSearchStateChange: PropTypes.func.isRequired,
};

export default Filters;