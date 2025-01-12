import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { News } from '@/Types';
import noimage from "@/assets/images/noimage.png";

export default function NewsScreen() {
    const params = useLocalSearchParams<{ news: string }>();
    const news: News = JSON.parse(params.news);

    const handleOpenLink = async () => {
        if (await Linking.canOpenURL(news.url)) {
            await Linking.openURL(news.url);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Image
                source={news.urlToImage ? { uri: news.urlToImage } : noimage}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{news.title}</Text>
                <Text style={styles.date}>
                    {new Date(news.publishedAt).toLocaleDateString()}
                </Text>
                <Text style={styles.description}>{news.description}</Text>
                <Text style={styles.fullContent}>{news.content}</Text>
                <TouchableOpacity style={styles.button} onPress={handleOpenLink}>
                    <Text style={styles.buttonText}>Read Full Article</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    image: {
        width: '100%',
        height: 200,
    },
    content: {
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    date: {
        fontSize: 14,
        color: '#888',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 15,
        lineHeight: 24,
    },
    fullContent: {
        fontSize: 16,
        color: '#ccc',
        lineHeight: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#444',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});