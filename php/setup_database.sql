-- ============================================
-- L.S Transport — Full Database Schema
-- Run this SQL to create all required tables
-- ============================================

-- Customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id_customer` INT(11) NOT NULL AUTO_INCREMENT,
  `nom_customer` VARCHAR(255) NOT NULL,
  `prenom_customer` VARCHAR(255) NOT NULL,
  `email_customer` VARCHAR(255) NOT NULL,
  `telephone_customer` VARCHAR(50) DEFAULT '',
  `adresse_customer` TEXT DEFAULT NULL,
  `ville_customer` VARCHAR(255) DEFAULT '',
  `code_postal_customer` VARCHAR(20) DEFAULT '',
  `date_creation_customer` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_customer`),
  KEY `idx_email` (`email_customer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Customer Tags (VIP, Enterprise, Regular, etc.)
CREATE TABLE IF NOT EXISTS `customer_tags` (
  `id_tag` INT(11) NOT NULL AUTO_INCREMENT,
  `id_customer` INT(11) NOT NULL,
  `tag` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_tag`),
  FOREIGN KEY (`id_customer`) REFERENCES `customers`(`id_customer`) ON DELETE CASCADE,
  UNIQUE KEY `unique_customer_tag` (`id_customer`, `tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Customer Notes (CRM)
CREATE TABLE IF NOT EXISTS `customer_notes` (
  `id_note` INT(11) NOT NULL AUTO_INCREMENT,
  `id_customer` INT(11) NOT NULL,
  `note` TEXT NOT NULL,
  `follow_up_date` DATE DEFAULT NULL,
  `date_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_note`),
  FOREIGN KEY (`id_customer`) REFERENCES `customers`(`id_customer`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vehicles
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id_vehicle` INT(11) NOT NULL AUTO_INCREMENT,
  `name_vehicle` VARCHAR(255) NOT NULL,
  `plate` VARCHAR(50) NOT NULL,
  `type_vehicle` VARCHAR(100) DEFAULT 'sedan',
  `capacity` INT(11) DEFAULT 4,
  `status_vehicle` ENUM('available', 'in_use', 'maintenance') DEFAULT 'available',
  `fuel_level` INT(11) DEFAULT 100,
  `mileage` INT(11) DEFAULT 0,
  `next_service_date` DATE DEFAULT NULL,
  `insurance_expiry` DATE DEFAULT NULL,
  `daily_rate` DECIMAL(10,2) DEFAULT 0.00,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `total_trips` INT(11) DEFAULT 0,
  `date_creation_vehicle` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_vehicle`),
  UNIQUE KEY `unique_plate` (`plate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vehicle Features
CREATE TABLE IF NOT EXISTS `vehicle_features` (
  `id_feature` INT(11) NOT NULL AUTO_INCREMENT,
  `id_vehicle` INT(11) NOT NULL,
  `feature` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_feature`),
  FOREIGN KEY (`id_vehicle`) REFERENCES `vehicles`(`id_vehicle`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Drivers
CREATE TABLE IF NOT EXISTS `drivers` (
  `id_driver` INT(11) NOT NULL AUTO_INCREMENT,
  `name_driver` VARCHAR(255) NOT NULL,
  `phone_driver` VARCHAR(50) DEFAULT '',
  `email_driver` VARCHAR(255) DEFAULT '',
  `license` VARCHAR(100) DEFAULT '',
  `license_expiry` DATE DEFAULT NULL,
  `status_driver` ENUM('available', 'on_trip', 'off_duty') DEFAULT 'available',
  `rating` DECIMAL(3,2) DEFAULT 5.00,
  `total_trips` INT(11) DEFAULT 0,
  `hours_this_week` DECIMAL(5,2) DEFAULT 0.00,
  `max_hours_week` INT(11) DEFAULT 48,
  `id_vehicle` INT(11) DEFAULT NULL,
  `current_location` VARCHAR(255) DEFAULT NULL,
  `date_creation_driver` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_driver`),
  FOREIGN KEY (`id_vehicle`) REFERENCES `vehicles`(`id_vehicle`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Driver Schedules
CREATE TABLE IF NOT EXISTS `driver_schedules` (
  `id_schedule` INT(11) NOT NULL AUTO_INCREMENT,
  `id_driver` INT(11) NOT NULL,
  `day_of_week` VARCHAR(50) NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  PRIMARY KEY (`id_schedule`),
  FOREIGN KEY (`id_driver`) REFERENCES `drivers`(`id_driver`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Reservations
CREATE TABLE IF NOT EXISTS `reservations` (
  `id_reservation` INT(11) NOT NULL AUTO_INCREMENT,
  `id_customer` INT(11) NOT NULL,
  `service_type` ENUM('airport', 'business', 'event', 'excursion', 'other') DEFAULT 'other',
  `status_reservation` ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  `pickup_address` TEXT NOT NULL,
  `dropoff_address` TEXT NOT NULL,
  `pickup_date` DATE NOT NULL,
  `pickup_time` TIME DEFAULT NULL,
  `return_date` DATE DEFAULT NULL,
  `return_time` TIME DEFAULT NULL,
  `passenger_count` INT(11) DEFAULT 1,
  `luggage_count` INT(11) DEFAULT 0,
  `special_requests` TEXT DEFAULT NULL,
  `id_vehicle` INT(11) DEFAULT NULL,
  `id_driver` INT(11) DEFAULT NULL,
  `amount` DECIMAL(10,2) DEFAULT 0.00,
  `currency` VARCHAR(10) DEFAULT 'EUR',
  `payment_method` ENUM('card', 'cash', 'transfer', 'whatsapp') DEFAULT 'card',
  `payment_status` ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
  `source` ENUM('website', 'whatsapp', 'phone', 'admin') DEFAULT 'website',
  `notes` TEXT DEFAULT NULL,
  `date_creation_reservation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `date_modification_reservation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_reservation`),
  FOREIGN KEY (`id_customer`) REFERENCES `customers`(`id_customer`) ON DELETE CASCADE,
  FOREIGN KEY (`id_vehicle`) REFERENCES `vehicles`(`id_vehicle`) ON DELETE SET NULL,
  FOREIGN KEY (`id_driver`) REFERENCES `drivers`(`id_driver`) ON DELETE SET NULL,
  KEY `idx_status` (`status_reservation`),
  KEY `idx_date` (`pickup_date`),
  KEY `idx_customer` (`id_customer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Invoices
CREATE TABLE IF NOT EXISTS `invoices` (
  `id_invoice` INT(11) NOT NULL AUTO_INCREMENT,
  `invoice_number` VARCHAR(50) NOT NULL,
  `id_customer` INT(11) NOT NULL,
  `id_reservation` INT(11) DEFAULT NULL,
  `issue_date` DATE NOT NULL,
  `due_date` DATE NOT NULL,
  `paid_date` DATE DEFAULT NULL,
  `subtotal_ht` DECIMAL(10,2) DEFAULT 0.00,
  `tax_rate` DECIMAL(5,2) DEFAULT 20.00,
  `tax_amount` DECIMAL(10,2) DEFAULT 0.00,
  `total_ttc` DECIMAL(10,2) DEFAULT 0.00,
  `status_invoice` ENUM('draft', 'sent', 'paid', 'overdue') DEFAULT 'draft',
  `date_creation_invoice` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_invoice`),
  UNIQUE KEY `unique_invoice_number` (`invoice_number`),
  FOREIGN KEY (`id_customer`) REFERENCES `customers`(`id_customer`) ON DELETE CASCADE,
  FOREIGN KEY (`id_reservation`) REFERENCES `reservations`(`id_reservation`) ON DELETE SET NULL,
  KEY `idx_status_invoice` (`status_invoice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Invoice Items
CREATE TABLE IF NOT EXISTS `invoice_items` (
  `id_item` INT(11) NOT NULL AUTO_INCREMENT,
  `id_invoice` INT(11) NOT NULL,
  `description_item` TEXT NOT NULL,
  `qty` INT(11) DEFAULT 1,
  `unit_price` DECIMAL(10,2) NOT NULL,
  `total_item` DECIMAL(10,2) NOT NULL,
  `date_creation_item` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_item`),
  FOREIGN KEY (`id_invoice`) REFERENCES `invoices`(`id_invoice`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pricing Rules
CREATE TABLE IF NOT EXISTS `pricing_rules` (
  `id_rule` INT(11) NOT NULL AUTO_INCREMENT,
  `rule_key` VARCHAR(100) NOT NULL,
  `rule_label` VARCHAR(255) NOT NULL,
  `value` DECIMAL(10,2) NOT NULL,
  `unit` VARCHAR(50) DEFAULT '€',
  PRIMARY KEY (`id_rule`),
  UNIQUE KEY `unique_rule_key` (`rule_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pricing Zones
CREATE TABLE IF NOT EXISTS `pricing_zones` (
  `id_zone` INT(11) NOT NULL AUTO_INCREMENT,
  `zone_name` VARCHAR(255) NOT NULL,
  `zone_from` VARCHAR(255) NOT NULL,
  `zone_to` VARCHAR(255) NOT NULL,
  `base_price` DECIMAL(10,2) DEFAULT 0.00,
  `price_per_km` DECIMAL(10,2) DEFAULT 0.00,
  PRIMARY KEY (`id_zone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Service Rates
CREATE TABLE IF NOT EXISTS `service_rates` (
  `id_rate` INT(11) NOT NULL AUTO_INCREMENT,
  `service_type` VARCHAR(100) NOT NULL,
  `base_rate` DECIMAL(10,2) DEFAULT 0.00,
  `hourly_rate` DECIMAL(10,2) DEFAULT 0.00,
  `min_hours` DECIMAL(5,2) DEFAULT 0.00,
  PRIMARY KEY (`id_rate`),
  UNIQUE KEY `unique_service_type` (`service_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Quotes (from website form)
CREATE TABLE IF NOT EXISTS `quotes` (
  `id_quote` INT(11) NOT NULL AUTO_INCREMENT,
  `client_name` VARCHAR(255) NOT NULL,
  `client_email` VARCHAR(255) DEFAULT '',
  `client_phone` VARCHAR(50) DEFAULT '',
  `service_type` VARCHAR(100) DEFAULT 'other',
  `pickup_address` TEXT DEFAULT NULL,
  `dropoff_address` TEXT DEFAULT NULL,
  `pickup_date` DATE DEFAULT NULL,
  `pickup_time` TIME DEFAULT NULL,
  `passenger_count` INT(11) DEFAULT 1,
  `special_requests` TEXT DEFAULT NULL,
  `status_quote` ENUM('new', 'contacted', 'quoted', 'accepted', 'rejected') DEFAULT 'new',
  `quoted_amount` DECIMAL(10,2) DEFAULT NULL,
  `admin_notes` TEXT DEFAULT NULL,
  `date_creation_quote` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_quote`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default Pricing Rules
INSERT INTO `pricing_rules` (`rule_key`, `rule_label`, `value`, `unit`) VALUES
('base_fare', 'Prise en charge', 15.00, '€'),
('price_per_km', 'Prix / km', 2.50, '€/km'),
('waiting_time', 'Attente / 15min', 12.00, '€'),
('night_surcharge', 'Majoration nuit (22h-6h)', 25.00, '%'),
('airport_supplement', 'Supplément aéroport', 10.00, '€'),
('luggage_extra', 'Bagage supplémentaire', 5.00, '€')
ON DUPLICATE KEY UPDATE rule_key = rule_key;
