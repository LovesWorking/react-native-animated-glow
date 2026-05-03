import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import AnimatedGlow from '../src/AnimatedGlow';

describe('AnimatedGlow', () => {
  it('renders children without requiring the Skia renderer', () => {
    const { getByText } = render(
      <AnimatedGlow>
        <Text>Glow child</Text>
      </AnimatedGlow>
    );

    expect(getByText('Glow child')).toBeTruthy();
  });

  it('applies wrapperStyle to the inner content wrapper', () => {
    const { getByText, UNSAFE_getAllByType } = render(
      <AnimatedGlow wrapperStyle={{ flex: 1 }}>
        <Text>Styled child</Text>
      </AnimatedGlow>
    );

    expect(getByText('Styled child')).toBeTruthy();
    expect(
      UNSAFE_getAllByType(View).some((view) => StyleSheet.flatten(view.props.style)?.flex === 1)
    ).toBe(true);
  });

  it('keeps legacy non-Skia border styles on the wrapper', () => {
    const { UNSAFE_getAllByType } = render(
      <AnimatedGlow outlineWidth={3} borderColor="#ff00ff" cornerRadius={12}>
        <Text>Border child</Text>
      </AnimatedGlow>
    );

    expect(
      UNSAFE_getAllByType(View).some((view) => {
        const style = StyleSheet.flatten(view.props.style);
        return style?.borderWidth === 3 && style.borderColor === '#ff00ff' && style.borderRadius === 12;
      })
    ).toBe(true);
  });

  it('can mount a Skia-backed preset after layout without throwing', () => {
    const { getByText, UNSAFE_getAllByType } = render(
      <AnimatedGlow
        style={{ width: 120, height: 48 }}
        preset={{
          states: [
            {
              name: 'default',
              preset: {
                glowLayers: [{ colors: ['#00ffff'], glowSize: 16, opacity: 0.5 }],
              },
            },
          ],
        }}
      >
        <Text>Skia child</Text>
      </AnimatedGlow>
    );

    fireEvent(UNSAFE_getAllByType(View)[0], 'layout', {
      nativeEvent: { layout: { width: 120, height: 48 } },
    });

    expect(getByText('Skia child')).toBeTruthy();
  });
});
