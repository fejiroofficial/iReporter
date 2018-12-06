CREATE TABLE IF NOT EXISTS users (
   id  SERIAL PRIMARY KEY,
   firstname  VARCHAR(255) NOT NULL,
   lastname  VARCHAR(255) NOT NULL,
   othernames VARCHAR(255),
   email  VARCHAR(255) NOT NULL UNIQUE,
   telephone  VARCHAR(255) UNIQUE,
   username VARCHAR(255) NOT NULL UNIQUE,
   profile_image VARCHAR(255),
   password  VARCHAR(255) NOT NULL,
   isAdmin  BOOLEAN NOT NULL,
   registered  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS incidents (
   id  SERIAL PRIMARY KEY,
   createdby INT NOT NULL,
   comment VARCHAR(255) NOT NULL,
   type VARCHAR(255) NOT NULL,
   location VARCHAR(255) NOT NULL,
   image_url VARCHAR(255),
   status VARCHAR(255) NOT NULL,
   createdon TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
           --Relationship-- 
  FOREIGN KEY( createdby ) REFERENCES users( id ) ON DELETE CASCADE
);


