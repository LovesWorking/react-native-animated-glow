jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  Reanimated.useFrameCallback = jest.fn();
  return Reanimated;
});

jest.mock('@shopify/react-native-skia', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockSkiaComponent = ({ children, ...props }) => React.createElement(View, props, children);

  return {
    Canvas: MockSkiaComponent,
    Fill: MockSkiaComponent,
    Shader: MockSkiaComponent,
    Skia: {
      RuntimeEffect: {
        Make: jest.fn(() => ({})),
      },
    },
  };
});

jest.mock('@shopify/react-native-skia/lib/module/web', () => ({
  LoadSkiaWeb: jest.fn(() => Promise.resolve()),
}));
