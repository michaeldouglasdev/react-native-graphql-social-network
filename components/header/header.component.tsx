import { StyleSheet, View, Text } from "react-native";
import { Avatar, UserAvatar_UserFragment } from "../avatar/avatar.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMeQuery } from "@/hooks/me.query.hook";
import AntDesign from "@expo/vector-icons/AntDesign";
import { DocumentType, FragmentType } from "@/graphql/__generated__";

type HeaderProps = {
  avatar?: boolean | FragmentType<typeof UserAvatar_UserFragment>;
  avatarCenter?: boolean;
  title?: string;
  icon?: keyof typeof AntDesign.glyphMap;
  disabledPressAvatar?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  avatar = true,
  avatarCenter = false,
  title = "",
  icon,
  disabledPressAvatar = false,
}) => {
  const { top } = useSafeAreaInsets();
  const { data } = useMeQuery();

  const getAvatar = () => {
    if (avatar === true) {
      return data?.me;
    } else if (typeof avatar === "object") {
      return avatar;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: 36 + top / 2 },
        avatarCenter && { paddingBottom: 12 },
      ]}
    >
      <View style={styles.content}>
        {!avatarCenter && avatar != false ? (
          <View style={[styles.left]}>
            <Avatar
              size="medium"
              user={getAvatar()}
              disabled={disabledPressAvatar}
            />
          </View>
        ) : null}

        {avatarCenter && (
          <Avatar
            size="medium"
            user={getAvatar()}
            style={styles.avatarCenter}
            disabled={disabledPressAvatar}
          />
        )}
        <View style={styles.titleContainer}>
          <Text style={[styles.title]}>{title}</Text>
        </View>
        {icon ? (
          <View style={[styles.right]}>
            <View style={styles.iconWrapper}>
              <AntDesign size={28} name={icon} style={styles.icon} />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1919",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    justifyContent: "center",
  },
  left: {
    position: "absolute",
    left: 16,
    top: -4,
  },
  right: {
    position: "absolute",
    right: 16,
    top: -4,
  },
  content: {
    alignItems: "center",
  },
  titleContainer: {
    height: 24,
  },
  title: {
    fontSize: 16,
    color: "#FFF",
    fontFamily: "InterBold",
  },
  iconWrapper: {
    width: 32,
    justifyContent: "flex-end",
  },
  icon: {
    alignSelf: "flex-end",
    color: "#CCC",
  },
  avatarCenter: {
    marginBottom: 4,
  },
});
