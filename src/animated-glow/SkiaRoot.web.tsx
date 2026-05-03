import React, { FC, Suspense } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
const skiaPackageJson = require('@shopify/react-native-skia/package.json');
const canvasKitVersion = skiaPackageJson.dependencies['canvaskit-wasm'];

import type { Layout, GlowConfig } from './types';
import type { UnifiedSkiaGlowProps } from './UnifiedSkiaGlow';

interface SkiaRootProps {
    layout: Layout;
    skiaOpacity: SharedValue<number>;
    animationProgress: SharedValue<number>;
    fromConfigSV: SharedValue<GlowConfig>;
    toConfigSV: SharedValue<GlowConfig>;
}

const skiaWebOptions = {
    locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${canvasKitVersion}/bin/full/${file}`,
};

const WebUnifiedSkiaGlow = React.lazy<FC<UnifiedSkiaGlowProps>>(async () => {
    await LoadSkiaWeb(skiaWebOptions);
    const module = await import('./UnifiedSkiaGlow');
    return { default: module.UnifiedSkiaGlow };
});

export const SkiaRoot: FC<SkiaRootProps> = (props) => {
    return (
        <Suspense fallback={null}>
            <WebUnifiedSkiaGlow
                layout={props.layout}
                masterOpacity={props.skiaOpacity}
                progress={props.animationProgress}
                fromConfig={props.fromConfigSV}
                toConfig={props.toConfigSV}
            />
        </Suspense>
    );
};
