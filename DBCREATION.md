CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE  TABLE  IF  NOT  EXISTS  public.incomes
  (
  id uuid NOT NULL  DEFAULT uuid_generate_v4(),
  description character varying(255) COLLATE pg_catalog."default"  NOT NULL,
  value integer  NOT NULL,
  date character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  created_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  updated_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  deleted_at timestamp without time zone,
  CONSTRAINT  "PK_d7281c63c176e152e4c531594a8"  PRIMARY KEY (id)
  );
  
  ALTER  TABLE  IF  EXISTS  public.incomes  OWNER  to  root;

CREATE  TABLE  IF  NOT  EXISTS  public.expenses
  (
  id uuid NOT NULL  DEFAULT uuid_generate_v4(),
  description character varying(255) COLLATE pg_catalog."default"  NOT NULL,
  value integer  NOT NULL,
  date character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  category character varying(100) COLLATE pg_catalog."default" NOT NULL DEFAULT 'Outras',
  created_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  updated_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  deleted_at timestamp without time zone,
  CONSTRAINT  "PK_d7281c63c176e152e4c531594a9"  PRIMARY KEY (id)
  );
  
  ALTER  TABLE  IF  EXISTS  public.expenses  OWNER  to  root;