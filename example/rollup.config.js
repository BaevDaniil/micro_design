import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

const isDev = process.env.NODE_ENV === 'dev';

const commonPlugins = [
  resolve(),
  commonjs(),
  typescript(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
  }),
  postcss({
    extensions: ['.scss'],
    use: ['sass'],
  }),
  replace({
    preventAssignment: false,
    'process.env.NODE_ENV': '"development"'
  })
];

if (!isDev) {
  commonPlugins.push(terser());
}

const cjsConfig = {
  input: 'button/button.tsx',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: isDev,
    },
  ],
  external: ['react'],
  plugins: commonPlugins,
};

const esmConfig = {
  input: 'button/button.tsx',
  output: [
    {
      file: 'dist/esm/index.esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: isDev,
    },
  ],
  external: ['react'],
  plugins: commonPlugins,
};

const appConfig = {
  input: 'app/index.jsx',
  output: [
    {
      file: 'result/bundle.js',
      format: 'iife',
      exports: 'named',
      sourcemap: isDev,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      }
    },
  ],
  external: ['react', 'react-dom'],
  plugins: commonPlugins,
};

export default [cjsConfig, esmConfig, appConfig];