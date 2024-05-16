import { swcDefaultsFactory } from '@nestjs/cli/lib/compiler/defaults/swc-defaults';

export const module = {
  rules: [
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'swc-loader',
        options: swcDefaultsFactory().swcOptions,
      },
    },
  ],
};
