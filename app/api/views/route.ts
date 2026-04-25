import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS views (
        id SERIAL PRIMARY KEY,
        count INTEGER DEFAULT 200
      );
    `);
    
    // Check if there's a row, if not insert one
    const result = await client.query('SELECT COUNT(*) FROM views');
    if (parseInt(result.rows[0].count) === 0) {
      await client.query('INSERT INTO views (count) VALUES (200)');
    }
  } finally {
    client.release();
  }
}

export async function GET() {
  try {
    await initTable();
    
    const client = await pool.connect();
    try {
      const result = await client.query('UPDATE views SET count = count + 1 RETURNING count');
      return NextResponse.json({ count: result.rows[0].count });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to update views' }, { status: 500 });
  }
}
