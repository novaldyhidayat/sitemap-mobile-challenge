import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NewsCardProps } from "@/Types";
// @ts-ignore
import noimage from "@/assets/images/noimage.png";

const NewsCard = ({ news, onPress }: NewsCardProps) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.cardContent}>
                <Image
                    source={news.urlToImage ? { uri: news.urlToImage } : noimage}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{news.title}</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {news.description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#333',
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#ccc',
    },
});

export default NewsCard;
