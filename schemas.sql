-- Create custom enums
CREATE TYPE user_role AS ENUM ('citizen', 'official');
CREATE TYPE sensor_status AS ENUM ('active', 'inactive', 'maintenance');
CREATE TYPE complaint_status AS ENUM ('pending', 'in_progress', 'resolved');
CREATE TYPE maintenance_status AS ENUM ('scheduled', 'completed', 'cancelled');

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    role user_role NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Infrastructure sensors table
CREATE TABLE infrastructure_sensors (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status sensor_status DEFAULT 'active',
    installed_at TIMESTAMP NOT NULL,
    last_reading_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Citizen complaints table
CREATE TABLE citizen_complaints (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status complaint_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Maintenance schedule table
CREATE TABLE maintenance_schedule (
    id SERIAL PRIMARY KEY,
    sensor_id INTEGER REFERENCES infrastructure_sensors(id) ON DELETE CASCADE,
    scheduled_date TIMESTAMP NOT NULL,
    description TEXT NOT NULL,
    status maintenance_status DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
