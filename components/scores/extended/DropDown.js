import { Flex } from "native-base";
import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const DropDown = ({ statState, changeStats }) => {
  const [leaderDropdown, setDropdown] = useState({ value: "Points" });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Points");
  const [items, setItems] = useState([
    {
      label: "Points",
      value: "Points",
      icon: () => (
        <MaterialCommunityIcons
          name="basketball"
          size={18}
          color="#900"
          style={{ marginRight: 10 }}
        />
      ),
    },
    {
      label: "Rebounds",
      value: "Rebounds",
      icon: () => (
        <MaterialCommunityIcons
          name="basketball"
          size={18}
          color="#900"
          style={{ marginRight: 10 }}
        />
      ),
    },
    {
      label: "Assists",
      value: "Assists",
      icon: () => (
        <MaterialCommunityIcons
          name="basketball"
          size={18}
          color="#900"
          style={{ marginRight: 10 }}
        />
      ),
    },
  ]);

  return (
    <Flex
      style={{
        width: windowWidth * 0.8,
        minHeight: 175,
        margin: 5,
        zIndex: 999,
        ...(Platform.OS !== "android" && {
          zIndex: 10,
          margin: 5,
          width: windowWidth * 0.8,
        }),
      }}
    >
      <DropDownPicker
        items={items}
        setItems={setItems}
        value={value}
        setValue={setValue}
        open={open}
        setOpen={setOpen}
        onChangeValue={(item) => {
          setDropdown({ value: value });
          changeStats(value);
        }}
        style={{
          height: 40,
          margin: 5,
          alignItems: "center",
          backgroundColor: "#C32F27",
          borderColor: "darkgrey",
        }}
        dropDownContainerStyle={{
          alignContent: "center",
          backgroundColor: "#900",
        }}
      />
    </Flex>
  );
};

export default DropDown;
