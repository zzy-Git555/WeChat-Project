// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud-zzy-33dl5'
})

// 云函数入口函数
exports.main = async (event, context) => {
  var db=cloud.database()
  return await db.collection('like').add({
    data: {
    contents: event.contents,
    filterCourse:event.filterCourse,
    img:event.img,
    title:event.title,
    tools:event.tools
    }
 })
}