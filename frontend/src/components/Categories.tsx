import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth > 600 ? screenWidth / 11 : 70;

interface CategoryItemProps {
    selectedCategory: number | null;
    handlePress: (index: number) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ selectedCategory, handlePress }) => {
    const categories = [
        { name: 'Transport', color: '#3DC8B4', image: require('../assets/Carpooling.png'), description: 'Share rides or send packages efficiently with our Carpooling & Courier services, saving you time and money.' },
        { name: 'Market', color: '#B35D46', image: require('../assets/RentalsSales.png'), description: 'Browse and post listings for rentals and sales, connecting you with buyers and sellers in your community.' },
        { name: 'Leisure', color: '#0296E5', image: require('../assets/Entertainment.png'), description: 'Join in on the fun with Entertainment & Sports events and activities happening in your area.' },
        { name: 'Recovery', color: '#DDB18A', image: require('../assets/LostFound.png'), description: 'Report or recover lost items with our Lost & Found services, ensuring your belongings are returned safely.' },
        { name: 'Dining', color: '#34A853', image: require('../assets/FoodGroceries.png'), description: 'Get the best deals on food and groceries with our convenient services, saving you time and money.' },
        { name: 'Fitness', color: '#FF405C', image: require('../assets/Health.png'), description: 'Maintain a healthy lifestyle with our Health & Wellness services, offering resources and support.' },
        { name: 'Tech', color: '#0B799D', image: require('../assets/TechnologyGadgets.png'), description: 'Stay up-to-date with the latest technology and gadgets through our services, designed to keep you connected.' },
        { name: 'Education', color: '#143D80', image: require('../assets/LearningTutoring.png'), description: 'Expand your knowledge and skills with our Learning & Tutoring services, offering educational resources and support.' },
        { name: 'Finance', color: '#3D997A', image: require('../assets/MoneyServices.png'), description: 'Access a range of Money Services to manage your finances, including transfers, exchanges, and more.' },
        { name: 'Borrow', color: '#816AE2', image: require('../assets/ItemSharingLending.png'), description: 'Share and lend items within your community, fostering a culture of collaboration and resourcefulness.' },
        { name: 'Guides', color: '#41c1f5', image: require('../assets/InformationResources.png'), description: 'Access vital information and resources to stay informed and make well-informed decisions.' },
    ];

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Text style={{ fontFamily: 'Raleway-Bold', fontSize: 40, marginLeft: 8, color: '#434752' }}>Services</Text>
                <View style={{ backgroundColor: 'blue', borderWidth: 1.5, width: 100, marginLeft: 11, borderRadius: 15, marginTop: 4, borderColor: '#DD644A' }} />
            </View>

            {/* list */}
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#d8d8d8', paddingLeft: 15 }}>
                <View style={{ marginRight: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 70 }}>
                    {/* circle */}
                    <View style={{ backgroundColor: '#DD644A', padding: 17, alignItems: 'center', justifyContent: 'center', borderRadius: 50, marginBottom: 7 }}>
                        <Image source={require('../assets/Category.png')} style={{ width: 31, height: 31 }} resizeMode="cover" />
                    </View>
                    <Text style={{ fontFamily: 'Raleway-Bold', color: '#31343D', fontSize: 12, textAlign: 'center' }}>Categories</Text>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    keyExtractor={(item) => item.name} // Use item.name as the key
                    renderItem={({ item, index }) => {
                        const isSelected = selectedCategory === index;
                        const backgroundColor = isSelected ? item.color : '#FFFFFF';
                        const textColor = isSelected ? '#31343D' : '#9F9F9F';

                        return (
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <View style={{ marginRight: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: itemWidth }}>
                                    <TouchableOpacity onPress={() => handlePress(index)}>
                                        <View style={{ backgroundColor, borderColor: item.color, borderWidth: 1, marginBottom: 10, borderRadius: 50, padding: 17, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ width: 30, height: 30 }} source={item.image} />
                                        </View>
                                        <Text style={{ fontFamily: 'Raleway-Bold', color: textColor, fontSize: 12, textAlign: 'center' }}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default CategoryItem;
