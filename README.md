# Filter Builder

A domain-neutral, accessible filter builder for React applications built with
[COSS](https://github.com/cosscom/coss), Base UI, and Tailwind CSS.

The package provides the interaction and presentation layer for filtering SaaS
list, table, and board views. Your application remains responsible for the
attribute catalog, operators, option sources, permissions, remote state,
querying, and persistence.

## Highlights

- generic typed attributes with consumer-defined operators and options
- controlled value contract with an internal draft while the popover is open
- cascading resets: changing an attribute drops incompatible operators/values
- apply gate that stays disabled until every condition is complete
- clear action that resets back to a single empty condition
- accessible popover, form, and grouped selects on Base UI
- responsive condition rows for desktop and mobile
- COSS visual primitives implemented on Base UI

## Requirements

- React 19
- Base UI 1.x
- Tailwind CSS 4

The package is COSS-first. COSS is distributed as source through its component
registry, so this repository owns the small set of COSS primitives required by
the view. A future Radix implementation will be a separate adapter and will not
change the domain-neutral contract.

## Installation

Until the first registry release, install directly from GitHub:

```bash
bun add github:gblsmlo/filter-builder
```

The consumer must already provide the peer dependencies:

```bash
bun add react react-dom @base-ui/react tailwindcss
```

Tailwind must scan the installed package, and your theme must expose the
standard COSS semantic tokens (`--color-secondary`, `--color-popover`,
`--color-muted-foreground`, `--color-border`, `--color-input`, `--color-ring`,
`--radius`, `--radius-control`, and related pairs):

```css
@import "tailwindcss";
@source "../node_modules/@gblsmlo/filter-builder/dist";
```

## Quick start

```tsx
import {
  FilterBuilder,
  type FilterBuilderAttribute,
  type FilterCondition,
} from "@gblsmlo/filter-builder";
import { useState } from "react";

const attributes: FilterBuilderAttribute[] = [
  {
    id: "status",
    label: "Status",
    valueType: "select",
    operators: [
      { label: "is", value: "is" },
      { label: "is not", value: "is-not" },
    ],
    options: [
      { label: "In progress", value: "in-progress" },
      { label: "Done", value: "done" },
    ],
  },
];

export function ListFilters() {
  const [conditions, setConditions] = useState<FilterCondition[]>([]);

  return (
    <FilterBuilder
      attributes={attributes}
      onValueChange={setConditions}
      value={conditions}
    />
  );
}
```

`onValueChange` receives the complete condition set only when the user applies
the filter, or an empty array when they clear it. The component is fully
controlled: pass the applied `value` back in and it rebuilds its draft on open.

Use `@gblsmlo/filter-builder/core` when a non-visual layer only needs the public
types and condition helpers (`isCompleteFilterCondition`,
`createFilterConditionDraft`).

## API

### `FilterBuilder`

| Prop | Type | Description |
| --- | --- | --- |
| `attributes` | `readonly FilterBuilderAttribute[]` | Attribute catalog with per-attribute operators and options |
| `value` | `readonly FilterCondition[]` | Applied conditions owned by the consumer |
| `onValueChange` | `(conditions: FilterCondition[]) => void` | Called on apply (complete set) or clear (empty) |
| `triggerLabel` | `string` | Optional trigger button label (defaults to `Filtrar`) |

### Types

```ts
interface FilterBuilderOption {
  label: string;
  value: string;
}

interface FilterBuilderAttribute {
  id: string;
  label: string;
  operators: readonly FilterBuilderOption[];
  options: readonly FilterBuilderOption[];
  valueType: "select";
}

interface FilterCondition {
  attributeId: string;
  operator: string;
  value: string;
}
```

## Ownership boundary

| Package owns | Consumer owns |
| --- | --- |
| popover, form, and grouped condition layout | attribute catalog, operators, and options |
| draft editing, cascading resets, and apply gating | meaning of each attribute and operator |
| accessible controls and responsive rows | query construction and server filtering |
| controlled apply/clear callback | persisting, sharing, and restoring filters |

The package intentionally supports `select` value conditions joined by an
implicit `AND`. Additional value types and boolean grouping remain
consumer/server-owned until a durable contract is defined.

## Development

Use Bun `1.3.14` and Node `24.18.0`.

```bash
bun install
bun run storybook
bun run lint:ci
bun run typecheck
bun test
bun run build
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow and
[ADR-001](docs/architecture/adr-001-coss-first-adapter.md) for the adapter
decision.

## License

[MIT](LICENSE) © Gabriel Melo.
