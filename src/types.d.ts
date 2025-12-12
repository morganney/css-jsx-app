/// <reference types="@knighted/css/loader-queries" />

declare module '*.module.css' {
  const classes: Record<string, string>
  export = classes
}
