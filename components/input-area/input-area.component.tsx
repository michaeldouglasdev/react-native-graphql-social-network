import { Control, RegisterOptions, useController } from "react-hook-form";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type InputAreaProps = TextInputProps & {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
};
export const InputArea: React.FC<InputAreaProps> = ({
  name,
  control,
  rules,
  ...props
}) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
    rules,
  });

  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      autoFocus
      style={styles.textArea}
      placeholderTextColor="#AAA"
      multiline={true}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textArea: {
    fontFamily: "Inter",
    fontSize: 16,
    marginLeft: 8,
    color: "#FFF",
    flex: 1,
  },
});
