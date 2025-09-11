-- Prisma schema will live in backend/prisma/schema.prisma. This folder contains SQL exports and documentation.

-- High-level ERD (simplified):
-- users (id, email, first_name, last_name, phone, role, is_email_verified, created_at, updated_at)
-- trips (id, user_id, trip_number, origin_lat, origin_lng, origin_name, dest_lat, dest_lng, dest_name, start_time, end_time, mode, purpose, notes, is_completed, created_at)
-- companions (id, trip_id, name, age, relation)
-- packages (id, name, description, type, price, duration, features[], images[], is_active, seasonal_discount, max_participants, difficulty, created_at)
-- guides (id, user_id, bio, specializations[], languages[], experience, rating, total_bookings, price_per_hour, is_verified, created_at)
-- guide_availability (id, guide_id, date, start_time, end_time, is_booked)
-- bookings (id, user_id, guide_id, date, start_time, end_time, latitude, longitude, location_name, group_size, total_amount, status, created_at)
-- reviews (id, user_id, guide_id?, package_id?, rating, comment, is_verified, created_at)
-- cultural_sites (id, name, description, type, latitude, longitude, address, cultural_significance, historical_period, opening_hours_json, entry_fee, images[], facts[], local_insights[], is_hidden_gem, rating, created_at)

-- See backend/prisma/schema.prisma for full schema.

