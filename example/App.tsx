import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AnimatedGlow, { glowPresets, type GlowEvent, type PresetConfig } from 'react-native-animated-glow';

const cometPreset: PresetConfig = {
  metadata: {
    name: 'Comet Layer',
    textColor: '#FFFFFF',
    category: 'QA',
    tags: ['test'],
  },
  states: [
    {
      name: 'default',
      preset: {
        cornerRadius: 22,
        outlineWidth: 3,
        borderColor: ['#38f7d4', '#f8e14b', '#ff5b9f', '#6f7bff'],
        backgroundColor: '#101318',
        animationSpeed: 1.5,
        glowLayers: [
          {
            glowPlacement: 'behind',
            colors: ['#38f7d4', '#f8e14b', '#ff5b9f', '#6f7bff'],
            glowSize: [4, 28, 28, 4],
            opacity: 0.38,
            speedMultiplier: 1.1,
            coverage: 0.55,
          },
          {
            glowPlacement: 'over',
            colors: ['#ffffff', '#38f7d4'],
            glowSize: 5,
            opacity: 0.35,
            speedMultiplier: 2.2,
            coverage: 0.2,
            relativeOffset: 0.22,
          },
        ],
      },
    },
    {
      name: 'hover',
      transition: 250,
      preset: {
        animationSpeed: 2.1,
        glowLayers: [{ glowSize: [6, 34, 34, 6], opacity: 0.48 }, { opacity: 0.5 }],
      },
    },
    {
      name: 'press',
      transition: 120,
      preset: {
        animationSpeed: 3.2,
        glowLayers: [{ glowSize: [8, 40, 40, 8], opacity: 0.6 }, { opacity: 0.7 }],
      },
    },
  ],
};

function GlowButton({
  title,
  subtitle,
  preset,
  wrapperStyle,
}: {
  title: string;
  subtitle: string;
  preset: PresetConfig;
  wrapperStyle?: object;
}) {
  const [activeState, setActiveState] = useState<GlowEvent>('default');
  const isHovered = useRef(false);

  return (
    <AnimatedGlow preset={preset} activeState={activeState} wrapperStyle={wrapperStyle} style={styles.glowShell}>
      <Pressable
        style={styles.glowButton}
        onPressIn={() => setActiveState('press')}
        onPressOut={() => setActiveState(isHovered.current ? 'hover' : 'default')}
        onHoverIn={() => {
          isHovered.current = true;
          setActiveState((state) => (state === 'press' ? state : 'hover'));
        }}
        onHoverOut={() => {
          isHovered.current = false;
          setActiveState((state) => (state === 'press' ? state : 'default'));
        }}
      >
        <Text style={styles.buttonTitle}>{title}</Text>
        <Text style={styles.buttonSubtitle}>{subtitle}</Text>
      </Pressable>
    </AnimatedGlow>
  );
}

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{Platform.OS.toUpperCase()} PACKAGE QA</Text>
        <Text style={styles.title}>react-native-animated-glow v3.1.0</Text>
        <Text style={styles.subtitle}>
          Tap, press, and hover the cards. The glow should animate smoothly without blank canvases, crashes, or web runtime errors.
        </Text>
      </View>

      <View style={styles.grid}>
        <GlowButton
          title="Rainbow Preset"
          subtitle="Animated border plus three behind layers"
          preset={glowPresets.defaultRainbow}
        />
        <GlowButton
          title="Ocean Sunset"
          subtitle="Two glow layers and state transitions"
          preset={glowPresets.oceanSunset}
        />
        <GlowButton
          title="Comet Trail"
          subtitle="Variable glowSize and over placement"
          preset={cometPreset}
        />
        <GlowButton
          title="Wrapper Style"
          subtitle="Uses wrapperStyle={ flex: 1 }"
          preset={glowPresets.defaultRainbow}
          wrapperStyle={styles.flexWrapper}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#08090d',
    paddingHorizontal: 24,
    paddingVertical: 52,
    gap: 32,
  },
  header: {
    gap: 10,
    maxWidth: 760,
    alignSelf: 'center',
    width: '100%',
  },
  eyebrow: {
    color: '#8ee6d1',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    letterSpacing: 0,
  },
  subtitle: {
    color: '#b7bdc9',
    fontSize: 16,
    lineHeight: 23,
  },
  grid: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    gap: 28,
    paddingVertical: 22,
  },
  glowShell: {
    minHeight: 124,
  },
  glowButton: {
    minHeight: 124,
    paddingHorizontal: 24,
    paddingVertical: 22,
    justifyContent: 'center',
    gap: 8,
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    letterSpacing: 0,
  },
  buttonSubtitle: {
    color: '#d6d9e0',
    fontSize: 15,
    lineHeight: 21,
  },
  flexWrapper: {
    flex: 1,
  },
});
