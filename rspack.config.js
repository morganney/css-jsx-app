import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProd = process.env.NODE_ENV === 'production'
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const sassEmbedded = await import('sass-embedded')
const sassImplementation = sassEmbedded.default ?? sassEmbedded

const createSwcTsLoader = () => ({
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
})

const createKnightedCssLoaders = (extraOptions = {}) => [
  {
    loader: '@knighted/css/loader',
    options: {
      lightningcss: { minify: true },
      ...extraOptions,
    },
  },
  createSwcTsLoader(),
]

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
    parser: {
      'css/auto': {
        namedExports: false,
      },
    },
    rules: [
      {
        oneOf: [
          {
            test: /\.css\.ts$/,
            use: createKnightedCssLoaders({
              vanilla: { transformToEsm: true },
            }),
          },
          {
            resourceQuery: /knighted-css/,
            use: createKnightedCssLoaders(),
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
        type: 'css/auto',
        use: [
          {
            loader: 'sass-loader',
            options: {
              api: 'modern-compiler',
              implementation: sassImplementation,
              sassOptions: {
                silenceDeprecations: ['import'],
              },
            },
          },
        ],
      },
    ],
  },
}
