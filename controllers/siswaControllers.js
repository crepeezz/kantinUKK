const { siswa, user, menu, transaksi, detail_transaksi, menu_diskon, diskon } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const moment = require('moment');
const stan = require('../models/stan');

// // Register Siswa
// exports.registerSiswa = async (req, res) => {
//     try {
//         const { username, password, nama_siswa, alamat, telp, foto } = req.body;

//         if (!username || !password || !nama_siswa || !alamat || !telp) {
//             return res.status(400).json({ error: 'Semua field wajib diisi!' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = await user.create({
//             username,
//             password: hashedPassword,
//             role: 'siswa',
//         });

//         console.log('User Created:', newUser.toJSON()); // Debugging

//         // Ambil ID dengan cara yang benar
//         const userId = newUser.id;

//         if (!userId) {
//             return res.status(500).json({ error: 'Gagal mendapatkan ID user' });
//         }

//         console.log('User ID:', userId); // Debugging

//         const newSiswa = await siswa.create({
//             nama_siswa,
//             alamat,
//             telp,
//             userID: userId, // Pastikan ini tidak null
//             foto,
//         });

//         res.status(201).json({ message: 'Siswa registered successfully', data: { newUser, newSiswa } });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

exports.registerSiswa = async (req, res) => {
    try {
        const { username, password, nama_siswa, alamat, telp, foto } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await user.create({
            username,
            password: hashedPassword,
            role: 'siswa',
        });

        // Pastikan `newUser` memiliki `id` atau primary key sesuai dengan kolom `id_user` di `siswa`
        console.log('New User:', newUser); // Debug log untuk memastikan data user

        // Create siswa
        const newSiswa = await siswa.create({
            nama_siswa,
            alamat,
            telp,
            userID: newUser.userID,
            foto,
        });

        res.status(201).json({
            message: 'Siswa registered successfully',
            data: { newUser, newSiswa },
        });
    } catch (error) {
        console.error('Error:', error); // Log error untuk debugging
        res.status(500).json({ error: error.message });
    }
};



// Login Siswa
exports.loginSiswa = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Debug: Cek input request
        console.log('Request body:', req.body);

        // Cari user dengan username dan role 'siswa'
        const foundUser = await user.findOne({
            where: { username, role: 'siswa' },
            // raw: true
        });

        // Debug: Cek hasil pencarian user
        console.log('Found User:', foundUser);

        if (!foundUser) {
            return res.status(404).json({ message: 'User not found or not a siswa' });
        }

        // if (!foundUser.userID) {
        //     return res.status(500).json({ message: 'Invalid user data (user ID missing)' });
        // }

        // Cek password
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Cari data siswa berdasarkan userID
        const siswaData = await siswa.findOne({ where: { userID: foundUser.userID } });

        // Debug: Cek hasil pencarian siswa
        console.log('Siswa Data:', siswaData);

        if (!siswaData) {
            return res.status(404).json({ message: 'Siswa profile not found' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { siswaID: siswaData.id, role: foundUser.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update Siswa
exports.updateSiswa = async (req, res) => {
    try {
        const siswaData = await siswa.findByPk(req.params.id);
        if (!siswaData) return res.status(404).json({ message: 'Siswa not found' });

        await siswaData.update(req.body);
        res.status(200).json({ message: 'Data updated successfully', data: siswaData });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Siswa
exports.getSiswa = async (req, res) => {
    try {
        const search = req.params.search || '';
        const data = await siswa.findAll({
            where: {
                [Op.or]: [
                    { nama_siswa: { [Op.substring]: search } },
                    { alamat: { [Op.substring]: search } },
                    { telp: { [Op.substring]: search } },
                ],
            },
        });
        res.json({ success: true, data, message: 'Siswa profile retrieved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get Menu
exports.getMenu = async (req, res) => {
    try {
        const menus = await menu.findAll();
        res.status(200).json({ data: menus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create Order
exports.createOrder = async (req, res) => {
    try {
        const { id_siswa, menuID, qty } = req.body;
        const menuItem = await menu.findByPk(menuID, { include: [{ model: menu_diskon, include: [diskon] }] });

        if (!menuItem) return res.status(404).json({ message: 'Menu not found' });

        let harga_beli = menuItem.harga;
        const discount = menuItem.menu_diskons?.[0]?.diskon;
        if (discount && moment().isBetween(discount.tanggal_awal, discount.tanggal_akhir)) {
            harga_beli -= (harga_beli * discount.persentase_diskon) / 100;
        }

        const transaksiData = await transaksi.create({
            id_siswa,
            stanID: menuItem.stanID,
            status: 'belum dikonfirm',
            tanggal: new Date(),
        });

        await detail_transaksi.create({ transaksiID: transaksiData.id, menuID, qty, harga_beli });
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Order Status
exports.getOrderStatus = async (req, res) => {
    try {
        const { id_siswa } = req.params;
        const orders = await transaksi.findAll({
            where: { id_siswa },
            include: [{ model: detail_transaksi, include: [menu] }],
        });
        res.status(200).json({ data: orders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Transaction History
exports.getTransactionHistory = async (req, res) => {
    try {
        const { id_siswa, month } = req.params;
        const transactions = await transaksi.findAll({
            where: {
                id_siswa,
                tanggal: { [Op.between]: [moment().month(month - 1).startOf('month').toDate(), moment().month(month - 1).endOf('month').toDate()] },
            },
            include: [{ model: detail_transaksi, include: [menu] }],
        });
        res.status(200).json({ data: transactions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
