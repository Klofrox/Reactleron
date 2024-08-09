const { app, BrowserWindow } = require('electron');
const express = require('express');
const escpos = require('escpos');
escpos.Network = require('escpos-network');
const cors = require('cors');
const appPos = express();
const port = 5000;
const path = require('path');

appPos.use(express.json());
appPos.use(cors());
const printerIp = '192.168.1.117';

appPos.post('/print-receipt', (req, res) => {
    const formData = req.body;
    const options = { encoding: 'CP860' }; // Türkçe karakterler için CP860 kodlaması
    const device = new escpos.Network(printerIp);
    const printer = new escpos.Printer(device, options);

    if (!formData) {
        return res.status(400).json({ error: 'No order details received' });
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('tr-TR');
    const dateString = now.toLocaleDateString('tr-TR');

    device.open(() => {
        printer
            .align('CT')
            .style('B')
            .size(1, 1)
            .text('PARK 326')
            .size(1, 1)
            .text('HATAY DONER')
            .text('100.YIL')
            .newLine()
            .text('PAKET SATIŞ')
            .newLine()
            .align('LT')
            .size(0, 0) // Adres kısmında daha küçük font boyutu
            .text(`TARIH: ${dateString}`)
            .text(`SAAT: ${timeString}`) 
            .text(`MUSTERI: ${formData.customerName}`)
            .text(`TELEFON: ${formData.phone}`)
            .newLine()
            .text('------------------------') // Üst çizgi
            .text(` ${formData.address} `) // Adresi kutunun içinde
            .text('------------------------') // Alt çizgi
            .newLine()
            .text('SIPARIS DETAYLARI:')
            .newLine()
            .text(`Ürün: ${formData.selectedOrder.name}`)
            .text(`Fiyat: ${formData.selectedOrder.price}`)
            .newLine()
            .cut()
            .close();

        res.status(200).json({ message: 'Receipt printed successfully' });
    });
});

function createWindow () {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false
      },
      autoHideMenuBar: true, // Menü çubuğunu gizler
    });
  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
    setTimeout(() => {
      createWindow();
    }, 8000); // 10 saniye bekleme süresi (10,000 milisaniye)
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
  
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

appPos.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
