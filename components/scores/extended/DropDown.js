import React, { useState } from "react";
import { Dimensions } from "react-native";
import { Flex } from "native-base";
import DropDownPicker from "react-native-dropdown-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colorScheme } from "../../../constants";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const initialLabels = (labels) => {
  let mappedLabels = labels.map((label) => {
    return {
      label: label,
      value: label,
      icon: () => (
        <MaterialCommunityIcons
          name="basketball"
          size={18}
          color={colorScheme.text}
          style={{ marginRight: 10 }}
        />
      ),
    };
  });
  return mappedLabels;
};

const DropDown = ({ statState, changeStats }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Points");
  const [labels, setLabels] = useState(
    initialLabels(["Points", "Assists", "Rebounds"])
  );

  return (
    <Flex
      style={{
        width: windowWidth * 0.8,
        minHeight: 150,
        margin: 10,
        zIndex: 999,
        ...(Platform.OS !== "android" && {
          zIndex: 10,
          margin: 5,
          width: windowWidth * 0.8,
        }),
      }}
    >
      <DropDownPicker
        items={labels}
        setItems={setLabels}
        value={value}
        onChangeValue={(item) => {
          changeStats(value);
        }}
        setValue={setValue}
        open={open}
        setOpen={setOpen}
        textStyle={{ color: colorScheme.text }}
        style={{
          height: 40,
          margin: 5,
          alignItems: "center",
          backgroundColor: colorScheme.foreground,
          borderColor: colorScheme.divider,
        }}
        dropDownContainerStyle={{
          alignContent: "center",
          backgroundColor: colorScheme.title,
          borderColor: colorScheme.divider,
        }}
      />
    </Flex>
  );
};

export default DropDown;
