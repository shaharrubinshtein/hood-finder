import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList } from 'react-native';

interface AllHoods {
    neigborhood: string;
}

const NeighborhoodAutocomplete: React.FC<{ data: AllHoods[] }> = ({ data }) => {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [suggestions, setSuggestions] = useState<AllHoods[]>([]);
    const [allFilteredResults, setAllFilteredResults] = useState<AllHoods[]>([]);

    useEffect(() => {
        setSuggestions(data);
    });


    const handleSearch = (text: string) => {
        setSearchTerm(text);
        //console.log("data:", data);

        const filteredSuggestions = data.filter((item) =>

            item.neigborhood?.toLowerCase().includes(text.toLowerCase())
        );
        console.log("filtered:", filteredSuggestions)

        setSuggestions(filteredSuggestions);


        const combinedResults: AllHoods[] = [];
        filteredSuggestions.forEach((result) => {
            combinedResults.push(result);
        });

        setAllFilteredResults(combinedResults);
    };



    return (
        <View style={styles.searchSection}>
            <Image
                style={styles.searchIcon}
                source={require('../assets/images/search.png')}
            />
            <TextInput
                style={styles.input}
                placeholder="Search"
                value={searchTerm}
                onChangeText={(text: string) => handleSearch(text)}
            />

            {/* <FlatList
                data={suggestions}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.neighborhood}</Text>
                    </View>
                )}
                keyExtractor={(item) => item._id}
            />

            <FlatList
                data={allFilteredResults}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.neighborhood}</Text>

                    </View>
                )}
                keyExtractor={(item) => item._id}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        padding: 15,
        color: '#424242',
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#EEEEEE',
        height: 50,
        marginVertical: 10,
        borderRadius: 5,
        marginRight: 10,

    },
    searchIcon: {
        marginLeft: 15,
        height: 15,
        width: 15,
        justifyContent: "center",
        alignItems: 'center',
    }
});

export default NeighborhoodAutocomplete;