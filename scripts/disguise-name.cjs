// ────────────────────────────────────────────────────────────────────────────
// Single source of truth for the on-disk app identity name, PER PLATFORM.
//
// This is the name the bundle / main executable / helper bundles+executables
// (macOS) and the exe + PE version resource + install dir (Windows) present to
// the OS. It is what Activity Monitor, `proc_pidpath()`, and Task Manager show.
//
// Per-platform disguise remains configurable here. For macOS we currently use
// "Activity Monitor" so the bundle/executable/helper names align with that
// system utility identity in Activity Monitor.
//
// HOW THIS IS APPLIED:
//   - scripts/package-app.js sets package.json "build" → "productName" to the
//     value for the target platform before running electron-builder (and restores
//     it afterwards).
//     productName drives the bundle/exe/helpers (macOS) and the exe name + PE
//     version resource + install dir (Windows) consistently.
//   - scripts/ad-hoc-sign.js reads `.darwin` to re-assert the helper plist names.
//   - electron/utils/migrateUserData.ts handles profile-folder migrations from
//     older disguise identities.
//
// NOTE: the bundle id (package.json build.appId, "com.apple.corespeechd") is
// deliberately retained for compatibility with existing installs and updates.
//
// KEEP IN SYNC (static JSON that cannot require this file):
//   - package.json  →  "build" → "productName" (committed value; release-macos.yml
//     invokes electron-builder directly, so the committed value IS the release
//     identity) and "build" → "win" → "executableName".
//   - package.json  →  "build" → "mac" → "extendInfo": CFBundleDisplayName =
//     "Activity Monitor" and the NS*UsageDescription strings.
// ────────────────────────────────────────────────────────────────────────────
module.exports = {
  darwin: 'Activity Monitor',
  win32: 'Natively',
};
