import React from "react";
import {
  FragmentType,
  graphql,
  getFragmentData,
} from "@/graphql/__generated__";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { extractFileName } from "@/utils/extract-file-name.util";
import { useMemo } from "react";
import { Buffer } from "buffer";

enum AvatarSize {
  SMALL = 24,
  MEDIUM = 36,
  LARGE = 48,
  XLARGE = 72,
}

type AvatarProps = {
  size?: "small" | "medium" | "large" | "xlarge";
  user?: FragmentType<typeof UserAvatar_UserFragment>;
  style?: ViewStyle;
  border?: boolean;
  navigate?: boolean;
  onPress?: () => void;
  disabled?: boolean;
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
    avatar
  }
`);

export const Avatar: React.FC<AvatarProps> = React.memo(
  ({
    size = "medium",
    border = false,
    navigate = true,
    onPress,
    style,
    disabled = false,
    ...props
  }) => {
    const router = useRouter();
    const user = getFragmentData(UserAvatar_UserFragment, props.user);
    const handlePressAvatar = () => {
      if (user) {
        if (navigate) {
          router.navigate({
            pathname: "/(authenticated)/(tabs)/(posts)/profile/[id]",
            params: {
              id: user.id,
            },
          });
        }
      }

      if (onPress) {
        onPress();
      }
    };

    const avatarIsNull = !user?.avatar || user.avatar === "";

    const getImagePath = useMemo(
      () =>
        (height: number = 100, width: number = 100) => {
          if (!user) {
            return "";
          }

          // isTemp (optimistic Response)
          if (user.avatar.startsWith("file://")) {
            return user.avatar;
          }

          const imageRequest = JSON.stringify({
            bucket: "md-social-network",
            key: extractFileName(user.avatar),
            edits: {
              resize: {
                width,
                height,
                fit: "cover",
              },
              png: {
                quality: 100,
              },
            },
          });
          const encoded = Buffer.from(imageRequest).toString("base64");

          return `${env.process.AWS_SERVERLESS_IMAGE_HANDLER}/${encoded}`;
        },
      [user?.avatar]
    );

    return (
      <View
        style={[
          border && styles.border,
          {
            ...style,
            borderRadius: sizes[size],
          },
        ]}
      >
        <TouchableOpacity
          onPress={handlePressAvatar}
          style={{ width: sizes[size] }}
          disabled={disabled}
        >
          {avatarIsNull ? (
            <View
              style={[
                styles.emptyAvatar,
                {
                  height: sizes[size],
                  width: sizes[size],
                  borderRadius: sizes[size],
                },
              ]}
            />
          ) : (
            <Image
              style={[
                {
                  height: sizes[size],
                  width: sizes[size],
                  borderRadius: sizes[size],
                },
              ]}
              source={getImagePath(100, 100)}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
  emptyAvatar: {
    backgroundColor: "#444",
  },
  border: {
    backgroundColor: "#1A1919",
    padding: 4,
  },
});
