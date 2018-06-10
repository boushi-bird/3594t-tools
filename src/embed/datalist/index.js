import { CrossStorageClient } from 'cross-storage'
import { hubPageUrl } from '../../defines'

const run = async () => {
  if (!global.base_data) {
    global.alert(`[三国志大戦 ブックマークレット]
データを読み込み中またはデータリストのページではありません。`)
    return
  }
  const baseData = JSON.stringify(global.base_data)
  const clinet = new CrossStorageClient(hubPageUrl)
  await clinet.onConnect()
  await clinet.set('3594t.baseData', baseData)
  const download = global.confirm(`[三国志大戦 ブックマークレット]
データの保存が完了しました。更にダウンロードもしますか？
`)
  if (download) {
    const blob = new Blob([baseData], { 'type': 'text/plain' })
    const link = document.createElement('a')
    link.setAttribute('download', 'base.json')
    link.setAttribute('href', window.URL.createObjectURL(blob))
    link.click()
  }
}

const isPage = (location) => {
  return /^\/?datalist\/?$/.test(location.pathname)
}

export default { isPage, run }
