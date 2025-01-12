import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import Carousel from '@/components/newsfeed/Carousel';
import NewsCard from '@/components/newsfeed/NewsCard';
import SearchBar from '@/components/newsfeed/SearchBar';
import { News } from '@/Types';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
    const navigation = useNavigation();
    const [newsData, setNewsData] = useState<News[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('Apple');
    const [page, setPage] = useState<number>(1);
    const pageSize = 10;
    const isFetching = useRef<boolean>(false);

    const buildQueryParams = (query: string, page: number) => {
        let queryString = `q=${query}&apiKey=d093e70cc9f1455daef908614f6e3613&page=${page}&pageSize=${pageSize}&sortBy=popularity`;
        return queryString;
    };

    const fetchData = useCallback(async (query: string, page: number) => {
        if (isFetching.current) return;
        isFetching.current = true;

        try {
            setLoading(true);
            const queryParams = buildQueryParams(query, page);
            const response = await axios.get(`https://newsapi.org/v2/everything?${queryParams}`);

            const filteredArticles = response.data.articles.filter((article: any) => article.title !== '[Removed]');
            setNewsData((prevData) => page === 1 ? filteredArticles : [...prevData, ...filteredArticles]);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch news:', error);
            setLoading(false);
        } finally {
            isFetching.current = false;
        }
    }, []);

    const handleSearch = (text: string) => {
        setQuery(text);
        setPage(1);
    };

    const handleLoadMore = () => {
        if (!loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleNewsPress = (news: News) => {
        navigation.navigate('news', {
            news: JSON.stringify(news)
        });
    };

    useEffect(() => {
        fetchData(query, page);
    }, [query, page, fetchData]);

    return (
        <View style={styles.container}>
            <SearchBar onSearch={handleSearch} />
            <Carousel data={newsData.slice(0, 5)} />
            {loading && page === 1 ? (
                <ActivityIndicator size="large" color="#fff" style={styles.loader} />
            ) : (
                <FlatList
                    data={newsData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <NewsCard news={item} onPress={() => handleNewsPress(item)} />
                    )}
                    ListFooterComponent={loading ? <ActivityIndicator size="small" color="#fff" /> : null}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.2}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
    },
    loader: {
        marginTop: 5,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingTop: 3,
    },
});

export default Index;
