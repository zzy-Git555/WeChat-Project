// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud-zzy-33dl5'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()

  return await db.collection("otherContent")

    .get()
}