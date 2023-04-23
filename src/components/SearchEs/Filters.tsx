import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Modal,
    TouchableOpacity,
    LogBox,
} from 'react-native';
import PropTypes from 'prop-types';
import { InstantSearch } from 'react-instantsearch-native';
import RefinementList from './RefinementList';
import PageHeader from 'components/common/PageHeader';
import { Checkbox, View, Text, HStack, Slider } from 'native-base';
import { colors } from 'theme/colors';
import CuisineSelector from './CuisineSelector';
import DietarySelector from './DietarySelector';
import PriceRangeSelector from './PriceRangeSelector';
LogBox.ignoreLogs([
    'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
]);

const styles = StyleSheet.create({
    closeButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        fontSize: 18,
    },
    sortContainer: {
        backgroundColor: colors.dark[400],
        margin: 15,
        padding: 5,
        borderRadius: 8
    }
});


const Filters = ({
    isModalOpen,
    searchState,
    toggleModal,
    onSearchStateChange,
}: any) => {
    const [groupValue, setGroupValue] = React.useState<string[] | []>([]);
    const [cuisines, setCuisines] = React.useState<string[] | []>([]);
    const [restrictions, setRestrictions] = React.useState<string[] | []>([]);
    console.log(groupValue)
    const ClearAllComponent = () => {
        const clearAll = () => {
            setGroupValue([])
            setCuisines([])
            setRestrictions([])
        }
        return (
            <HStack alignItems="center" style={{ flex: 1, justifyContent: "flex-end", paddingRight: 4 }}>
                <TouchableOpacity onPress={() => clearAll()}>
                    <Text color="black" fontSize="20" textAlign={'right'}>
                        Clear All
                    </Text>
                </TouchableOpacity>
            </HStack>
        )
    }
    return (
        <Modal animationType="slide" visible={isModalOpen}>
            <SafeAreaView>
                <PageHeader title={"Sort & Filter"} onBack={() => toggleModal()} RightComponent={ClearAllComponent} />
                <View>
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Sort</Text>
                        <View style={styles.sortContainer}>
                            <Checkbox.Group colorScheme="primary" value={groupValue} accessibilityLabel="Select Sorting">
                                <Checkbox value="mostPopular" my="1" onChange={() => setGroupValue(['mostPopular'])}>
                                    <Text style={{ color: "white" }} _dark={{ color: 'white' }}>
                                        Most Popular
                                    </Text>
                                </Checkbox>
                                <Checkbox value="highestRating" my="1" onChange={() => setGroupValue(['highestRating'])}>
                                    <Text style={{ color: "white" }} _dark={{ color: 'white' }}>
                                        Highest Rating
                                    </Text>

                                </Checkbox>
                                <Checkbox value="proximity" my="1" onChange={() => setGroupValue(['proximity'])}>
                                    <Text style={{ color: "white" }} _dark={{ color: 'white' }}>
                                        Proximity
                                    </Text>
                                </Checkbox>
                            </Checkbox.Group>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Filter</Text>
                        <View style={styles.sortContainer}>
                            <Text fontWeight="700" style={{ color: "white" }} _dark={{ color: 'white' }}>
                                Price Range
                            </Text>
                            <PriceRangeSelector />

                            <Text fontWeight="700" style={{ color: "white" }} _dark={{ color: 'white' }}>
                                Cuisine
                            </Text>
                            <CuisineSelector cuisinesSelected={cuisines} setCuisines={setCuisines} />
                            <Text fontWeight="700" style={{ color: "white" }} _dark={{ color: 'white' }}>
                                Dietary
                            </Text>
                            <DietarySelector restrictionsSelected={restrictions} setRestrictions={setRestrictions} />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal >
    )
};

Filters.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    searchState: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onSearchStateChange: PropTypes.func.isRequired,
};

export default Filters;