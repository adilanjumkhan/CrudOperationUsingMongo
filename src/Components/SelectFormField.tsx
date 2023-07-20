import React from 'react';
import {Select} from 'native-base';
import {StyleSheet} from 'react-native';

type SelectedFieldProp = {
  gender: string;
  setGender: (selectedGender: string) => void;
};

const SelectField = (prop: SelectedFieldProp): JSX.Element => {
  return (
    <Select
      selectedValue={prop.gender}
      accessibilityLabel="Choose Gender"
      placeholder="Choose Gender"
      _selectedItem={{
        bg: '#00d6ff',
      }}
      variant="unstyled" // Disable the border
      style={styles.inputField}
      onValueChange={prop.setGender}
      _ios={{
        bg: '#FFFFFF', // Background color for iOS
      }}
      _android={{
        bg: '#FFFFFF', // Background color for Android
      }}
      placeholderTextColor="#79e9ff" // Placeholder text color
      borderRadius={9}
      marginY={1}
      padding={3}>
      <Select.Item label="Male" value="male" />
      <Select.Item label="Female" value="female" />
      <Select.Item label="Other" value="other" />
    </Select>
  );
};

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: 'white',
    color: '#00d6ff',
    fontSize: 14,
  },
});

export default SelectField;
