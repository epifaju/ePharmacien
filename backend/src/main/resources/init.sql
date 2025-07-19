-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create admin table
CREATE TABLE IF NOT EXISTS admin (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pharmacies table with PostGIS geometry
CREATE TABLE IF NOT EXISTS pharmacies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(255) NOT NULL,
    adresse VARCHAR(500) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    location GEOMETRY(POINT, 4326),
    ouverte BOOLEAN DEFAULT true,
    garde BOOLEAN DEFAULT false,
    nuit BOOLEAN DEFAULT false,
    ouverture TIME DEFAULT '08:00:00',
    fermeture TIME DEFAULT '20:00:00',
    telephone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create spatial index for better performance
CREATE INDEX IF NOT EXISTS idx_pharmacies_location ON pharmacies USING GIST (location);

-- Insert default admin user (password: admin123)
INSERT INTO admin (username, password_hash) 
VALUES ('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa')
ON CONFLICT (username) DO NOTHING;

-- Insert sample pharmacies
INSERT INTO pharmacies (nom, adresse, ville, latitude, longitude, location, ouverte, garde, nuit, ouverture, fermeture, telephone) VALUES
('Pharmacie Centrale', '123 Rue de la Paix', 'Paris', 48.8566, 2.3522, ST_SetSRID(ST_MakePoint(2.3522, 48.8566), 4326), true, false, false, '08:00:00', '20:00:00', '01 42 34 56 78'),
('Pharmacie de Garde Nord', '456 Avenue des Champs', 'Paris', 48.8738, 2.2950, ST_SetSRID(ST_MakePoint(2.2950, 48.8738), 4326), true, true, false, '00:00:00', '23:59:59', '01 43 45 67 89'),
('Pharmacie de Nuit', '789 Boulevard Saint-Germain', 'Paris', 48.8534, 2.3488, ST_SetSRID(ST_MakePoint(2.3488, 48.8534), 4326), true, false, true, '20:00:00', '08:00:00', '01 44 56 78 90'),
('Pharmacie du Sud', '321 Rue de Rivoli', 'Paris', 48.8606, 2.3376, ST_SetSRID(ST_MakePoint(2.3376, 48.8606), 4326), true, false, false, '09:00:00', '19:00:00', '01 45 67 89 01'),
('Pharmacie de Garde Est', '654 Rue du Faubourg', 'Paris', 48.8668, 2.3558, ST_SetSRID(ST_MakePoint(2.3558, 48.8668), 4326), true, true, false, '00:00:00', '23:59:59', '01 46 78 90 12'),
('Pharmacie de Lyon', '147 Rue de la République', 'Lyon', 45.7578, 4.8320, ST_SetSRID(ST_MakePoint(4.8320, 45.7578), 4326), true, false, false, '08:30:00', '19:30:00', '04 72 34 56 78'),
('Pharmacie de Marseille', '258 Quai des Belges', 'Marseille', 43.2965, 5.3698, ST_SetSRID(ST_MakePoint(5.3698, 43.2965), 4326), true, true, false, '00:00:00', '23:59:59', '04 91 45 67 89'),
('Pharmacie de Toulouse', '369 Place du Capitole', 'Toulouse', 43.6047, 1.4442, ST_SetSRID(ST_MakePoint(1.4442, 43.6047), 4326), true, false, false, '08:00:00', '20:00:00', '05 61 56 78 90');

-- Create function to update location from lat/lng
CREATE OR REPLACE FUNCTION update_pharmacy_location()
RETURNS TRIGGER AS $$
BEGIN
    NEW.location = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update location
CREATE TRIGGER trigger_update_pharmacy_location
    BEFORE INSERT OR UPDATE ON pharmacies
    FOR EACH ROW
    EXECUTE FUNCTION update_pharmacy_location(); 