import type {
  KnightedCssModuleId,
  KnightedCssSelectorFor,
} from '../types/knighted-css-registry.js'

/**
 * Casts the raw selector map from the loader into the generated literal type map.
 */
export function getStableSelectors<Module extends KnightedCssModuleId>(
  _moduleId: Module,
  selectors: unknown,
): KnightedCssSelectorFor<Module> {
  return selectors as KnightedCssSelectorFor<Module>
}
