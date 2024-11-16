import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const { width } = Dimensions.get("screen");

type SwipeToDelete = {
  onDelete: () => void;
  enabled?: boolean;
  children: React.ReactElement;
};
export const SwipeToDelete: React.FC<SwipeToDelete> = ({
  children,
  onDelete,
}) => {
  const translateX = useSharedValue(0);

  const styleContent = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const styleHiddenAreaLeft = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [0, width * 0.15 - 1, width * 0.15],
      [1, 1, 1.3],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          scale,
        },
      ],
    };
  });

  const styleHiddenAreaRight = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [-width * 0.15, -width * 0.15 + 1, 0],
      [1.3, 1, 1],
      Extrapolation.CLAMP
    );
    return {
      transform: [
        {
          scale,
        },
      ],
    };
  });

  const gesture = Gesture.Pan()
    .activeOffsetX([-5, 5])
    .onChange((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      const dx = Math.abs(translateX.value);

      if (dx > width * 0.25) {
        translateX.value = withTiming(translateX.value * 4, {}, () => {
          runOnJS(onDelete)();
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  return (
    <Animated.View>
      <View style={[styles.container]}>
        <Animated.View style={styleHiddenAreaLeft}>
          <FontAwesome name="trash-o" size={24} />
        </Animated.View>
        <Animated.View style={styleHiddenAreaRight}>
          <FontAwesome name="trash-o" size={24} />
        </Animated.View>
      </View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styleContent}>{children}</Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ff4444",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});
