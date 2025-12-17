import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProd = process.env.NODE_ENV === 'production'
const isGithubPages = process.env.GITHUB_PAGES === 'true'

export default {
  mode: isProd ? 'production' : 'development',
  context: __dirname,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: isGithubPages ? '/css-jsx-app/' : 'auto',
    library: {
      type: 'umd',
      name: 'CssJsxApp',
    },
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    port: 4173,
    host: '0.0.0.0',
    hot: true,
    open: true,
    allowedHosts: 'all',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts', '.tsx'],
    },
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.css\.ts$/,
        use: [
          {
            loader: '@knighted/css/loader',
            options: {
              lightningcss: { minify: true },
              vanilla: { transformToEsm: true },
            },
          },
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                target: 'es2022',
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.[jt]sx?$/,
        resourceQuery: /knighted-css/,
        exclude: /\.css\.ts$/,
        use: [
          {
            loader: '@knighted/css/loader',
            options: {
              lightningcss: { minify: true },
            },
          },
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                target: 'es2022',
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /\.css\.ts$/],
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                target: 'es2022',
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  decorators: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: !isProd,
                    useBuiltIns: true,
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        type: 'asset/source',
      },
    ],
  },
}
