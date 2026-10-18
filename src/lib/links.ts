export const APP_URL = "https://app.furrow.cam";
export const SIGN_UP_URL = `${APP_URL}/sign-up`;
export const PRIVACY_URL = `${APP_URL}/privacy`;
export const REPO_URL = "https://github.com/federicovezzoli/furrow-cam";
export const ISSUES_URL = `${REPO_URL}/issues`;
export const RELEASES_URL = `${REPO_URL}/releases`;
export const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;
export const AUTHOR_URL = "https://federicovezzoli.com";
// The releases list filtered to the desktop app: `releases/latest` points at whichever
// package was released last, usually @furrow/web.
export const DESKTOP_RELEASES_URL = `${RELEASES_URL}?q=%40furrow%2Fdesktop&expanded=true`;

// Bump with every @furrow/desktop release, until stable per-platform links exist
// (federicovezzoli/furrow-cam#201).
export const DESKTOP_VERSION = "0.2.1";

const desktopDownloadUrl = (suffix: string) =>
  `${RELEASES_URL}/download/${encodeURIComponent(`@furrow/desktop@${DESKTOP_VERSION}`)}/furrow-cam-${DESKTOP_VERSION}-${suffix}`;

export const DESKTOP_DOWNLOADS = {
  macArm64: desktopDownloadUrl("mac-arm64.dmg"),
  macX64: desktopDownloadUrl("mac-x64.dmg"),
  winX64: desktopDownloadUrl("win-x64.exe"),
  linuxAppImage: desktopDownloadUrl("linux-x86_64.AppImage"),
  linuxDeb: desktopDownloadUrl("linux-amd64.deb"),
};
