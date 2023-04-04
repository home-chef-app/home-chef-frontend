import React from 'react';
import { StyleSheet, Dimensions, View, SafeAreaView } from 'react-native';
import AppHeader from 'components/common/AppHeader';
import { colors } from 'theme/colors';


const styles = StyleSheet.create({
    pageContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
})




const FullScreenWrapper = ({ children }: any) => {
    return (
        <SafeAreaView style={{ backgroundColor: colors.dark[400], flex: 1, height: '100%' }} >
            <View style={{ backgroundColor: colors.dark[800], height: '100%' }}>
                <View style={{ justifyContent: 'flex-start', backgroundColor: 'blue' }}>
                    <AppHeader />
                </View>
                {children}
            </View>
        </SafeAreaView>


    );
};

export default FullScreenWrapper;
