import Animated, {
  EntryExitAnimationFunction,
  FadeIn,
  FadeOut,
  Layout,
  LinearTransition,
} from "react-native-reanimated";
import { ReanimatedKeyframe } from "react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/animationBuilder/Keyframe";

type TransitionProps = {
  entering?: ReanimatedKeyframe;
  exiting?: EntryExitAnimationFunction;
  children: React.ReactElement;
  layout?: LinearTransition;
  index?: number;
};
export const Transition: React.FC<TransitionProps> = ({
  exiting = FadeOut,
  index = 1,
  entering = FadeIn.delay(100 * index),
  layout,
  children,
}) => {
  return (
    <Animated.View entering={entering} exiting={exiting} layout={layout}>
      {children}
    </Animated.View>
  );
};
