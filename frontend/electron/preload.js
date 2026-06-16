const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  listPdfs: (folderPath) => ipcRenderer.invoke('list-pdfs', folderPath),
  readPdf: (filePath) => ipcRenderer.invoke('read-pdf', filePath)
});