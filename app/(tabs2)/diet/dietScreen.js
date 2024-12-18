import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Fonts, Colors, Sizes, CommonStyles } from '../../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');

const favoriteDiets = [
    {
        id: '1',
        foodImage: require('../../../assets/images/food/food10.png'),
    },
    {
        id: '2',
        foodImage: require('../../../assets/images/food/food1.png'),
    },
    {
        id: '3',
        foodImage: require('../../../assets/images/food/food5.png'),
    },
    {
        id: '4',
        foodImage: require('../../../assets/images/food/food11.png'),
    }
];

const todaysPlans = [
    {
        id: '1',
        foodImage: require('../../../assets/images/food/food1.png'),
        mealsCategory: "Breakfast",
        eatTime: '8:00AM - 8.30AM',
    },
    {
        id: '2',
        foodImage: require('../../../assets/images/food/food2.png'),
        mealsCategory: "Lunch",
        eatTime: '12.30PM - 1.00PM',
    },
    {
        id: '3',
        foodImage: require('../../../assets/images/food/food3.png'),
        mealsCategory: "Snacks",
        eatTime: '5.00PM - 6.00PM',
    },
    {
        id: '4',
        foodImage: require('../../../assets/images/food/food4.png'),
        mealsCategory: "Dinner",
        eatTime: '8.00PM - 9.00PM',
    }
];

const dietCategoriesData = [
    {
        id: '1',
        foodImage: require('../../../assets/images/food/food8.png'),
        dietCategory: "Vegan Diet",
        planOfDays: 15,
        inFavorite: false,
    },
    {
        id: '2',
        foodImage: require('../../../assets/images/food/food9.png'),
        dietCategory: "Keto Diet",
        planOfDays: 15,
        inFavorite: false,
    },
    {
        id: '3',
        foodImage: require('../../../assets/images/food/food12.png'),
        dietCategory: "Fruit Diet",
        planOfDays: 15,
        inFavorite: false,
    },
    {
        id: '4',
        foodImage: require('../../../assets/images/food/food2.png'),
        dietCategory: "Egg Diet",
        planOfDays: 15,
        inFavorite: false,
    },
    {
        id: '5',
        foodImage: require('../../../assets/images/food/food3.png'),
        dietCategory: "Paleo Diet",
        planOfDays: 15,
        inFavorite: false,
    },
    {
        id: '6',
        foodImage: require('../../../assets/images/food/food13.png'),
        dietCategory: "Ketogenic Diet",
        planOfDays: 10,
        inFavorite: false,
    },
    {
        id: '7',
        foodImage: require('../../../assets/images/food/food14.png'),
        dietCategory: "Mediterranean diet",
        planOfDays: 15,
        inFavorite: false,
    },
    {
        id: '8',
        foodImage: require('../../../assets/images/food/food9.png'),
        dietCategory: "Low-carb Diet",
        planOfDays: 15,
        inFavorite: false,
    },
    {
        id: '9',
        foodImage: require('../../../assets/images/food/food6.png'),
        dietCategory: "South Beach Diet",
        planOfDays: 15,
        inFavorite: false,
    },
    {
        id: '10',
        foodImage: require('../../../assets/images/food/food15.png'),
        dietCategory: "Raw Food Diet",
        planOfDays: 15,
        inFavorite: false,
    },
];

