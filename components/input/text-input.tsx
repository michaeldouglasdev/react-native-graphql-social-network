import { useState } from "react";
import { Control, Controller, useController } from "react-hook-form";
import {
  StyleSheet,
  View,
  TextInput as TextInputRN,
  TextInputProps as TextInputPropsRN,
  Text,
} from "react-native";

enum TextInputSize {
  SMALL = 40,
  MEDIUM = 44,
  LARGE = 48,
}
const sizes = {
  small: TextInputSize.SMALL,
  medium: TextInputSize.MEDIUM,
  large: TextInputSize.LARGE,
};
type SizeVariant = "small" | "medium" | "large";
type BorderVariant = "default" | "rounded" | "none";
type TextInputProps = TextInputPropsRN & {
  name: string;
  control: Control<any>;
  label?: string;
  border?: BorderVariant;
  size?: SizeVariant;
};
export const TextInput: React.FC<TextInputProps> = ({
  name,
  control,
  label,
  border = "default",
  size = "large",
  style,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View
      style={[
        styles.container,
        getBorder(border),
        focus && styles.containerFocus,
      ]}
    >
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInputRN
            value={value}
            onChangeText={onChange}
            style={[styles.input, getSize(size)]}
            placeholderTextColor="#555"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            {...props}
          />
        )}
      />

      {label ? (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#444444",
    //backgroundColor: "#2C2C2C",
  },
  borderNone: {
    borderWidth: 0,
  },
  borderRounded: {
    borderRadius: 24,
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,

    color: "#FFF",
  },
  labelContainer: {
    backgroundColor: "#1A1919",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    position: "absolute",
    top: -10,
    left: 12,
  },
  label: {
    fontSize: 14,
    color: "#FFF",
  },
  containerFocus: {
    //borderColor: "#F6009C66",
  },
});

const getBorder = (border: BorderVariant) => {
  switch (border) {
    case "default":
      return;
    case "rounded":
      return styles.borderRounded;
    case "none":
      return styles.borderNone;
  }
};

const getSize = (size: SizeVariant) => {
  return { height: sizes[size] };
};
