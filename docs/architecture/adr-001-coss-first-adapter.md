# ADR-001: COSS-first rendering with a stable filter contract

- Status: Accepted
- Date: 2026-07-21

## Context

The filter builder must be reusable across SaaS products without importing their
business rules. Current consumers use COSS primitives implemented on Base UI.
COSS is registry-based source rather than a runtime package dependency. Radix
support is desirable later, but designing a universal primitive abstraction now
would add an unvalidated API.

## Decision

The root entry point ships the COSS/Base UI filter builder and a domain-neutral
filter contract. The `core` entry point exposes visual-independent types and
condition helpers. The repository owns only the COSS primitives required by this
view.

A future Radix implementation will use a dedicated adapter or entry point while
preserving the public data and callback contract.

## Consequences

- consumers get a complete COSS-compatible filter builder today;
- attribute catalogs, operators, authorization, and persistence stay outside;
- COSS source changes can be reviewed with this component;
- a Radix adapter is added only after real consumer requirements are known;
- visual adapters may differ internally, but cannot redefine filter semantics.
