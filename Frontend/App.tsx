
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import NeighborhoodAutocomplete from './components/Autocompleate';
// import FilterSlider from './components/Slider';
import Modal from 'react-native-modal';
// import Slider from '@react-native-community/slider';

const App: React.FC = () => {

  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [AllHoods, setAllHoods] = useState<string[]>([])
  const [minAge, setMinAge] = useState<number>(0)
  const [maxAge, setMaxAge] = useState<number>(120)
  const [maxDistance, setMaxDistance] = useState<number>(0)
  const [filteredByAge, setFilteredByAge] = useState<string[]>([])
  const [filteredByDistance, setFilteredByDistance] = useState<string[]>([])
  const [field, setField] = useState<string[]>([])
  const [order, setOrder] = useState<number>(1)

  const [filteredByName, setFilteredByName] = useState<AllHoods[]>([]);


  const apiUrl = 'http://localhost:3000/neighborhoods';



  useEffect(() => {
    async function fetchAllHoods() {
      const response = await fetch(apiUrl)
        if(!response) {
          throw new Error("fetching all hoods failed!");
        }
        const data = await response.json();
        setAllHoods(data.neighborhoods)
    }
    fetchAllHoods()
  },[])

  async function fetchHoodsByageRange() {
    const response = await fetch(`${apiUrl}/ageRange?minAge=${minAge}&maxAge=${maxAge}`)
      if(!response) {
        throw new Error("fetching all hoods by age failed!");
      }
      const data = await response.json();
      setFilteredByAge(data)
  }

  async function fetchHoodsByDistance() {
    const response = await fetch(`${apiUrl}/maxDistance?distance=${maxDistance}`)
      if(!response) {
        throw new Error("fetching hoods by distance failed!");
      }
      const data = await response.json();
      setFilteredByDistance(data)
  }

  async function fetchSortedBy() {
    const response = await fetch(`${apiUrl}/sortBy?field=${field}&order=${order}`)
      if(!response) {
        throw new Error("fetching hoods by distance failed!");
      }
      const data = await response.json();
      setFilteredByDistance(data)
  }


  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ margin: 20 }}>
        <Text style={styles.appName}>Hood</Text>
        <Text style={styles.Header}>Finder</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <NeighborhoodAutocomplete data={AllHoods}/>

          <Modal style={styles.bottomModalView} isVisible={isModalVisible} backdropOpacity={0} onBackdropPress={toggleModal}>
            <View style={styles.modal}>
              <Text style={{ marginTop: 20 }}>Age Range</Text>
              {/* <FilterSlider label="Min Age" /> */}
              {/* <FilterSlider label="Max Age" /> */}

              <Text style={{ marginTop: 20 }}>Distance</Text>
              {/* <Slider
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={value}
                onValueChange={(sliderValue: number) => setValue(sliderValue)}
              /> */}
              {/* Add sort by filter */}
              {/* <Text style={styles.modalText}>Tap outside the modal to close</Text> */}
            </View>
          </Modal>


          <TouchableOpacity style={styles.button}
            onPress={toggleModal}
          >
            <Image style={styles.filterImage}
              source={require('./assets/images/filter.png')}>
            </Image>

          </TouchableOpacity>
          {/* <Text style={styles.seeMore}>See more</Text> */}
        </View>
        <Text style={styles.title}>Hoods</Text>
        <View style={styles.container}>
          <FlatList
            data={AllHoods}
            renderItem={({ item }) => 
            <View style={styles.box}>
              {/* {console.log("item-->", item)} */}
              <Text style={styles.title}>{item.neigborhood}</Text>
              <Text style={[{...styles.appName}, {color: '#3FAFE4'}]}>{item['distance from city center']} km from center</Text>
              <Text style={[{...styles.appName}, {marginTop: 5}]}>Avg age: {item['average age']}</Text>
            </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  appName: {
    fontSize: 12,
    fontWeight: 'medium',
    color: '#424242'
  },
  Header: {
    marginTop: 10,
    fontSize: 20
  },
  title: {
    fontSize: 16,
    marginTop: 20,
    marginBottom:5
  },
  seeMore: {
    fontSize: 10,
    fontWeight: 'medium',
    color: '#424242',
    marginLeft: 'auto'
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#3FAFE4',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterImage: {
    width: "45%",
    height: "45%",
    alignSelf: 'center',
  },

  bottomModalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal: {
    width: "100%",
    height: "86%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  modalText: {
    fontSize: 20
  },
  container: {
    height: '100%', 
  },
  box: {
    height: 100,
    backgroundColor: '#EBEBEC',
    borderRadius: 5,
    marginVertical: 7,
    paddingLeft:10
  }
});

export default App;
