import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';

interface CategoryItemProps {
    item: {
        name: string;
        color: string;
        image: ImageSourcePropType;
    };
    index: number;
    selectedCategory: number | null;
    handlePress: (index: number) => void;
    itemWidth: number;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, index, selectedCategory, handlePress, itemWidth }) => {
    const isSelected = selectedCategory === index;
    const backgroundColor = isSelected ? item.color : '#FFFFFF';
    const textColor = isSelected ? '#31343D' : '#9F9F9F';

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={[styles.categoriecontainer, { width: itemWidth }]}>
                <TouchableOpacity onPress={() => handlePress(index)}>
                    <View style={[styles.categoriecircle, { backgroundColor, borderColor: item.color, borderWidth: 1, marginBottom: 10 }]}>
                        <Image style={{ width: 30, height: 30 }} source={item.image} />
                    </View>
                    <Text style={[styles.categorietext, { color: textColor }]}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    categoriecontainer: {
        alignItems: 'center',
        paddingTop: 8,
        paddingHorizontal: 5,
    },
    categoriecircle: {
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categorietext: {
        color: '#9F9F9F',
        textAlign: 'center',
        fontFamily: 'Raleway-SemiBold',
        fontSize: 11
    },
});

export default CategoryItem;
