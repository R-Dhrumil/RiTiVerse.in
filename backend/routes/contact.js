import { Router } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

/**
 * POST /api/contact
 * Handle new consultation inquiry submissions
 */
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, serviceType, budgetRange, message } = req.body;

    // Server-side validation
    if (!fullName || !email || !serviceType || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: Full Name, Email, Service Type, and Message are mandatory.'
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : null,
          service_type: serviceType,
          budget_range: budgetRange || 'Undisclosed',
          message: message.trim(),
          status: 'pending',
          user_agent: req.headers['user-agent'] || null,
          ip_address: req.ip || req.socket?.remoteAddress || null
        }
      ])
      .select();

    if (error) {
      console.error('❌ Supabase Insertion Error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to record consultation submission in database.',
        details: error.message
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Consultation submission received successfully.',
      data: data[0]
    });
  } catch (err) {
    console.error('❌ Server Internal Error:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred.'
    });
  }
});

/**
 * GET /api/contact
 * Fetch recent submissions (Requires authentication or API key in production)
 */
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.json({ success: true, count: data.length, submissions: data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
