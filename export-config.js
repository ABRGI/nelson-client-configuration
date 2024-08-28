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
  fs.rm('clients', { recursive: true }, callback);
}
const createDir = (path, callback) => {
  if(!fs.existsSync(path)) {
    fs.mkdir(path, callback)
  } else {
    callback
  }
}
deleteOldExport(() => {
  createDir("clients", () => {
    getDirectories("src/config", (clients) => {
      clients.forEach((client) => {
        createDir(`clients/${client}`, () => {
          createDir(`clients/${client}/config`, () => {
            getFileList(`src/config/${client}`, (files) => {
              files.forEach(file => {
                if(file[0] !== ".") {
                  fs.copyFileSync(`src/config/${client}/${file}`, `clients/${client}/config/${file}`)
                } 
              });
            })
          })
          createDir(`clients/${client}/language`, () => {
            getDirectories("src/language", (langs) => {
              langs.forEach(lang => {
                if(fs.existsSync(`src/language/${lang}/${client}`)) {
                  createDir(`clients/${client}/language/${lang}`, () => {
                    fs.copyFileSync(`src/language/${lang}/general.json`, `clients/${client}/language/${lang}/general.json`);
                    getFileList(`src/language/${lang}/${client}`, (files) => {
                      files.forEach(file => {
                        if(file[0] !== ".") {
                          fs.copyFileSync(`src/language/${lang}/${client}/${file}`, `clients/${client}/language/${lang}/${file}`);
                        }
                      });
                    })
                  })
                }
              });
            })
          })
          createDir(`clients/${client}/icon`, () => {
            getDirectories("src/icon", (icons) => {
              icons.forEach(icon => {
                if(fs.existsSync(`src/icon/${icon}`)) {
                  createDir(`clients/${client}/icon/${icon}`, () => {
                    getFileList(`src/icon/${icon}`, (files) => {
                      files.forEach(file => {
                        if(file[0] !== ".") {
                          fs.copyFileSync(`src/icon/${icon}/${file}`, `clients/${client}/icon/${icon}/${file}`);
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