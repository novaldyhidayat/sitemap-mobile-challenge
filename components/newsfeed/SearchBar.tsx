import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SearchBarProps } from "@/Types";

const SearchBar = ({ onSearch }: SearchBarProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for news..."
                placeholderTextColor="#888"
                onChangeText={onSearch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 30
    },
    input: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        color: '#fff',
    },
});

export default SearchBar;
