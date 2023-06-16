const db = require('../models');

const Biodata = db.biodata;
const Op = db.Sequelize.Op;

// create Book method
exports.create = (req, res) => {
  // Validate reques

  if (!req.body.nama) {
    res.status(400).send({
      message: 'Content tidak ada',
    });
    return;
  }

  // create biodata
  const biodata = {
    nama: req.body.nama,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
  };

  //   create biodata send to databse
  Biodata.create(biodata)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error tidak dapat menemukan data',
      });
    });
};

// Get all biodata dari database
exports.findAll = (req, res) => {
  Biodata.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Gagal mengambil semua data',
      });
    });
};

// Get biodata by id
exports.findOne = (req, res) => {
  Biodata.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Gagal menemukan data!',
      });
    });
};

// Delete biodata dengan id
exports.delete = (req, res) => {
  Biodata.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(
      res.send({
        message: `Success delete biodat with id = ${req.params.id}!`,
      })
    )
    .catch((err) => {
      res.status(500).send({
        message: `Failed delete biodata with id = ${req.params.id}`,
      });
    });
};

// Update biodata
exports.updateOne = (req, res) => {
  const id = req.params.id;

  Biodata.findOne({
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: 'Data tidak ditemukan',
        });
      }

      // Melakukan pembaruan data
      data.nama = req.body.nama;
      data.tempat_lahir = req.body.tempat_lahir;
      data.tanggal_lahir = req.body.tanggal_lahir;
      data.alamat = req.body.alamat;
      // Tambahkan field lainnya sesuai kebutuhan

      return data.save();
    })
    .then((updatedData) => {
      res.send(updatedData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Gagal memperbarui data!',
      });
    });
};
