import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: process.env.USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
});
const connectToDb = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to the database successfully!');
        // Test the connection by querying the database
        const result = await client.query('SELECT current_database(), current_user;');
        console.log('Connected to database:', result.rows[0].current_database);
        console.log('Connected as user:', result.rows[0].current_user);
        client.release();
    }
    catch (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
};
export { pool, connectToDb };
