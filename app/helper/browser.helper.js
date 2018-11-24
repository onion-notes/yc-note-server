const puppeteer = require('puppeteer')
const uuidv4 = require('uuid/v4')
const path = require('path')
const Promise = require('bluebird')

class BrowserHelper {
  constructor (baseDirPath) {
    this.baseDirPath = baseDirPath
    this.browser = null
    this.init().then()
  }
  async init () {
    this.browser = await puppeteer.launch({
      // 设置超时时间
      timeout: 15000,
      // 如果是访问https页面 此属性会忽略https错误
      ignoreHTTPSErrors: true,
      // 打开开发者工具, 当此值为true时, headless总为false
      devtools: false,
      // 关闭headless模式, 会打开浏览器
      headless: true
    })
  }
  getJPGPath () {
    const id = `${uuidv4()}-${Date.now()}`
    const name = `${id}.jpg`
    return {
      path: `${this.baseDirPath}/${name}`,
      name,
      id
    }
  }
  async getPageScreenShot (url) {
    const { path, name, id } = this.getJPGPath()
    const screensPage = await this.browser.newPage()
    await screensPage.setViewport({
      width: 1440,
      height: 900
    })
    await screensPage.goto(url)
    await Promise.delay(1000)
    await screensPage.screenshot({
      path,
      type: 'jpeg',
      clip: {
        x: 0,
        y: 0,
        width: 1440,
        height: 1440
      }
    })
    await screensPage.close()
    return {
      path,
      name,
      id
    }
  }
  async getPageContent (url) {
    const contentPage = await this.browser.newPage()
    await contentPage.setRequestInterception(true)
    contentPage.on('request', request => {
      if (request.resourceType() === 'image') {
        request.abort()
      } else {
        request.continue()
      }
    })
    await contentPage.goto(url)
    const title = await contentPage.title()
    const body = await contentPage.$('html')
    const bodyText = await contentPage.evaluate(body => body.innerText, body)
    await contentPage.close()
    return {
      url,
      title,
      bodyText: bodyText.replace(/\n/g, '')
    }
  }
  async getPageInfo (url) {
    const [image, shot] = await Promise.all([
      this.getPageScreenShot(url),
      this.getPageContent(url)
    ])
    return {
      url,
      ...image,
      ...shot
    }
  }
}

const browser = new BrowserHelper(path.join(__dirname, '../public'))

module.exports = {
  getPageInfo: browser.getPageInfo.bind(browser),
  getPageContent: browser.getPageContent.bind(browser),
  getPageScreenShot: browser.getPageScreenShot.bind(browser)
}
