import { useState } from "react";
import { Control, useController } from "react-hook-form";
import {
  StyleSheet,
  View,
  TextInput as TextInputRN,
  TextInputProps as TextInputPropsRN,
  Text,
} from "react-native";

type TextInputProps = TextInputPropsRN & {
  name: string;
  control?: Control<any>;
  label?: string;
  borderType?: "default" | "rounded";
};
export const TextInput: React.FC<TextInputProps> = ({
  name,
  control,
  label,
  borderType = "default",
  ...props
}) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });
  const [focus, setFocus] = useState(false);
  return (
    <View
      style={[
        styles.container,
        borderType === "rounded" && styles.rounded,
        focus && styles.containerFocus,
      ]}
    >
      <TextInputRN
        value={field.value}
        onChangeText={field.onChange}
        style={styles.input}
        placeholderTextColor="#555"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
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
    height: 48,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#444444",
    //backgroundColor: "#2C2C2C",
  },
  rounded: {
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
