import { StyleSheet, Text, View, ScrollView, Modal, FlatList, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { Fonts, Colors, Sizes, CommonStyles } from '../../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');

const newVideos = [
    {
        id: '1',
        motivationalVideoThumbImage: require('../../../assets/images/exercises/exercise5.png')
    },
    {
        id: '2',
        motivationalVideoThumbImage: require('../../../assets/images/exercises/exercise6.png')
    },
    {
        id: '3',
        motivationalVideoThumbImage: require('../../../assets/images/exercises/exercise7.png')
    },
];

const workoutCategories = [
    {
        id: '1',
        category: 'Beginner',
        workoutImage: require('../../../assets/images/beginnerExercise/exercise1.png'),
        workouts: [
            {
                id: '1',
                workoutImage: require('../../../assets/images/beginnerExercise/exercise1.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
            {
                id: '2',
                workoutImage: require('../../../assets/images/beginnerExercise/exercise2.png'),
                workoutDescription: "Stay Active on odd days",
                totalWorkouts: '06',
            },
            {
                id: '3',
                workoutImage: require('../../../assets/images/beginnerExercise/exercise3.png'),
                workoutDescription: "Learn the basic of yoga",
                totalWorkouts: '08',
            },
            {
                id: '4',
                workoutImage: require('../../../assets/images/beginnerExercise/exercise4.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
            {
                id: '5',
                workoutImage: require('../../../assets/images/beginnerExercise/exercise5.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            }
        ],
    },
    {
        id: '2',
        category: 'Intermediate',
        workoutImage: require('../../../assets/images/intermediateExercise/exercise1.png'),
        workouts: [
            {
                id: '1',
                workoutImage: require('../../../assets/images/intermediateExercise/exercise1.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
            {
                id: '2',
                workoutImage: require('../../../assets/images/intermediateExercise/exercise2.png'),
                workoutDescription: "Stay Active on odd days",
                totalWorkouts: '06',
            },
            {
                id: '3',
                workoutImage: require('../../../assets/images/intermediateExercise/exercise3.png'),
                workoutDescription: "Learn the basic of yoga",
                totalWorkouts: '08',
            },
            {
                id: '4',
                workoutImage: require('../../../assets/images/intermediateExercise/exercise4.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
            {
                id: '5',
                workoutImage: require('../../../assets/images/intermediateExercise/exercise5.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
        ],
    },
    {
        id: '3',
        category: 'Advance',
        workoutImage: require('../../../assets/images/advanceExercise/exercise3.png'),
        workouts: [
            {
                id: '1',
                workoutImage: require('../../../assets/images/advanceExercise/exercise1.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
            {
                id: '2',
                workoutImage: require('../../../assets/images/advanceExercise/exercise2.png'),
                workoutDescription: "Stay Active on odd days",
                totalWorkouts: '06',
            },
            {
                id: '3',
                workoutImage: require('../../../assets/images/advanceExercise/exercise3.png'),
                workoutDescription: "Learn the basic of yoga",
                totalWorkouts: '08',
            },
            {
                id: '4',
                workoutImage: require('../../../assets/images/advanceExercise/exercise4.png'),
                workoutDescription: "Learn the basic of the tranning",
                totalWorkouts: '06',
            },
        ]
    },
];

const WorkoutScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == 'rtl';

    function tr(key) {
        return t(`workoutScreen:${key}`)
    }

    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1, }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets={true}>
                    {todayWorkoutInfo()}
                    {workoutCategoryInfo()}
                    {workouts()}
                    {workoutVideos()}
                </ScrollView>
            </View>
            {appointmentDialog()}
        </View>
    )

    function appointmentDialog() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showAppointmentDialog}
                onRequestClose={() => { setShowAppointmentDialog(false) }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { setShowAppointmentDialog(false) }}
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { }}
                            style={{ width: width - 40.0, borderRadius: Sizes.fixPadding - 2.0, alignSelf: 'center', backgroundColor: Colors.whiteColor }}
                        >
                            <View style={{ marginVertical: Sizes.fixPadding * 2.5, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                                <Text style={{ textAlign: 'center', ...Fonts.blackColor16Medium }}>
                                    {tr('appointmentTitle')}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        setShowAppointmentDialog(false)
                                        navigation.push('trainers/trainersScreen')
                                    }}
                                    style={styles.buttonStyle}
                                >
                                    <Text style={{ ...Fonts.whiteColor16Bold }}>
                                        {tr('bookAppintment')}
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    onPress={() => setShowAppointmentDialog(false)}
                                    style={{ textAlign: 'center', ...Fonts.grayColor16SemiBold }}
                                >
                                    {tr('skip')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    function workoutVideos() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ marginRight: Sizes.fixPadding * 2.0, borderRadius: Sizes.fixPadding - 2.0 }}
                    onPress={() => setShowAppointmentDialog(true)}
                >
                    <ImageBackground
                        source={item.motivationalVideoThumbImage}
                        style={styles.workoutThumbImageStyle}
                        borderRadius={Sizes.fixPadding - 2.0}
                    >
                        <MaterialIcons name="play-arrow" size={40} color={Colors.whiteColor} />
                        <View style={styles.currencyWrapStyle}>
                            <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                                ₱
                            </Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>

            )
        }
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('nextWorkoutTitle')}
                </Text>
                <FlatList
                    data={newVideos}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function workouts() {
        return (
            <View>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('workoutTitle')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row', marginHorizontal: Sizes.fixPadding }}>
                    {workoutsShort({ icon: require('../../../assets/images/icons/workout.png'), title: tr('userProgram'), onPress: () => { navigation.push('videos/videosScreen') } })}
                    {workoutsShort({ icon: require('../../../assets/images/icons/trainer.png'), title: tr('trainer'), onPress: () => { navigation.push('trainers/trainersScreen') } })}
                </View>
            </View>
        )
    }

    function workoutsShort({ icon, title, onPress }) {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                style={styles.workoutsWrapStyle}
            >
                <Image
                    source={icon}
                    style={{ height: height / 8.0, resizeMode: 'contain', marginBottom: Sizes.fixPadding + 5.0 }}
                />
                <Text style={{ textAlign: 'center', ...Fonts.blackColor16Bold }}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

    function workoutCategoryInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0 }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('workoutCategoryTitle')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    {
                        workoutCategories.map((item) => (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                key={`${item.id}`}
                                style={{ flex: 1, marginHorizontal: Sizes.fixPadding, }}
                                onPress={() => navigation.push('workoutCategoryDetail/workoutCategoryDetailScreen', { item: JSON.stringify(item) })}
                            >
                                <ImageBackground
                                    source={item.workoutImage}
                                    style={{ height: height / 10.0, }}
                                    borderRadius={Sizes.fixPadding - 2.0}
                                >
                                    <View style={styles.workoutCategoryImageCoverStyle}>
                                        <Text numberOfLines={1} style={{ ...Fonts.whiteColor14SemiBold }}>
                                            {item.category}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    function todayWorkoutInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text
                    style={{
                        textAlign: isRtl ? 'right' : 'left',
                        marginBottom: Sizes.fixPadding,
                        ...Fonts.blackColor16SemiBold
                    }}
                >
                    {tr('todayVideo')}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.push('videos/videosScreen')}
                    style={{ alignItems: 'center' }}
                >
                    <Image
                        source={require('../../../assets/images/exercises/exercise11.png')}
                        style={{ width: '100%', height: height / 4.0, borderRadius: Sizes.fixPadding - 2.0, }}
                    />
                    <View style={styles.workoutInfoWrapStyle}>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            Day 1
                        </Text>
                        <Text style={{ ...Fonts.grayColor12SemiBold }}>
                            7.00 AM - 8.00 AM
                        </Text>
                        <Text style={{ ...Fonts.primaryColor16SemiBold }}>
                            Full Body Tranning
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    function header() {
        return (
            <Text style={{ margin: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.blackColor18SemiBold }}>
                {tr('header')}
            </Text>
        )
    }
}

export default WorkoutScreen

const styles = StyleSheet.create({
    workoutInfoWrapStyle: {
        marginTop: -Sizes.fixPadding * 4.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        ...CommonStyles.shadow,
        borderRadius: Sizes.fixPadding - 2.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    workoutCategoryImageCoverStyle: {
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    workoutsWrapStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        ...CommonStyles.shadow,
        borderRadius: Sizes.fixPadding - 2.0,
        flex: 1,
        marginHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        borderWidth: 1.0,
        borderBottomWidth: 0.0,
        borderColor: Colors.lightGrayColor,
    },
    workoutThumbImageStyle: {
        width: width / 1.7,
        height: width / 2.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    currencyWrapStyle: {
        backgroundColor: Colors.primaryColor,
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 5.0,
        right: 5.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginTop: Sizes.fixPadding * 3.0,
        marginBottom: Sizes.fixPadding,
    },
})