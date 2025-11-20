import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
  try {
    await dbConnect();
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ status: 'error', database: 'disconnected', message: error.message });
  }
}
