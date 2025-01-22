const User = require('../models/user');
const md5 = require('md5')
const { Op } = require('sequelize').Op
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//resgistrasi 
exports.registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await user.create({ username, password, role });
        res.status(201).json({ message: 'User Berhasil Registrasi', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error Saat Registrasi User', error })
    }
};

//login
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await user.findOne({ where: { username, password } });
        if (!user) return res.status(401).json({ message: 'Username atau password salah' });
        res.status(200).json({ message: 'Login Berhasil', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error Saat Login', error })
    }
};

//Get All User
exports.getAllUser = async (req, res) => {
    try {
        const user = await user.findAll();
        res.status(200).json({ message: 'Daftar Semua Pengguna', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error saat mengambil daftar pengguna', error })
    }
};

//update 
exports.updateUser = async (req, res) => {
    try {
        const { userID } = req.params;
        const { username, password, role } = req.body;
        await userID.update({ username, password, role }, { where: { userID } });
        res.status(200).json({ message: 'User berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ message: 'Error saat mengupdate user', error });
    }
};

//delete
exports.deleteUser = async (req, res) => {
    try {
        const { userID } = req.params;
        await userID.destroy({ where: { userID } });
        res.status(200).json({ message: 'User berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ message: 'Error saat menghapus user', error });
    }
};