const DietScreen = () => {

    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    function tr(key) {
        return t(`dietScreen:${key}`)
    }

    const isRtl = i18n.dir() == 'rtl';
    const [dietCategories, setDietCategories] = useState(dietCategoriesData);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarMsg, setSnackBarMsg] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {todaysDietPlanInfo()}
                            {dietCategoriesInfo()}
                            {favoriteDietInfo()}
                        </>
                    }
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            {snackBar()}
        </View>
    )

    function snackBar() {
        return (
            <Snackbar
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
                style={styles.sanckBarStyle}
            >
                <Text style={{ ...Fonts.whiteColor14Medium, textAlign: isRtl ? 'right' : 'left' }}>
                    {snackBarMsg}
                </Text>
            </Snackbar>
        )
    }

    function favoriteDietInfo() {
        const renderItem = ({ item }) => (
            <Image
                source={item.foodImage}
                style={styles.favoriteDietImageStyle}
            />
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding - 5.0 }}>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    {tr('favDietTitle')}
                </Text>
                <FlatList
                    data={favoriteDiets}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0 }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    function updateDietCategories({ id }) {
        const copyData = dietCategories;
        const updatedData = copyData.map((item) => {
            if (item.id == id) {
                setSnackBarMsg(item.inFavorite ? tr('removeFromFav') : tr('addInFav'))
                return { ...item, inFavorite: !item.inFavorite }
            }
            else {
                return { ...item }
            }
        })
        setShowSnackBar(true);
        setDietCategories(updatedData);
    }

    function dietCategoriesInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.push('dietCategoryDetail/dietCategoryDetailScreen')}
                style={styles.dietCategoriesInfoWrapStyle}
            >
                <ImageBackground
                    source={item.foodImage}
                    style={{ height: height / 6.0 }}
                    borderTopLeftRadius={Sizes.fixPadding - 2.0}
                    borderTopRightRadius={Sizes.fixPadding - 2.0}
                >
                    <MaterialIcons
                        name={item.inFavorite ? "favorite" : "favorite-outline"}
                        size={22}
                        color={Colors.whiteColor}
                        style={{ alignSelf: isRtl ? 'flex-start' : 'flex-end', margin: Sizes.fixPadding - 5.0, }}
                        onPress={() => updateDietCategories({ id: item.id })}
                    />
                </ImageBackground>
                <View style={{ alignItems: 'center', paddingVertical: Sizes.fixPadding - 5.0 }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {item.dietCategory}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor12Medium }}>
                        {item.planOfDays} day plan
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, }}>
                <View style={{ ...styles.dietCategoriesHeaderWrapStyle, flexDirection: isRtl ? 'row-reverse' : 'row', }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {tr('dietCategoryTitle')}
                    </Text>
                    <Text
                        onPress={() => navigation.push('dietCategories/dietCategoriesScreen', { dietCategories: JSON.stringify(dietCategories) })}
                        style={{ ...Fonts.primaryColor14SemiBold }}
                    >
                        {tr('seeAll')}
                    </Text>
                </View>
                <View style={{ marginHorizontal: Sizes.fixPadding }}>
                    <FlatList
                        data={dietCategories.slice(0, 2)}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        numColumns={2}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        )
    }

    function todaysDietPlanInfo() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.push('mealCategoryVideo/mealCategoryVideoScreen')}
                    style={{ alignItems: 'center', marginHorizontal: Sizes.fixPadding }}
                >
                    <Image
                        source={item.foodImage}
                        style={styles.foodImageStyle}
                    />
                    <View style={styles.mealsCategoryWrapStyle}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.mealsCategory}
                        </Text>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            {item.eatTime}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View>
                <Text style={{ textAlign: isRtl ? 'right' : 'left', marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16SemiBold }}>
                    {tr('todayPlanTitle')}
                </Text>
                <View style={{ marginTop: Sizes.fixPadding }}>
                    <FlatList
                        data={todaysPlans}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        horizontal
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 4.0, paddingHorizontal: Sizes.fixPadding }}
                        showsHorizontalScrollIndicator={false}
                        inverted={isRtl}
                    />
                </View>
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

export default DietScreen

const styles = StyleSheet.create({
    mealsCategoryWrapStyle: {
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        ...CommonStyles.shadow,
        position: 'absolute',
        bottom: -30.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 2.0
    },
    foodImageStyle: {
        width: width / 1.5,
        height: width / 2.5,
        resizeMode: 'stretch',
        borderRadius: Sizes.fixPadding - 2.0
    },
    dietCategoriesInfoWrapStyle: {
        flex: 1,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        ...CommonStyles.shadow,
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    favoriteDietImageStyle: {
        width: width / 2.4,
        height: height / 3.8,
        borderRadius: Sizes.fixPadding - 2.0,
        marginRight: Sizes.fixPadding * 2.0,
    },
    sanckBarStyle: {
        position: 'absolute',
        left: -10.0,
        right: -10.0,
        bottom: -10.0,
        backgroundColor: Colors.lightBlackColor,
        elevation: 0.0,
    },
    dietCategoriesHeaderWrapStyle: {
        marginBottom: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})