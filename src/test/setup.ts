// El subpath /vitest registra los matchers de jest-dom en el expect de Vitest
// y ademas extiende sus tipos, para que `tsc --noEmit` reconozca
// aserciones como toBeInTheDocument o toHaveValue.
import "@testing-library/jest-dom/vitest";
