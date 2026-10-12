# Contributing

Thanks for your interest in **ai-chat-toolkit**.

## Development

From the repository root:

```bash
pnpm install
pnpm build
```

Package source lives under `packages/widget` and `packages/server`. Examples under `examples/` install published npm packages and run standalone.

## Opening a PR

1. Create a feature branch from `main`.
2. Make your changes and push the branch.
3. Open a pull request against `main`.
4. Ensure the **build** CI check passes.
5. Wait for **maintainer approval** — all changes require review from a code owner.

Direct pushes to `main` should be disabled via branch protection.

## Release

Packages are released manually through GitHub Actions:

- **Release ai-chat-toolkit-widget**
- **Release ai-chat-toolkit-server**
- **Release ai-chat-toolkit-rag**

Choose **`current`** to publish the version already in `package.json`. Use **patch** / **minor** / **major** to bump before publish (e.g. `1.0.1` patch, `1.1.0` minor, `2.0.0` major after the **1.0.0** stable line).

Update the package `CHANGELOG.md` when releasing, and add a summary entry to the root [CHANGELOG](./CHANGELOG.md).

See the root [README](./README.md#publishing) for workflow details.
