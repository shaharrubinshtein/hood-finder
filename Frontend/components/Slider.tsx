import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

interface FilterSliderProps {
  label: string;
}

const FilterSlider: React.FC<FilterSliderProps> = ({ label }) => {
  const [value, setValue] = useState(0);

  return (
    <View>
      <Text>{label}: {value}</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={value}
        onValueChange={(sliderValue: number) => setValue(sliderValue)}
      />
    </View>
  );
};

export default FilterSlider;