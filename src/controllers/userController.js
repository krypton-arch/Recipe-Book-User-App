// src/controllers/userController.js
const db = require('../config/db');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 1. Register User (Create)
exports.registerUser = async (req, res) => {
  const { name, email, phone } = req.body;
  const profilePicture = req.file ? req.file.path : null;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required.' });
  }

  try {
    const sql = 'INSERT INTO users (name, email, phone, profile_picture) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [name, email, phone, profilePicture]);

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Registration Successful - Welcome to The Recipe Book!',
      html: `<h1>Welcome, ${name}!</h1><p>Thank you for registering. We're excited to have you.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        // We still return success for registration even if email fails
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ id: result.insertId, message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error.', error });
  }
};

// 2. Get All Users (Read)
exports.getAllUsers = async (req, res) => {
  try {
    const sql = 'SELECT id, name, email, phone, profile_picture FROM users ORDER BY registration_date DESC';
    const [users] = await db.query(sql);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users.' });
  }
};

// 3. Get User by ID (Read)
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT id, name, email, phone, profile_picture FROM users WHERE id = ?';
    const [user] = await db.query(sql, [id]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user.' });
  }
};

// 4. Update User
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  let profilePicture = req.body.existingProfilePicture; // Keep old if no new one is uploaded

  if (req.file) {
      profilePicture = req.file.path; // Set to new path if uploaded
  }
  
  try {
    const sql = 'UPDATE users SET name = ?, email = ?, phone = ?, profile_picture = ? WHERE id = ?';
    const [result] = await db.query(sql, [name, email, phone, profilePicture, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found or no changes made.' });
    }
    res.status(200).json({ message: 'User updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user.' });
  }
};

// 5. Delete User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = 'DELETE FROM users WHERE id = ?';
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user.' });
  }
};
