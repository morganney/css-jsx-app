import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { rspack } from '@rspack/core'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const sassImplementation = await import('sass-embedded')

const createSwcTsLoader = () => ({
  loader: 'builtin:swc-loader',
  options: {
    jsc: {
      target: 'es2022',
      parser: {
        syntax: 'typescript',
        tsx: true,
        decorators: true,
      },
    },
  },
})

const createKnightedCssLoaders = (extraOptions = {}) => [
  {
    loader: '@knighted/css/loader',
    options: {
      autoStable: true,
      ...extraOptions,
    },
  },
  createSwcTsLoader(),
]

const cssModuleOptions = {
  namedExport: true,
  exportLocalsConvention: 'as-is',
  localIdentName: '[local]-[hash:base64:6]',
}

const createCssExtractLoader = () => rspack.CssExtractRspackPlugin.loader

const createCssModuleStringLoader = () => ({
  loader: 'css-loader',
  options: {
    exportType: 'string',
    modules: cssModuleOptions,
  },
})

const createCssModuleExtractLoader = () => ({
  loader: 'css-loader',
  options: {
    modules: cssModuleOptions,
  },
})

const createCssLoader = () => ({
  loader: 'css-loader',
})

const createSassLoader = () => ({
  loader: 'sass-loader',
  options: {
    api: 'modern-compiler',
    implementation: sassImplementation,
  },
})

const createLessLoader = () => 'less-loader'

const createSwcReactLoader = isProd => ({
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
})

const createModuleCssRule = () => ({
  test: /\.module\.css$/,
  oneOf: [
    {
      resourceQuery: /knighted-css/,
      type: 'javascript/auto',
      use: [{ loader: '@knighted/css/loader-bridge' }, createCssModuleStringLoader()],
    },
    {
      type: 'javascript/auto',
      use: [createCssExtractLoader(), createCssModuleExtractLoader()],
    },
  ],
})

const createModuleSassRule = () => ({
  test: /\.module\.scss$/,
  oneOf: [
    {
      resourceQuery: /knighted-css/,
      type: 'javascript/auto',
      use: [
        { loader: '@knighted/css/loader-bridge' },
        createCssModuleStringLoader(),
        createSassLoader(),
      ],
    },
    {
      type: 'javascript/auto',
      use: [createCssExtractLoader(), createCssModuleExtractLoader(), createSassLoader()],
    },
  ],
})

const createGlobalCssRule = () => ({
  test: /\.css$/,
  exclude: /\.module\.css$/,
  type: 'javascript/auto',
  use: [createCssExtractLoader(), createCssLoader()],
})

const createGlobalSassRule = () => ({
  test: /\.sass$/,
  exclude: /\.module\.scss$/,
  type: 'javascript/auto',
  use: [createCssExtractLoader(), createCssLoader(), createSassLoader()],
})

const createGlobalLessRule = () => ({
  test: /\.less$/,
  exclude: /\.module\.less$/,
  type: 'javascript/auto',
  use: [createCssExtractLoader(), createCssLoader(), createLessLoader()],
})

const createCombinedJsRule = isProd => ({
  test: /\.[jt]sx?$/,
  resourceQuery: /knighted-css&combined/,
  use: [
    { loader: '@knighted/css/loader-bridge' },
    createSwcReactLoader(isProd),
    {
      loader: '@knighted/jsx/loader',
      options: {
        tags: ['reactJsx'],
        mode: 'react',
      },
    },
  ],
})

const createTsxRule = isProd => ({
  test: /\.tsx?$/,
  exclude: [/node_modules/, /\.css\.ts$/],
  use: [
    createSwcReactLoader(isProd),
    {
      loader: '@knighted/jsx/loader',
      options: {
        tags: ['reactJsx'],
        mode: 'react',
      },
    },
  ],
})

const createPlugins = cssFilename => [
  new rspack.ProvidePlugin({
    React: ['react'],
  }),
  new rspack.CssExtractRspackPlugin({
    filename: cssFilename,
  }),
]

const createCommonRules = isProd => [
  createModuleCssRule(),
  createModuleSassRule(),
  createGlobalCssRule(),
  {
    oneOf: [
      {
        test: /\.css\.ts$/,
        use: createKnightedCssLoaders({
          vanilla: { transformToEsm: true },
        }),
      },
      createCombinedJsRule(isProd),
      {
        test: /\.[jt]sx?$/,
        resourceQuery: /knighted-css/,
        use: createKnightedCssLoaders(),
      },
    ],
  },
  createTsxRule(isProd),
  createGlobalSassRule(),
  createGlobalLessRule(),
]

const createBridgeRules = isProd => [
  createModuleCssRule(),
  createCombinedJsRule(isProd),
  createTsxRule(isProd),
]

export default (_, argv = {}) => {
  const isProd = (argv.mode ?? 'production') === 'production'
  const baseConfig = {
    mode: argv.mode ?? 'production',
    context: __dirname,
    devtool: isProd ? 'source-map' : 'eval-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      extensionAlias: {
        '.js': ['.js', '.ts', '.tsx'],
      },
      alias: {
        sass: 'sass-embedded',
      },
    },
    experiments: {
      css: false,
    },
  }

  const appConfig = {
    ...baseConfig,
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      cssFilename: 'bundle.css',
      clean: true,
      publicPath: isGithubPages ? '/css-jsx-app/' : 'auto',
      library: {
        type: 'umd',
        name: 'CssJsxApp',
      },
    },
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
    plugins: createPlugins('bundle.css'),
    module: {
      generator: {
        'css/auto': {
          localIdentName: '[local]-[hash:base64:6]',
        },
        'css/module': {
          localIdentName: '[local]-[hash:base64:6]',
        },
      },
      parser: {
        'css/auto': {
          namedExports: false,
        },
        'css/module': {
          namedExports: true,
        },
      },
      rules: [...createCommonRules(isProd)],
    },
  }

  const bridgeConfig = {
    ...baseConfig,
    entry: './src/shared_bridge_entry.tsx',
    output: {
      path: path.resolve(__dirname, 'dist/bridge'),
      filename: 'bridge.js',
      cssFilename: 'bridge.css',
      clean: true,
      publicPath: isGithubPages ? '/css-jsx-app/bridge/' : 'auto',
    },
    plugins: createPlugins('bridge.css'),
    module: {
      rules: createBridgeRules(isProd),
    },
  }

  return [appConfig, bridgeConfig]
}
