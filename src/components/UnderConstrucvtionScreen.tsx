/**
 * UnderConstructionScreen
 * ------------------------------------------------------------------
 * Drop-in "coming soon" screen for an app that's still being built.
 *
 * Concept: your theme colors (navy #030877 on pale blue #E5F0FF) are,
 * almost exactly, cyanotype blueprint colors. So instead of a generic
 * spinner/empty-state, this is drawn as an architect's blueprint of
 * the app: a wireframe phone mid-sketch, dimension lines, a rotated
 * "draft" stamp, and title-block annotations. Two deliberate motions
 * carry the "still in progress" feeling:
 *   1. The phone outline's dashed stroke marches, like it's still
 *      being drawn.
 *   2. The skeleton content lines inside it pulse, like placeholders
 *      waiting for real content.
 * Both respect the OS "reduce motion" setting.
 *
 * Requires: react-native-svg
 *   npm install react-native-svg
 *
 * Usage:
 *   <UnderConstructionScreen
 *     progress={0.42}
 *     onNotifyPress={() => {...}}
 *   />
 */

import { appThemes } from "@/constants/theme";
import { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, {
  Defs,
  G,
  Line,
  Path,
  Pattern,
  Rect,
  Text as SvgText,
} from "react-native-svg";

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedG = Animated.createAnimatedComponent(G);

interface UnderConstructionScreenProps {
  /** 0 to 1. Omit to hide the progress row entirely. */
  progress?: number;
  /** Called when the person taps "Get notified". Omit to hide the button. */
  onNotifyPress?: () => void;
  /** Small title-block detail, e.g. a build or revision number. */
  revision?: string;
}

const PHONE_W = 150;
const PHONE_H = 280;
const ILLUSTRATION_W = 230;
const ILLUSTRATION_H = 340;
const PHONE_X = (ILLUSTRATION_W - PHONE_W) / 2;
const PHONE_Y = 36;

export default function UnderConstructionScreen({
  progress,
  onNotifyPress,
  revision = "REV. 003",
}: UnderConstructionScreenProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const dashOffset = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true;
    AccessibilityInfo.isReduceMotionEnabled?.().then((enabled) => {
      if (isMounted) setReduceMotion(!!enabled);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const marchingAnts = Animated.loop(
      Animated.timing(dashOffset, {
        toValue: -20,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    );
    const skeletonPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.35,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    marchingAnts.start();
    skeletonPulse.start();

    return () => {
      marchingAnts.stop();
      skeletonPulse.stop();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (typeof progress !== "number") return;
    Animated.timing(progressAnim, {
      toValue: Math.max(0, Math.min(1, progress)),
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.screen}>
      {/* Graph-paper grid, drawn once as a tiled SVG pattern */}
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Defs>
          <Pattern
            id="grid"
            width={26}
            height={26}
            patternUnits="userSpaceOnUse"
          >
            <Path
              d="M 26 0 L 0 0 0 26"
              fill="none"
              stroke={appThemes.activeColor}
              strokeOpacity={0.07}
              strokeWidth={1}
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grid)" />
      </Svg>

      <View style={styles.content}>
        {/* Draft stamp */}
        <View style={styles.stamp} pointerEvents="none">
          <Text style={styles.stampTextTop}>IN</Text>
          <Text style={styles.stampTextBottom}>PROGRESS</Text>
        </View>

        {/* Blueprint illustration */}
        <View style={{ width: ILLUSTRATION_W, height: ILLUSTRATION_H }}>
          <Svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${ILLUSTRATION_W} ${ILLUSTRATION_H}`}
          >
            {/* Top dimension line */}
            <Line
              x1={PHONE_X}
              y1={20}
              x2={PHONE_X + PHONE_W}
              y2={20}
              stroke={appThemes.activeColor}
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            <Line
              x1={PHONE_X}
              y1={15}
              x2={PHONE_X}
              y2={25}
              stroke={appThemes.activeColor}
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            <Line
              x1={PHONE_X + PHONE_W}
              y1={15}
              x2={PHONE_X + PHONE_W}
              y2={25}
              stroke={appThemes.activeColor}
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            <SvgText
              x={PHONE_X + PHONE_W / 2}
              y={12}
              fontSize={9}
              fontFamily="Courier"
              fill={appThemes.secondaryTextColor}
              textAnchor="middle"
            >
              375pt
            </SvgText>

            {/* Left dimension line */}
            <Line
              x1={PHONE_X - 16}
              y1={PHONE_Y}
              x2={PHONE_X - 16}
              y2={PHONE_Y + PHONE_H}
              stroke={appThemes.activeColor}
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            <Line
              x1={PHONE_X - 21}
              y1={PHONE_Y}
              x2={PHONE_X - 11}
              y2={PHONE_Y}
              stroke={appThemes.activeColor}
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            <Line
              x1={PHONE_X - 21}
              y1={PHONE_Y + PHONE_H}
              x2={PHONE_X - 11}
              y2={PHONE_Y + PHONE_H}
              stroke={appThemes.activeColor}
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            <SvgText
              x={PHONE_X - 26}
              y={PHONE_Y + PHONE_H / 2}
              fontSize={9}
              fontFamily="Courier"
              fill={appThemes.secondaryTextColor}
              textAnchor="middle"
              transform={`rotate(-90 ${PHONE_X - 26} ${PHONE_Y + PHONE_H / 2})`}
            >
              812pt
            </SvgText>

            {/* Phone outline — the "still being drawn" element */}
            <AnimatedRect
              x={PHONE_X}
              y={PHONE_Y}
              width={PHONE_W}
              height={PHONE_H}
              rx={20}
              fill={appThemes.blueBackground}
              stroke={appThemes.activeColor}
              strokeWidth={1.5}
              strokeDasharray="7,5"
              strokeDashoffset={dashOffset}
            />

            {/* Skeleton header bar */}
            <Rect
              x={PHONE_X + 14}
              y={PHONE_Y + 18}
              width={PHONE_W - 28}
              height={16}
              rx={4}
              fill="none"
              stroke={appThemes.activeColor}
              strokeOpacity={0.35}
              strokeWidth={1}
            />

            {/* Skeleton content lines (pulsing — "waiting for real content") */}
            <AnimatedG opacity={pulse}>
              <Rect
                x={PHONE_X + 14}
                y={PHONE_Y + 48}
                width={PHONE_W - 28}
                height={10}
                rx={2}
                fill={appThemes.activeColor}
                fillOpacity={0.12}
              />
              <Rect
                x={PHONE_X + 14}
                y={PHONE_Y + 64}
                width={PHONE_W - 60}
                height={10}
                rx={2}
                fill={appThemes.activeColor}
                fillOpacity={0.12}
              />
              <Rect
                x={PHONE_X + 14}
                y={PHONE_Y + 96}
                width={PHONE_W - 28}
                height={48}
                rx={6}
                fill={appThemes.activeColor}
                fillOpacity={0.08}
              />
              <Rect
                x={PHONE_X + 14}
                y={PHONE_Y + 154}
                width={PHONE_W - 28}
                height={10}
                rx={2}
                fill={appThemes.activeColor}
                fillOpacity={0.12}
              />
              <Rect
                x={PHONE_X + 14}
                y={PHONE_Y + 170}
                width={PHONE_W - 90}
                height={10}
                rx={2}
                fill={appThemes.activeColor}
                fillOpacity={0.12}
              />
            </AnimatedG>

            {/* Skeleton CTA placeholder */}
            <Rect
              x={PHONE_X + 14}
              y={PHONE_Y + PHONE_H - 40}
              width={PHONE_W - 28}
              height={26}
              rx={6}
              fill="none"
              stroke={appThemes.activeColor}
              strokeOpacity={0.35}
              strokeDasharray="4,3"
              strokeWidth={1}
            />
          </Svg>
        </View>

        {/* Copy */}
        <Text style={styles.headline}>This Feature is in Progess</Text>
        <Text style={styles.subtext}>
          Our Genius Developer{"\n"}{" "}
          <Text style={{ color: appThemes.activeColor, fontWeight: "600" }}>
            Osamudiame Enehizena
          </Text>{" "}
          {"\n"}is Still Working on This Screen
        </Text>

        {/* Progress, drawn as a dimension line */}
        {typeof progress === "number" && (
          <View style={styles.progressBlock}>
            <Text style={styles.progressLabel}>BUILD PROGRESS</Text>
            <View style={styles.progressTrack}>
              <Animated.View
                style={[styles.progressFill, { width: progressWidth }]}
              />
            </View>
            <Text style={styles.progressValue}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        )}

        {onNotifyPress && (
          <Pressable
            onPress={onNotifyPress}
            accessibilityRole="button"
            accessibilityLabel="Get notified when the app is ready"
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Get notified</Text>
          </Pressable>
        )}

        <Text style={styles.titleBlock}>
          {revision} · SCALE 1:1 · STATUS: DRAFT
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appThemes.blueBackground,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  stamp: {
    position: "absolute",
    top: 64,
    right: 28,
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 1.5,
    borderColor: appThemes.activeColor,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-10deg" }],
  },
  stampTextTop: {
    fontFamily: "Courier",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 2,
    color: appThemes.activeColor,
  },
  stampTextBottom: {
    fontFamily: "Courier",
    fontWeight: "700",
    fontSize: 10,
    letterSpacing: 1.5,
    color: appThemes.activeColor,
  },
  headline: {
    marginTop: 18,
    fontSize: appThemes.fontSize * 2,
    lineHeight: appThemes.fontSize * 2.3,
    fontWeight: "800",
    color: appThemes.primaryTextColor,
    textAlign: "center",
  },
  subtext: {
    marginTop: 10,
    fontSize: appThemes.fontSize,
    lineHeight: appThemes.fontSize * 1.4,
    color: appThemes.secondaryTextColor,
    textAlign: "center",
    maxWidth: 280,
  },
  progressBlock: {
    width: "100%",
    maxWidth: 280,
    marginTop: 26,
    alignItems: "center",
  },
  progressLabel: {
    fontFamily: "Courier",
    fontSize: appThemes.fontSize - 4,
    letterSpacing: 1.5,
    color: appThemes.secondaryTextColor,
    marginBottom: 6,
  },
  progressTrack: {
    width: "100%",
    height: 4,
    borderRadius: 2,
    backgroundColor: appThemes.mutedWhite,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: appThemes.activeColor,
    borderRadius: 2,
  },
  progressValue: {
    marginTop: 6,
    fontFamily: "Courier",
    fontSize: appThemes.fontSize - 4,
    color: appThemes.primaryTextColor,
  },
  button: {
    marginTop: 26,
    backgroundColor: appThemes.activeColor,
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 6,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: appThemes.fontSize,
    fontWeight: "600",
  },
  titleBlock: {
    position: "absolute",
    bottom: 28,
    fontFamily: "Courier",
    fontSize: appThemes.fontSize - 5,
    letterSpacing: 1,
    color: appThemes.inActiveColor,
  },
});
