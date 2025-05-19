const path = require('path');
const fs = require('fs');

const files = (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'uploads', filename);

  // Cek apakah file ada
  fs.access(filepath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Kirim file sebagai respons (bisa juga pakai res.download atau res.sendFile)
    res.sendFile(filepath);
  });
}

module.exports = { files };