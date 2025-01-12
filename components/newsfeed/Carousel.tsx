import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { CarouselProps } from "@/Types";
// @ts-ignore
import noimage from '@/assets/images/noimage.png';

const Carousel = ({ data }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const scrollToNextItem = () => {
        if (scrollViewRef.current) {
            const nextIndex = (currentIndex + 1) % data.length;
            setCurrentIndex(nextIndex);
            const offsetX = nextIndex * (styles.carouselItem.width + 15);
            scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
        }
    };

    useEffect(() => {
        const interval = setInterval(scrollToNextItem, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, data.length]);

    return (
        <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
            contentContainerStyle={styles.carouselContainer}
        >
            {data.map((item: any, index: number) => (
                <View key={index} style={styles.carouselItem}>
                    <Image
                        source={item.urlToImage ? { uri: item.urlToImage } : noimage}
                        style={styles.image}
                    />
                    <Text style={styles.carouselTitle}>{item.title}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    carousel: {
        zIndex: 999,
        height: 10,
    },
    carouselContainer: {
        flexDirection: 'row',
    },
    carouselItem: {
        width: 250,
        marginRight: 15,
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 200,
        borderRadius: 8,
    },
    carouselTitle: {
        marginTop: 10,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Carousel;