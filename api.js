import express from 'express';

const router = express.Router();

// Define your routes
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

router.post('/greet', express.json(), (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}!` });
});

export default router;
