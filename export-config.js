import fs from 'fs'

const getDirectories = (source, callback) => {
  fs.readdir(source, { withFileTypes: true }, (err, files) => {
    if (err) {
      callback(err)
    } else {
      callback(
        files
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
      )
    }
  })
}
const getFileList = (source, callback) => {
  fs.readdir(source, { withFileTypes: true }, (err, files) => {
    if (err) {
      callback(err)
    } else {
      callback(
        files
          .filter(dirent => !dirent.isDirectory())
          .map(dirent => dirent.name)
      )
    }
  })
}
const deleteOldExport = (callback) => {
  fs.rm('serve/clients', { recursive: true }, callback);
}
const createDir = (path, callback) => {
  if(!fs.existsSync(path)) {
    fs.mkdir(path, callback)
  } else {
    callback
  }
}
deleteOldExport(() => {
  createDir("serve/clients", () => {
    getDirectories("src/config", (clients) => {
      clients.forEach((client) => {
        createDir(`serve/clients/${client}`, () => {
          createDir(`serve/clients/${client}/config`, () => {
            getFileList(`src/config/${client}`, (files) => {
              files.forEach(file => {
                if(file[0] !== ".") {
                  fs.copyFileSync(`src/config/${client}/${file}`, `serve/clients/${client}/config/${file}`)
                } 
              });
            })
          })
          createDir(`serve/clients/${client}/language`, () => {
            getDirectories("src/language", (langs) => {
              langs.forEach(lang => {
                if(fs.existsSync(`src/language/${lang}/${client}`)) {
                  createDir(`serve/clients/${client}/language/${lang}`, () => {
                    fs.copyFileSync(`src/language/${lang}/general.json`, `serve/clients/${client}/language/${lang}/general.json`);
                    getFileList(`src/language/${lang}/${client}`, (files) => {
                      files.forEach(file => {
                        if(file[0] !== ".") {
                          fs.copyFileSync(`src/language/${lang}/${client}/${file}`, `serve/clients/${client}/language/${lang}/${file}`);
                        }
                      });
                    })
                  })
                }
              });
            })
          })
          
        })
      })
    })
  })
})