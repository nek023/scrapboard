export const scrapboxUrl = 'https://scrapbox.io'

// アプリ内でセッションを共有するためのパーティション名
// 頭にpersist:をつけるとアプリ内で永続化される
export const sessionPartition = 'persist:scrapboard'

// アプリ内のWebViewで使うUserAgent
// ElectronのUserAgentではGoogleアカウントでログインできなくなるので、Chromeに偽装する
export const userAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36'
