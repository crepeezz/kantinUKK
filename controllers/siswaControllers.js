const { siswa, user, menu, transaksi, detail_transaksi, menu_diskon, diskon } = require('../models');
const md5 = require('md5')
const { Op } = require('sequelize').Op
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//resgistrasi 
exports.registerSiswa = async (req, res) => {
    try {
        const { username, password, nama_siswa, alamat, telp, foto } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUSer = await user.create({
            username,
            password: hashedPassword,
            role: 'siswa',
        });

        const newSiswa = await siswa.create({
            nama_siswa,
            alamat,
            telp,
            userID: newUSer.userID,
            foto
        });

        res.status(201).json({ message: 'siswa registeres succeddfully', data: newSiswa });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//login
exports.loginSiswa = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cari user berdasarkan username dan role
        const foundUser = await user.findOne({ where: { username } });
        if (!foundUser || foundUser.role !== 'siswa') {
            return res.status(404).json({ message: 'User not found or not a siswa' });
        }

        // Validasi password
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate token dengan payload berisi siswaID dan role
        const token = jwt.sign(
            { siswaID: foundUser.userID, role: foundUser.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        // Kirim respons sukses dengan token
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

//Get All User
exports.getAllUser = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json({ message: 'Daftar Semua Pengguna', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error saat mengambil daftar pengguna', error })
    }
};

//update 
exports.updateSiswa = async (req, res) => {
    try {
        const { siswaID } = req.params; // Ambil ID siswa dari parameter URL
        const { nama_siswa, alamat, telp, foto } = req.body;

        // Cari siswa berdasarkan ID
        const foundSiswa = await siswa.findOne({ where: { siswaID } });
        if (!foundSiswa) {
            return res.status(404).json({ message: 'Siswa not found' });
        }

        // Update data siswa
        await foundSiswa.update({
            nama_siswa: nama_siswa || foundSiswa.nama_siswa,
            alamat: alamat || foundSiswa.alamat,
            telp: telp || foundSiswa.telp,
            foto: foto || foundSiswa.foto,
        });

        res.status(200).json({ message: 'Siswa updated successfully', data: foundSiswa });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};