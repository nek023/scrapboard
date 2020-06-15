const menuItemAttrs = {
  copyLink: {
    options: {
      label: 'Copy link',
    },
    text: 'Copy link',
  },
  copyReadableLink: {
    options: {
      label: 'Copy readable link',
    },
    text: 'Copy readable link',
  },
  hideDots: {
    options: {
      type: 'checkbox',
      label: 'Show dots',
      checked: true,
    },
    text: 'Hide dots',
  },
  showDots: {
    options: {
      type: 'checkbox',
      label: 'Show dots',
      checked: false,
    },
    text: 'Show dots',
  },
  deletePage: {
    options: {
      label: 'Delete this page',
    },
    text: ' Delete this page',
  },
} as const

type MenuItemId = keyof typeof menuItemAttrs

const clickPageMenuItemScript = (text: string) => `
(() => {
  const items = Array.from(document.querySelectorAll('.page-menu a'));
  const item = items.find((item) => item.text === '${text}');
  if (item) item.click();
})();
`

export const makeBuildMenuItem = (webView: Electron.WebviewTag) => (
  id: MenuItemId,
  callback?: () => void
): Electron.MenuItemConstructorOptions => {
  const attrs = menuItemAttrs[id]
  return {
    id,
    click: () => webView.executeJavaScript(clickPageMenuItemScript(attrs.text)).then(callback),
    ...attrs.options,
  }
}
