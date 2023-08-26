/**
 * 打开 IndexDB
 *
 * @param {string} name 仓库名称
 * @param {number} version 数据库版本
 */
function openDB (name, version) {
  return new Promise((resolve, reject) => {
    /** @type {IDBOpenDBRequest} */
    const request = window.indexedDB.open(name, version)

    request.addEventListener('success', (e) => {
      console.log('open database success: ', e)
      resolve(request.result)
    })

    request.addEventListener('error', (e) => {
      console.log('open database fail: ', e)
      reject()
    })

    request.addEventListener('upgradeneeded', (e) => {
      console.log('on upgradeneeded database: ', e)
      request.result.createObjectStore('signalChat', {
        keyPath: 'id',
        autoIncrement: true,
      }).createIndex('id', 'id', {
        unique: true,
      })
    })
  })
}

/**
 * 新增数据
 *
 * @param {IDBDatabase} db 数据库实例
 * @param {string} name 仓库名称
 * @param {object} data 数据
 */
function addData (db, name, data) {
  const request = db.transaction(name, 'readwrite').objectStore(name).add(data)

  request.addEventListener('success', (e) => {
    console.log('add data success: ', e)
  })

  request.addEventListener('error', (e) => {
    console.log('add data fail: ', e);
  })
}

/**
 * 通过主键读取数据
 *
 * @param {IDBDatabase} db 数据库实例
 * @param {string} name 仓库名称
 * @param {string} key 主键值
 */
function getDataByKey (db, name, key) {
  return new Promise((resolve, reject) => {
    const request = db.transaction(name, 'readonly').objectStore(name).get(key)

    request.addEventListener('success', (e) => {
      console.log('read data success: ', e)
      resolve(request.result)
    })

    request.addEventListener('error', (e) => {
      console.log('read data fail: ', e);
      reject()
    })
  })
}

/**
 * 通过游标读取数据
 *
 * @param {IDBDatabase} db 数据库实例
 * @param {string} name 仓库名称
 */
function getDataByCursor (db, name) {
  const request = db.transaction(name, 'readonly').objectStore(name).openCursor()

  request.addEventListener('success', (e) => {
    console.log('read data success: ', e)
    const cursor = request.result
    if (cursor) {
      console.log(cursor.value)
      cursor.continue()
    }
  })

  request.addEventListener('error', (e) => {
    console.log('read data fail: ', e)
  })
}

/**
 * 通过索引读取数据
 *
 * @param {IDBDatabase} db 数据库实例
 * @param {string} name 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */
function getDataByIndex (db, name, indexName, indexValue) {
  const request = db.transaction(name, 'readonly').objectStore(name).index(indexName).get(indexValue)

  request.addEventListener('success', (e) => {
    console.log('read data success: ', e)
    console.log(request.result)
  })

  request.addEventListener('error', (e) => {
    console.log('read data fail: ', e)
  })
}

/**
 * 通过索引和游标删除数据
 *
 * @param {IDBDatabase} db 数据库实例
 * @param {string} name 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */
function getDataByIndexAndCursor (db, name, indexName, indexValue) {
  const request = db.transaction(name, 'readonly').objectStore(name).index(indexName).openCursor(IDBKeyRange.only(indexValue))

  request.addEventListener('success', (e) => {
    console.log('read data success: ', e)
    const cursor = request.result
    if (cursor) {
      console.log(cursor.value)
      cursor.continue()
    }
  })

  request.addEventListener('error', (e) => {
    console.log('read data fail: ', e)
  })
}

/**
 * 通过索引和游标分页查询记录
 *
 * @param {IDBDatabase} db 数据库实例
 * @param {string} name 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 * @param {number} page 页码
 * @param {number} pageSize 查询条数
 */
function getDataByIndexAndCursorAsPage (db, name, indexName, indexValue, page, pageSize) {
  const request = db.transaction(name, 'readonly').objectStore(name).index(indexName).openCursor(IDBKeyRange.only(indexValue))
  let counter = 0
  let advanced = true

  request.addEventListener('success', (e) => {
    console.log('get data success: ', e)
    const cursor = request.result
    if (page > 1 && advanced) {
      advanced = false
      cursor.advance((page - 1) * pageSize)
      return
    }
    if (cursor) {
      console.log(cursor.value)
      ++counter
      if (counter < pageSize) {
        cursor.continue()
      } else {
        cursor = null
      }
    }
  })

  request.addEventListener('error', (e) => {
    console.log('get data fail: ', e)
  })
}

/**
 * 更新数据
 *
 * @param {IDBDatabase} db 数据库实例
 * @param {string} name 仓库名称
 * @param {object} data 数据
 */
function updateDB (db, name, data) {
  const request = db.transaction(name, 'readwrite').objectStore(name).put(data)

  request.addEventListener('success', (e) => {
    console.log('update data success: ', e)
  })

  request.addEventListener('error', (e) => {
    console.log('update data fail: ', e)
  })
}

/**
 * 通过主键删除数据
 *
 * @param {IDBDatabase} db 数据库实例
 * @param {string} name 仓库名称
 * @param {string} key 主键值
 */
function deleteDataByKey (db, name, id) {
  const request = db.transaction(name, 'readwrite').objectStore(name).delete(id)

  request.addEventListener('success', (e) => {
    console.log('delete data success: ', e)
  })

  request.addEventListener('error', (e) => {
    console.log('delete data fail: ', e)
  })
}

/**
 * 通过索引和游标删除数据
 *
 * @param {IDBDatabase} db 数据库实例
 * @param {string} name 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */
function deleteDataByIndexAndCursor (db, name, indexName, indexValue) {
  const request = db.transaction(name, 'readwrite').objectStore(name).index(indexName).openCursor(IDBKeyRange.only(indexValue))

  request.addEventListener('success', (e) => {
    console.log('delete data success: ', e)
    const cursor = request.result
    if (cursor) {
      const deleteRequest = cursor.delete()

      deleteRequest.addEventListener('success', (e) => {
        console.log('delete current data success: ', e)
      })

      deleteRequest.addEventListener('error', (e) => {
        console.log('delete current data fail: ', e)
      })

      cursor.continue()
    }
  })

  request.addEventListener('error', (e) => {
    console.log('delete data fail: ', e)
  })
}

/**
 * 关闭数据库
 *
 * @param {IDBDatabase} db 数据库实例
 */
function closeDB (db) {
  console.log('database has been closed')
  db.close()
}

/**
 * 删除数据库
 *
 * @param {string} name 仓库名称
 */
function deleteDB (name) {
  const request = window.indexedDB.deleteDatabase(name)

  request.addEventListener('success', (e) => {
    console.log('delete database success: ', e)
  })

  request.addEventListener('error', (e) => {
    console.log('delete database fail: ', e);
  })
}
