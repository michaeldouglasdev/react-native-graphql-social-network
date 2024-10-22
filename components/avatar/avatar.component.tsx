import { DocumentType, FragmentType, graphql } from "@/graphql/__generated__";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

enum AvatarSize {
  SMALL = 24,
  MEDIUM = 36,
  LARGE = 48,
  XLARGE = 72,
}

type AvatarProps = {
  size?: "small" | "medium" | "large" | "xlarge";
  user?: DocumentType<typeof UserAvatar_UserFragment>;
  style?: ViewStyle;
};

const sizes = {
  small: AvatarSize.SMALL,
  medium: AvatarSize.MEDIUM,
  large: AvatarSize.LARGE,
  xlarge: AvatarSize.XLARGE,
};

export const UserAvatar_UserFragment = graphql(`
  fragment UserAvatar on User {
    id
    name
  }
`);

export const Avatar: React.FC<AvatarProps> = ({
  size = "medium",
  user,
  style,
}) => {
  const router = useRouter();

  const navigate = () => {
    if (!user) {
      return;
    }

    router.navigate({
      pathname: "/(authenticated)/(tabs)/(posts)/profile/[id]",
      params: {
        id: user.id,
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={navigate}
      style={{ width: sizes[size], ...style }}
    >
      <View
        style={[
          styles.container,
          {
            height: sizes[size],
            width: sizes[size],
            borderRadius: sizes[size],
          },
        ]}
      ></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#444",
  },
});
