export const APP_URL = "https://app.furrow.cam";
// Opens a new project straight in the workspace, without an account (furrow-cam PRD-0008 G11).
export const NEW_PROJECT_URL = `${APP_URL}/new`;
export const PRIVACY_URL = `${APP_URL}/privacy`;
export const REPO_URL = "https://github.com/federicovezzoli/furrow-cam";
export const ISSUES_URL = `${REPO_URL}/issues`;
export const RELEASES_URL = `${REPO_URL}/releases`;
export const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;
// Setting up Claude, VS Code or another MCP client to work on .furrow projects.
export const MCP_GUIDE_URL = `${REPO_URL}/blob/main/apps/mcp/README.md`;
export const AUTHOR_URL = "https://federicovezzoli.com";
// The releases list filtered to the desktop app: `releases/latest` points at whichever
// package was released last, usually @furrow/web.
export const DESKTOP_RELEASES_URL = `${RELEASES_URL}?q=%40furrow%2Fdesktop&expanded=true`;

// Stable per-platform links (federicovezzoli/furrow-cam#201): each one redirects to the newest
// installer for that system and counts the download, so a new release needs no change here.
const DESKTOP_DOWNLOAD_URL = "https://download.furrow.cam";

export const DESKTOP_DOWNLOADS = {
  macArm64: `${DESKTOP_DOWNLOAD_URL}/mac-arm64`,
  macX64: `${DESKTOP_DOWNLOAD_URL}/mac-x64`,
  winX64: `${DESKTOP_DOWNLOAD_URL}/win`,
  linuxAppImage: `${DESKTOP_DOWNLOAD_URL}/linux-appimage`,
  linuxDeb: `${DESKTOP_DOWNLOAD_URL}/linux-deb`,
  linuxPacman: `${DESKTOP_DOWNLOAD_URL}/linux-pacman`,
};
