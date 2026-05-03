import fs from 'fs';
import path from 'path';
import pkg from '../package.json';

const root = path.resolve(__dirname, '..');
const read = (relativePath: string) => fs.readFileSync(path.join(root, relativePath), 'utf8');

describe('release regression checks', () => {
  it('keeps Samsung-sensitive SkSL color math at half precision', () => {
    const source = read('src/animated-glow/UnifiedSkiaGlow.tsx');

    expect(source).toContain('uniform half4 u_backgroundColor');
    expect(source).toContain('uniform half4 u_colors_0[8]');
    expect(source).toContain('half4 main(vec2 fragCoord)');
    expect(source).toContain('Half-precision color typing is load-bearing');
    expect(source).not.toMatch(/uniform vec4 u_colors_/);
    expect(source).not.toContain('vec4 main(vec2 fragCoord)');
  });

  it('keeps native rendering on a direct UnifiedSkiaGlow import to avoid Android dev OOMs', () => {
    const source = read('src/animated-glow/SkiaRoot.tsx');

    expect(source).toContain("import { UnifiedSkiaGlow } from './UnifiedSkiaGlow'");
    expect(source).toContain('<UnifiedSkiaGlow');
    expect(source).not.toContain('LazyUnifiedSkiaGlow');
  });

  it('keeps web loading out of WithSkiaWeb to avoid the Metro _ref closure regression', () => {
    const source = read('src/animated-glow/SkiaRoot.web.tsx');

    expect(source).toContain('LoadSkiaWeb');
    expect(source).toContain('React.lazy');
    expect(source).not.toContain('WithSkiaWeb');
    expect(source).not.toContain('MemoizedSkiaContent');
  });

  it('exposes Metro-friendly package export conditions', () => {
    expect(pkg.exports['.']).toMatchObject({
      'react-native': './src/index.ts',
      default: './lib/module/index.js',
    });

    expect(pkg.exports['./presets']).toMatchObject({
      'react-native': './src/glow-presets.ts',
      default: './lib/module/glow-presets.js',
    });
  });
});
