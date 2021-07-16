--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.16
-- Dumped by pg_dump version 9.6.16

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: components_faq_question_faqs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.components_faq_question_faqs (
    id integer NOT NULL,
    question text,
    reponse text
);


ALTER TABLE public.components_faq_question_faqs OWNER TO postgres;

--
-- Name: components_faq_question_faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.components_faq_question_faqs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_faq_question_faqs_id_seq OWNER TO postgres;

--
-- Name: components_faq_question_faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.components_faq_question_faqs_id_seq OWNED BY public.components_faq_question_faqs.id;


--
-- Name: components_faq_tuto_videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.components_faq_tuto_videos (
    id integer NOT NULL,
    titre character varying(255)
);


ALTER TABLE public.components_faq_tuto_videos OWNER TO postgres;

--
-- Name: components_faq_tuto_videos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.components_faq_tuto_videos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_faq_tuto_videos_id_seq OWNER TO postgres;

--
-- Name: components_faq_tuto_videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.components_faq_tuto_videos_id_seq OWNED BY public.components_faq_tuto_videos.id;


--
-- Name: core_store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.core_store (
    id integer NOT NULL,
    key character varying(255),
    value text,
    type character varying(255),
    environment character varying(255),
    tag character varying(255)
);


ALTER TABLE public.core_store OWNER TO postgres;

--
-- Name: core_store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.core_store_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_store_id_seq OWNER TO postgres;

--
-- Name: core_store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.core_store_id_seq OWNED BY public.core_store.id;


--
-- Name: faq-sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."faq-sections" (
    id integer NOT NULL,
    "Titre" character varying(255),
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public."faq-sections" OWNER TO postgres;

--
-- Name: faq-sections_components; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."faq-sections_components" (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    "faq-section_id" integer NOT NULL
);


ALTER TABLE public."faq-sections_components" OWNER TO postgres;

--
-- Name: faq-sections_components_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."faq-sections_components_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."faq-sections_components_id_seq" OWNER TO postgres;

--
-- Name: faq-sections_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."faq-sections_components_id_seq" OWNED BY public."faq-sections_components".id;


--
-- Name: faq-sections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."faq-sections_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."faq-sections_id_seq" OWNER TO postgres;

--
-- Name: faq-sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."faq-sections_id_seq" OWNED BY public."faq-sections".id;


--
-- Name: faq_sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faq_sections (
    id integer NOT NULL,
    "Titre" character varying(255),
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.faq_sections OWNER TO postgres;

--
-- Name: faq_sections_components; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faq_sections_components (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    faq_section_id integer NOT NULL
);


ALTER TABLE public.faq_sections_components OWNER TO postgres;

--
-- Name: faq_sections_components_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faq_sections_components_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faq_sections_components_id_seq OWNER TO postgres;

--
-- Name: faq_sections_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faq_sections_components_id_seq OWNED BY public.faq_sections_components.id;


--
-- Name: faq_sections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faq_sections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faq_sections_id_seq OWNER TO postgres;

--
-- Name: faq_sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faq_sections_id_seq OWNED BY public.faq_sections.id;


--
-- Name: faq_tutos_videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faq_tutos_videos (
    id integer NOT NULL,
    titre character varying(255),
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.faq_tutos_videos OWNER TO postgres;

--
-- Name: faq_tutos_videos_components; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faq_tutos_videos_components (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    faq_tutos_video_id integer NOT NULL
);


ALTER TABLE public.faq_tutos_videos_components OWNER TO postgres;

--
-- Name: faq_tutos_videos_components_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faq_tutos_videos_components_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faq_tutos_videos_components_id_seq OWNER TO postgres;

--
-- Name: faq_tutos_videos_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faq_tutos_videos_components_id_seq OWNED BY public.faq_tutos_videos_components.id;


--
-- Name: faq_tutos_videos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faq_tutos_videos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faq_tutos_videos_id_seq OWNER TO postgres;

--
-- Name: faq_tutos_videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faq_tutos_videos_id_seq OWNED BY public.faq_tutos_videos.id;


--
-- Name: faqs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faqs (
    id integer NOT NULL,
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.faqs OWNER TO postgres;

--
-- Name: faqs__faq_sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faqs__faq_sections (
    id integer NOT NULL,
    faq_id integer,
    "faq-section_id" integer
);


ALTER TABLE public.faqs__faq_sections OWNER TO postgres;

--
-- Name: faqs__faq_sections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faqs__faq_sections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faqs__faq_sections_id_seq OWNER TO postgres;

--
-- Name: faqs__faq_sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faqs__faq_sections_id_seq OWNED BY public.faqs__faq_sections.id;


--
-- Name: faqs__faq_tutos_videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faqs__faq_tutos_videos (
    id integer NOT NULL,
    faq_id integer,
    "faq-tutos-video_id" integer
);


ALTER TABLE public.faqs__faq_tutos_videos OWNER TO postgres;

--
-- Name: faqs__faq_tutos_videos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faqs__faq_tutos_videos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faqs__faq_tutos_videos_id_seq OWNER TO postgres;

--
-- Name: faqs__faq_tutos_videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faqs__faq_tutos_videos_id_seq OWNED BY public.faqs__faq_tutos_videos.id;


--
-- Name: faqs_components; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faqs_components (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    faq_id integer NOT NULL
);


ALTER TABLE public.faqs_components OWNER TO postgres;

--
-- Name: faqs_components_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faqs_components_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faqs_components_id_seq OWNER TO postgres;

--
-- Name: faqs_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faqs_components_id_seq OWNED BY public.faqs_components.id;


--
-- Name: faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faqs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.faqs_id_seq OWNER TO postgres;

--
-- Name: faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faqs_id_seq OWNED BY public.faqs.id;


--
-- Name: pages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pages (
    id integer NOT NULL,
    titre character varying(255) NOT NULL,
    contenu text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.pages OWNER TO postgres;

--
-- Name: pages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pages_id_seq OWNER TO postgres;

--
-- Name: pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pages_id_seq OWNED BY public.pages.id;


--
-- Name: section_faqs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.section_faqs (
    id integer NOT NULL,
    titre character varying(255),
    published_at timestamp with time zone,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    "Titre" character varying(255)
);


ALTER TABLE public.section_faqs OWNER TO postgres;

--
-- Name: section_faqs_components; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.section_faqs_components (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    "order" integer NOT NULL,
    component_type character varying(255) NOT NULL,
    component_id integer NOT NULL,
    section_faq_id integer NOT NULL
);


ALTER TABLE public.section_faqs_components OWNER TO postgres;

--
-- Name: section_faqs_components_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.section_faqs_components_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.section_faqs_components_id_seq OWNER TO postgres;

--
-- Name: section_faqs_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.section_faqs_components_id_seq OWNED BY public.section_faqs_components.id;


--
-- Name: section_faqs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.section_faqs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.section_faqs_id_seq OWNER TO postgres;

--
-- Name: section_faqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.section_faqs_id_seq OWNED BY public.section_faqs.id;


--
-- Name: strapi_administrator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.strapi_administrator (
    id integer NOT NULL,
    username character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255),
    "resetPasswordToken" character varying(255),
    blocked boolean,
    firstname character varying(255),
    lastname character varying(255),
    "registrationToken" character varying(255),
    "isActive" boolean
);


ALTER TABLE public.strapi_administrator OWNER TO postgres;

--
-- Name: strapi_administrator_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.strapi_administrator_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_administrator_id_seq OWNER TO postgres;

--
-- Name: strapi_administrator_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.strapi_administrator_id_seq OWNED BY public.strapi_administrator.id;


--
-- Name: strapi_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.strapi_permission (
    id integer NOT NULL,
    action character varying(255) NOT NULL,
    subject character varying(255),
    fields jsonb,
    conditions jsonb,
    role integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.strapi_permission OWNER TO postgres;

--
-- Name: strapi_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.strapi_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_permission_id_seq OWNER TO postgres;

--
-- Name: strapi_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.strapi_permission_id_seq OWNED BY public.strapi_permission.id;


--
-- Name: strapi_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.strapi_role (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    code character varying(255) NOT NULL,
    description character varying(255),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.strapi_role OWNER TO postgres;

--
-- Name: strapi_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.strapi_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_role_id_seq OWNER TO postgres;

--
-- Name: strapi_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.strapi_role_id_seq OWNED BY public.strapi_role.id;


--
-- Name: strapi_users_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.strapi_users_roles (
    id integer NOT NULL,
    user_id integer,
    role_id integer
);


ALTER TABLE public.strapi_users_roles OWNER TO postgres;

--
-- Name: strapi_users_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.strapi_users_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_users_roles_id_seq OWNER TO postgres;

--
-- Name: strapi_users_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.strapi_users_roles_id_seq OWNED BY public.strapi_users_roles.id;


--
-- Name: strapi_webhooks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.strapi_webhooks (
    id integer NOT NULL,
    name character varying(255),
    url text,
    headers jsonb,
    events jsonb,
    enabled boolean
);


ALTER TABLE public.strapi_webhooks OWNER TO postgres;

--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.strapi_webhooks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.strapi_webhooks_id_seq OWNER TO postgres;

--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.strapi_webhooks_id_seq OWNED BY public.strapi_webhooks.id;


--
-- Name: upload_file; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.upload_file (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "alternativeText" character varying(255),
    caption character varying(255),
    width integer,
    height integer,
    formats jsonb,
    hash character varying(255) NOT NULL,
    ext character varying(255),
    mime character varying(255) NOT NULL,
    size numeric(10,2) NOT NULL,
    url character varying(255) NOT NULL,
    "previewUrl" character varying(255),
    provider character varying(255) NOT NULL,
    provider_metadata jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    created_by integer,
    updated_by integer
);


ALTER TABLE public.upload_file OWNER TO postgres;

--
-- Name: upload_file_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.upload_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.upload_file_id_seq OWNER TO postgres;

--
-- Name: upload_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.upload_file_id_seq OWNED BY public.upload_file.id;


--
-- Name: upload_file_morph; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.upload_file_morph (
    id integer NOT NULL,
    upload_file_id integer,
    related_id integer,
    related_type text,
    field text,
    "order" integer
);


ALTER TABLE public.upload_file_morph OWNER TO postgres;

--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.upload_file_morph_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.upload_file_morph_id_seq OWNER TO postgres;

--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.upload_file_morph_id_seq OWNED BY public.upload_file_morph.id;


--
-- Name: users-permissions_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."users-permissions_permission" (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    controller character varying(255) NOT NULL,
    action character varying(255) NOT NULL,
    enabled boolean NOT NULL,
    policy character varying(255),
    role integer,
    created_by integer,
    updated_by integer
);


ALTER TABLE public."users-permissions_permission" OWNER TO postgres;

--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."users-permissions_permission_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users-permissions_permission_id_seq" OWNER TO postgres;

--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."users-permissions_permission_id_seq" OWNED BY public."users-permissions_permission".id;


--
-- Name: users-permissions_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."users-permissions_role" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    type character varying(255),
    created_by integer,
    updated_by integer
);


ALTER TABLE public."users-permissions_role" OWNER TO postgres;

--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."users-permissions_role_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users-permissions_role_id_seq" OWNER TO postgres;

--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."users-permissions_role_id_seq" OWNED BY public."users-permissions_role".id;


--
-- Name: users-permissions_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."users-permissions_user" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    provider character varying(255),
    password character varying(255),
    "resetPasswordToken" character varying(255),
    confirmed boolean,
    blocked boolean,
    role integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    created_by integer,
    updated_by integer
);


ALTER TABLE public."users-permissions_user" OWNER TO postgres;

--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."users-permissions_user_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."users-permissions_user_id_seq" OWNER TO postgres;

--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."users-permissions_user_id_seq" OWNED BY public."users-permissions_user".id;


--
-- Name: components_faq_question_faqs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.components_faq_question_faqs ALTER COLUMN id SET DEFAULT nextval('public.components_faq_question_faqs_id_seq'::regclass);


--
-- Name: components_faq_tuto_videos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.components_faq_tuto_videos ALTER COLUMN id SET DEFAULT nextval('public.components_faq_tuto_videos_id_seq'::regclass);


--
-- Name: core_store id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_store ALTER COLUMN id SET DEFAULT nextval('public.core_store_id_seq'::regclass);


--
-- Name: faq-sections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."faq-sections" ALTER COLUMN id SET DEFAULT nextval('public."faq-sections_id_seq"'::regclass);


--
-- Name: faq-sections_components id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."faq-sections_components" ALTER COLUMN id SET DEFAULT nextval('public."faq-sections_components_id_seq"'::regclass);


--
-- Name: faq_sections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq_sections ALTER COLUMN id SET DEFAULT nextval('public.faq_sections_id_seq'::regclass);


--
-- Name: faq_sections_components id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq_sections_components ALTER COLUMN id SET DEFAULT nextval('public.faq_sections_components_id_seq'::regclass);


--
-- Name: faq_tutos_videos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq_tutos_videos ALTER COLUMN id SET DEFAULT nextval('public.faq_tutos_videos_id_seq'::regclass);


--
-- Name: faq_tutos_videos_components id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq_tutos_videos_components ALTER COLUMN id SET DEFAULT nextval('public.faq_tutos_videos_components_id_seq'::regclass);


--
-- Name: faqs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs ALTER COLUMN id SET DEFAULT nextval('public.faqs_id_seq'::regclass);


--
-- Name: faqs__faq_sections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs__faq_sections ALTER COLUMN id SET DEFAULT nextval('public.faqs__faq_sections_id_seq'::regclass);


--
-- Name: faqs__faq_tutos_videos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs__faq_tutos_videos ALTER COLUMN id SET DEFAULT nextval('public.faqs__faq_tutos_videos_id_seq'::regclass);


--
-- Name: faqs_components id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs_components ALTER COLUMN id SET DEFAULT nextval('public.faqs_components_id_seq'::regclass);


--
-- Name: pages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.pages_id_seq'::regclass);


--
-- Name: section_faqs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_faqs ALTER COLUMN id SET DEFAULT nextval('public.section_faqs_id_seq'::regclass);


--
-- Name: section_faqs_components id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_faqs_components ALTER COLUMN id SET DEFAULT nextval('public.section_faqs_components_id_seq'::regclass);


--
-- Name: strapi_administrator id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_administrator ALTER COLUMN id SET DEFAULT nextval('public.strapi_administrator_id_seq'::regclass);


--
-- Name: strapi_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_permission ALTER COLUMN id SET DEFAULT nextval('public.strapi_permission_id_seq'::regclass);


--
-- Name: strapi_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_role ALTER COLUMN id SET DEFAULT nextval('public.strapi_role_id_seq'::regclass);


--
-- Name: strapi_users_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_users_roles ALTER COLUMN id SET DEFAULT nextval('public.strapi_users_roles_id_seq'::regclass);


--
-- Name: strapi_webhooks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_webhooks ALTER COLUMN id SET DEFAULT nextval('public.strapi_webhooks_id_seq'::regclass);


--
-- Name: upload_file id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload_file ALTER COLUMN id SET DEFAULT nextval('public.upload_file_id_seq'::regclass);


--
-- Name: upload_file_morph id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload_file_morph ALTER COLUMN id SET DEFAULT nextval('public.upload_file_morph_id_seq'::regclass);


--
-- Name: users-permissions_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_permission" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_permission_id_seq"'::regclass);


--
-- Name: users-permissions_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_role" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_role_id_seq"'::regclass);


--
-- Name: users-permissions_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_user" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_user_id_seq"'::regclass);


--
-- Data for Name: components_faq_question_faqs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.components_faq_question_faqs (id, question, reponse) FROM stdin;
1	question 1	reponse 1
2	why ?	because
4	A qui s’adresse précisément le portail FCE ?	Le portail FCE s’adresse à tous les agents publics relevant des DR(I)EETS, DEETS et DDETS (PP).  \nIl facilite l’accès aux informations disponibles sur les entreprises et les échanges entre services.
22	Comment accéder à FCE ?	L’accès est réservé aux seuls agents du réseau des DR(I)EETS, DEETS et DDETS (PP)  \nPour se connecter, deux étapes :\n\n- 1. saisir son adresse mail\n\n*plus de précisions sur les adresses mails autorisées dans la question numéro 4*\n\n- 2. entrer le mot de passe reçu par mail\n\nL’authentification de l’agent sur FCE est valable pendant 30 jours.  \nCependant l’historique n’est plus conservé sur nos postes de travail sur Chrome, c’est pourquoi nous suggérons l’utilisation de Mozilla Firefox.  \nIl semble que dans certains départements l’historique ne soit pas conservé non plus sur Mozilla Firefox, dans ce cas une nouvelle authentification sera demandée lors de la connexion.
23	Pourquoi je ne dispose pas d’un mot de passe unique pour accéder à  FCE ?	FCE étant encore développé de manière expérimentale nous mettons en place des solutions techniques à notre portée permettant de répondre aux questions de sécurité d’accès.  \nL’accès par reconnaissance de mails sur une durée de 30 jours permet :\n\n - de garantir le périmètre d’accès, initialement réservé aux agents des Direccte (UD et UR) et désormais aux agents du réseau DREETS, DDETS(PP).\n\n- d’éviter la gestion d’un annuaire utilisateurs avec les départs et arrivées des agents dans les services
24	Est ce que mon accès à FCE sera toujours possible avec ma nouvelle messagerie en DDETS ?	Pour vous connecter au portail FCE vous devez utiliser une adresse mail au format :\n\n- @direccte.gouv.fr\n- @dieccte.gouv.fr\n- @dreets.gouv.fr\n- @drieets.gouv.fr\n- @deets.gouv.fr\n\nLes adresses au format **@département.gouv.fr** utilisées dans les DDETS(PP) ne fonctionnent pas actuellement.\n\nEn effet, l'accès à FCE était initialement réservé aux agents des Direccte UD et UR par reconnaissance de leurs adresses mail.\n\nLe passage en DDI et les changements de mails (@departement.gouv.fr) nous compliquent la tâche car nous ne savons pas identifier les agents relevant des DDETS des autres agents de la préfecture pour lesquels nous ne bénéficions pas d’une autorisation des administrations centrales fournisseuses des données d’accès à FCE.\n\nFCE étant encore développé de manière expérimentale nous mettons en place des solutions techniques à notre portée.  \nCependant, nous étudions avec la DNUM les solutions à moyen terme, mais dans l'immédiat vous devez utiliser votre adresse mail @direccte.gouv.fr sur laquelle une redirection sera maintenue pendant les prochains mois.\n
25	Quels sont les navigateurs web compatibles avec FCE ?	Navigateurs compatibles : Edge, Chrome, Mozilla Firefox et Safari.  \nAttention Internet explorer n’est pas compatible avec FCE\n\nConseils sur vos postes de travail:  \nPrivilégiez les navigateurs Edge ou Mozilla Firefox sur lesquels la gestion des cookies permet de conserver une authentification sur le portail pendant 30 jours.
26	FCE est-il accessible sur smartphone et tablette ?	FCE est accessible depuis n’importe quel terminal à partir du moment ou vous êtes en mesure d’accéder à votre messagerie professionnelle sur laquelle votre mot de passe de connexion est envoyé.  \nA chaque fois que vous changez de terminal ou de navigateur vous devez procéder à une nouvelle authentification.
31	Quelles sont les sources de données de FCE ?	Les données disponibles dans FCE proviennent des différents systèmes d’informations utilisés par les agents et sont mises à disposition par chaque administration centrale compétente :\n\n- DGT:  Wiki’T, D@ccord, SIPSPI\n- DGEFP: RUPCO, APART, SIA, Mes démarches formations \n- DGE: EOS\n- DGCCRf: SORA\n- DINUM via API entreprise : pour les données du RCS, de la DGFIP, de l’Acoss\n\nConsultez la liste exhaustive des données sur cette page :[https://fce.fabrique.social.gouv.fr/sources-des-donnees](https://fce.fabrique.social.gouv.fr/sources-des-donnees)
29	Comment exporter une liste de résultats ?	Après avoir effectué une recherche: \n\n- cliquez sur le bouton  Export Excel situé en haut à droite de la liste des établissements \n- Puis enregistrez le fichier sur votre ordinateur et ouvrez le.\n\nVous trouverez dans le fichier les informations disponibles dans la liste de résultats SIRET, état, raison sociale de l’entreprise +  enseigne de l’établissement, catégorie d’établissement, code postal, secteur d’activité, tranche d’effectif DSN +  l’adresse de l’établissement \n\nL’export est réalisé au format Excel (extension xslx) 
30	Comment imprimer une fiche ou l’enregistrer au format PDF	Pour imprimer les données relatives à un ETABLISSEMENT:\n\n- cliquez sur le bouton “imprimer” en haut de la fiche établissement\n- puis sélectionnez l’imprimante de votre choix  pour une impression papier OU l’option “Microsoft print to PDF” pour enregistrer le document au format PDF sur votre ordinateur\n\nPour imprimer les données relatives à l’ENTREPRISE  :\n\n- allez sur les informations relatives à l’entreprise en cliquant sur le bouton vert “voir la fiche entreprise” en haut à gauche \n- puis cliquez sur le bouton “imprimer” en haut de la fiche relative à l’entreprise\n
37	Comment soutenir l’initiative FCE ?	Faites connaître le portail à vos collègues. Plus vous serez nombreux à l’utiliser, plus nous pourrons le développer et l’améliorer. Merci d’avance !
38	Comment recevoir les dernières actualités du portail FCE ?	Abonnez-vous à notre lettre d’information (page d’accueil ou page “Contact”)
33	Où trouver les informations sur les dirigeants? Les informations légales du RCS ?  Les indicateurs financiers ?	Pensez à consulter la rubrique dédiée à l’entreprise  en cliquant sur le bouton vert en haut à gauche de la fiche de l’établissement : “Voir la fiche entreprise” \n\nVous trouverez des informations légales et administratives relevant de l’entreprise : \n\n- Information générales  : secteur d’activité, forme juridique, siège social, effectif en ETP\n- Informations juridiques : date d’immatriculation et observations notifiées au RCS\n- Données financières : derniers chiffres d’affaires\n- Dirigeants/ Mandataires sociaux\n- Accords d’entreprise déposés par les établissements\n- Mais aussi une vision synthétique des établissements de l’entreprise ayant eu un contrôle, un recours à l’activité partielle, une procédure de licenciement collectif….
34	Où sont hébergées les données FCE ?	Les données sont hébergées sur un serveur Azure (France) géré par la DNUM des ministères sociaux.\nVous pouvez consulter les informations concernant la politique de confidentialité des données sur FCE ici : [https://fce.fabrique.social.gouv.fr/politique-de-confidentialite](https://fce.fabrique.social.gouv.fr/politique-de-confidentialite)
35	Comment signaler un dysfonctionnement du portail à l’équipe FCE ?	Contactez directement l’équipe via la boîte de dialogue du site ou à l’adresse suivante : chloe.mandelblat@dreets.gouv.fr
36	Comment écrire un message à l’équipe FCE ?	Contactez directement l’équipe via la boîte de dialogue du site ou à l’adresse suivante : chloe.mandelblat@dreets.gouv.fr
27	Existe-t-il une application pour smartphone et tablette FCE ?	Non, pas encore.
32	A quelle fréquence sont mises à jour les données FCE ?	Le référentiel entreprise/établissements (base sirène de l’Insee) est actualisé mensuellement dans FCE (le 1er samedi de chaque mois). Nous œuvrons pour une actualisation quotidienne d’ici quelques mois.\nLes données métiers sont mises à jour à des temporalités différentes, pensez à vérifier la source et la date de mise à jour, indiquées à droite de chaque indicateur dans les fiches.\n\nDe manière indicative la mise à jour des données est :\n\n- trimestrielle pour les données PSI\n- mensuelle pour les contrôles du SIT, les visites du Seer\n- bi-mensuelle pour les ruptures collectives et l’activité partielle\n- quotidienne pour les infos du RCS, les dirigeants, le CA \n- ponctuelle (à ce stade) pour les contrôles CCRF et  SRC, et les aides et agréments (politique de l’emploi)\n\nUn description détaillée est disponible sur le site dans la rubrique source de données :  [https://fce.fabrique.social.gouv.fr/sources-des-donnees](https://fce.fabrique.social.gouv.fr/sources-des-donnees)
\.


--
-- Name: components_faq_question_faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.components_faq_question_faqs_id_seq', 38, true);


--
-- Data for Name: components_faq_tuto_videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.components_faq_tuto_videos (id, titre) FROM stdin;
2	Vidéo 1
3	Vidéo 2
\.


--
-- Name: components_faq_tuto_videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.components_faq_tuto_videos_id_seq', 3, true);


--
-- Data for Name: core_store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.core_store (id, key, value, type, environment, tag) FROM stdin;
1	db_model_core_store	{"key":{"type":"string"},"value":{"type":"text"},"type":{"type":"string"},"environment":{"type":"string"},"tag":{"type":"string"}}	object	\N	\N
2	db_model_strapi_webhooks	{"name":{"type":"string"},"url":{"type":"text"},"headers":{"type":"json"},"events":{"type":"json"},"enabled":{"type":"boolean"}}	object	\N	\N
3	db_model_users-permissions_permission	{"type":{"type":"string","required":true,"configurable":false},"controller":{"type":"string","required":true,"configurable":false},"action":{"type":"string","required":true,"configurable":false},"enabled":{"type":"boolean","required":true,"configurable":false},"policy":{"type":"string","configurable":false},"role":{"model":"role","via":"permissions","plugin":"users-permissions","configurable":false}}	object	\N	\N
4	db_model_upload_file	{"name":{"type":"string","configurable":false,"required":true},"alternativeText":{"type":"string","configurable":false},"caption":{"type":"string","configurable":false},"width":{"type":"integer","configurable":false},"height":{"type":"integer","configurable":false},"formats":{"type":"json","configurable":false},"hash":{"type":"string","configurable":false,"required":true},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"decimal","configurable":false,"required":true},"url":{"type":"string","configurable":false,"required":true},"previewUrl":{"type":"string","configurable":false},"provider":{"type":"string","configurable":false,"required":true},"provider_metadata":{"type":"json","configurable":false},"related":{"collection":"*","filter":"field","configurable":false},"created_at":{"type":"currentTimestamp"},"updated_at":{"type":"currentTimestamp"}}	object	\N	\N
5	db_model_strapi_administrator	{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"password":{"type":"password","minLength":6,"configurable":false,"private":true,"required":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"blocked":{"type":"boolean","default":false,"configurable":false}}	object	\N	\N
6	db_model_users-permissions_user	{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"model":"role","via":"users","plugin":"users-permissions","configurable":false},"created_at":{"type":"currentTimestamp"},"updated_at":{"type":"currentTimestamp"}}	object	\N	\N
7	db_model_users-permissions_role	{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"collection":"permission","via":"role","plugin":"users-permissions","configurable":false,"isVirtual":true},"users":{"collection":"user","via":"role","configurable":false,"plugin":"users-permissions","isVirtual":true}}	object	\N	\N
8	db_model_upload_file_morph	{"upload_file_id":{"type":"integer"},"related_id":{"type":"integer"},"related_type":{"type":"text"},"field":{"type":"text"},"order":{"type":"integer"}}	object	\N	\N
10	plugin_upload_settings	{"sizeOptimization":true,"responsiveDimensions":true}	object	production	
11	plugin_content_manager_configuration_content_types::plugins::users-permissions.permission	{"uid":"plugins::users-permissions.permission","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"type","defaultSortBy":"type","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"type":{"edit":{"label":"Type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Type","searchable":true,"sortable":true}},"controller":{"edit":{"label":"Controller","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Controller","searchable":true,"sortable":true}},"action":{"edit":{"label":"Action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Action","searchable":true,"sortable":true}},"enabled":{"edit":{"label":"Enabled","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Enabled","searchable":true,"sortable":true}},"policy":{"edit":{"label":"Policy","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Policy","searchable":true,"sortable":true}},"role":{"edit":{"label":"Role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Role","searchable":false,"sortable":false}}},"layouts":{"list":["id","type","controller","action"],"editRelations":["role"],"edit":[[{"name":"type","size":6},{"name":"controller","size":6}],[{"name":"action","size":6},{"name":"enabled","size":4}],[{"name":"policy","size":6}]]}}	object		
13	plugin_content_manager_configuration_content_types::plugins::upload.file	{"uid":"plugins::upload.file","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"alternativeText":{"edit":{"label":"AlternativeText","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"AlternativeText","searchable":true,"sortable":true}},"caption":{"edit":{"label":"Caption","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Caption","searchable":true,"sortable":true}},"width":{"edit":{"label":"Width","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Width","searchable":true,"sortable":true}},"height":{"edit":{"label":"Height","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Height","searchable":true,"sortable":true}},"formats":{"edit":{"label":"Formats","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Formats","searchable":false,"sortable":false}},"hash":{"edit":{"label":"Hash","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Hash","searchable":true,"sortable":true}},"ext":{"edit":{"label":"Ext","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Ext","searchable":true,"sortable":true}},"mime":{"edit":{"label":"Mime","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Mime","searchable":true,"sortable":true}},"size":{"edit":{"label":"Size","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Size","searchable":true,"sortable":true}},"url":{"edit":{"label":"Url","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Url","searchable":true,"sortable":true}},"previewUrl":{"edit":{"label":"PreviewUrl","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"PreviewUrl","searchable":true,"sortable":true}},"provider":{"edit":{"label":"Provider","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Provider","searchable":true,"sortable":true}},"provider_metadata":{"edit":{"label":"Provider_metadata","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Provider_metadata","searchable":false,"sortable":false}},"related":{"edit":{"label":"Related","description":"","placeholder":"","visible":true,"editable":true,"mainField":"id"},"list":{"label":"Related","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","alternativeText","caption"],"editRelations":["related"],"edit":[[{"name":"name","size":6},{"name":"alternativeText","size":6}],[{"name":"caption","size":6},{"name":"width","size":4}],[{"name":"height","size":4}],[{"name":"formats","size":12}],[{"name":"hash","size":6},{"name":"ext","size":6}],[{"name":"mime","size":6},{"name":"size","size":4}],[{"name":"url","size":6},{"name":"previewUrl","size":6}],[{"name":"provider","size":6}],[{"name":"provider_metadata","size":12}]]}}	object		
12	plugin_content_manager_configuration_content_types::plugins::users-permissions.role	{"uid":"plugins::users-permissions.role","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"description":{"edit":{"label":"Description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Description","searchable":true,"sortable":true}},"type":{"edit":{"label":"Type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Type","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"Permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"type"},"list":{"label":"Permissions","searchable":false,"sortable":false}},"users":{"edit":{"label":"Users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"username"},"list":{"label":"Users","searchable":false,"sortable":false}}},"layouts":{"list":["id","name","description","type"],"editRelations":["permissions","users"],"edit":[[{"name":"name","size":6},{"name":"description","size":6}],[{"name":"type","size":6}]]}}	object		
15	plugin_content_manager_configuration_content_types::plugins::users-permissions.user	{"uid":"plugins::users-permissions.user","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"username","defaultSortBy":"username","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"username":{"edit":{"label":"Username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Username","searchable":true,"sortable":true}},"email":{"edit":{"label":"Email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Email","searchable":true,"sortable":true}},"provider":{"edit":{"label":"Provider","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Provider","searchable":true,"sortable":true}},"password":{"edit":{"label":"Password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"ResetPasswordToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"ResetPasswordToken","searchable":true,"sortable":true}},"confirmed":{"edit":{"label":"Confirmed","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Confirmed","searchable":true,"sortable":true}},"blocked":{"edit":{"label":"Blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Blocked","searchable":true,"sortable":true}},"role":{"edit":{"label":"Role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Role","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","username","email","confirmed"],"editRelations":["role"],"edit":[[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6},{"name":"confirmed","size":4}],[{"name":"blocked","size":4}]]}}	object		
16	plugin_users-permissions_email	{"reset_password":{"display":"Email.template.reset_password","icon":"sync","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Reset password","message":"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>"}},"email_confirmation":{"display":"Email.template.email_confirmation","icon":"check-square","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Account confirmation","message":"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>"}}}	object		
17	plugin_users-permissions_advanced	{"unique_email":true,"allow_register":true,"email_confirmation":false,"email_confirmation_redirection":"/admin/admin","email_reset_password":"/admin/admin","default_role":"authenticated"}	object		
18	plugin_upload_settings	{"sizeOptimization":true,"responsiveDimensions":true}	object	development	
19	db_model_pages	{"titre":{"type":"string","required":true,"unique":true},"contenu":{"type":"richtext"},"created_at":{"type":"currentTimestamp"},"updated_at":{"type":"currentTimestamp"}}	object	\N	\N
21	plugin_content_manager_configuration_content_types::application::page.page	{"uid":"application::page.page","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"titre","defaultSortBy":"titre","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"titre":{"edit":{"label":"Titre","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Titre","searchable":true,"sortable":true}},"contenu":{"edit":{"label":"Contenu","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Contenu","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","titre","created_at","updated_at"],"editRelations":[],"edit":[[{"name":"titre","size":6}],[{"name":"contenu","size":12}]]}}	object		
22	model_def_strapi::core-store	{"uid":"strapi::core-store","collectionName":"core_store","info":{"name":"core_store","description":""},"options":{"timestamps":false},"attributes":{"key":{"type":"string"},"value":{"type":"text"},"type":{"type":"string"},"environment":{"type":"string"},"tag":{"type":"string"}}}	object	\N	\N
23	model_def_application::page.page	{"uid":"application::page.page","collectionName":"pages","kind":"collectionType","info":{"name":"page"},"options":{"increments":true,"timestamps":["created_at","updated_at"]},"attributes":{"titre":{"type":"string","required":true,"unique":true},"contenu":{"type":"richtext"},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true}}}	object	\N	\N
24	model_def_strapi::webhooks	{"uid":"strapi::webhooks","collectionName":"strapi_webhooks","info":{"name":"Strapi webhooks","description":""},"options":{"timestamps":false},"attributes":{"name":{"type":"string"},"url":{"type":"text"},"headers":{"type":"json"},"events":{"type":"json"},"enabled":{"type":"boolean"}}}	object	\N	\N
25	model_def_strapi::permission	{"uid":"strapi::permission","collectionName":"strapi_permission","kind":"collectionType","info":{"name":"Permission","description":""},"options":{"timestamps":["created_at","updated_at"]},"attributes":{"action":{"type":"string","minLength":1,"configurable":false,"required":true},"subject":{"type":"string","minLength":1,"configurable":false,"required":false},"fields":{"type":"json","configurable":false,"required":false,"default":[]},"conditions":{"type":"json","configurable":false,"required":false,"default":[]},"role":{"configurable":false,"model":"role","plugin":"admin"}}}	object	\N	\N
26	model_def_strapi::role	{"uid":"strapi::role","collectionName":"strapi_role","kind":"collectionType","info":{"name":"Role","description":""},"options":{"timestamps":["created_at","updated_at"]},"attributes":{"name":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"code":{"type":"string","minLength":1,"unique":true,"configurable":false,"required":true},"description":{"type":"string","configurable":false},"users":{"configurable":false,"collection":"user","via":"roles","plugin":"admin","attribute":"user","column":"id","isVirtual":true},"permissions":{"configurable":false,"plugin":"admin","collection":"permission","via":"role","isVirtual":true}}}	object	\N	\N
27	model_def_strapi::user	{"uid":"strapi::user","collectionName":"strapi_administrator","kind":"collectionType","info":{"name":"User","description":""},"options":{"timestamps":false},"attributes":{"firstname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"lastname":{"type":"string","unique":false,"minLength":1,"configurable":false,"required":false},"username":{"type":"string","unique":false,"configurable":false,"required":false},"email":{"type":"email","minLength":6,"configurable":false,"required":true,"unique":true,"private":true},"password":{"type":"password","minLength":6,"configurable":false,"required":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"registrationToken":{"type":"string","configurable":false,"private":true},"isActive":{"type":"boolean","default":false,"configurable":false,"private":true},"roles":{"collection":"role","collectionName":"strapi_users_roles","via":"users","dominant":true,"plugin":"admin","configurable":false,"private":true,"attribute":"role","column":"id","isVirtual":true},"blocked":{"type":"boolean","default":false,"configurable":false,"private":true}}}	object	\N	\N
28	model_def_plugins::upload.file	{"uid":"plugins::upload.file","collectionName":"upload_file","kind":"collectionType","info":{"name":"file","description":""},"options":{"timestamps":["created_at","updated_at"]},"attributes":{"name":{"type":"string","configurable":false,"required":true},"alternativeText":{"type":"string","configurable":false},"caption":{"type":"string","configurable":false},"width":{"type":"integer","configurable":false},"height":{"type":"integer","configurable":false},"formats":{"type":"json","configurable":false},"hash":{"type":"string","configurable":false,"required":true},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"decimal","configurable":false,"required":true},"url":{"type":"string","configurable":false,"required":true},"previewUrl":{"type":"string","configurable":false},"provider":{"type":"string","configurable":false,"required":true},"provider_metadata":{"type":"json","configurable":false},"related":{"collection":"*","filter":"field","configurable":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true}}}	object	\N	\N
29	model_def_plugins::users-permissions.permission	{"uid":"plugins::users-permissions.permission","collectionName":"users-permissions_permission","kind":"collectionType","info":{"name":"permission","description":""},"options":{"timestamps":false},"attributes":{"type":{"type":"string","required":true,"configurable":false},"controller":{"type":"string","required":true,"configurable":false},"action":{"type":"string","required":true,"configurable":false},"enabled":{"type":"boolean","required":true,"configurable":false},"policy":{"type":"string","configurable":false},"role":{"model":"role","via":"permissions","plugin":"users-permissions","configurable":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true}}}	object	\N	\N
9	plugin_users-permissions_grant	{"email":{"enabled":true,"icon":"envelope"},"discord":{"enabled":false,"icon":"discord","key":"","secret":"","callback":"/auth/discord/callback","scope":["identify","email"]},"facebook":{"enabled":false,"icon":"facebook-square","key":"","secret":"","callback":"/auth/facebook/callback","scope":["email"]},"google":{"enabled":false,"icon":"google","key":"","secret":"","callback":"/auth/google/callback","scope":["email"]},"github":{"enabled":false,"icon":"github","key":"","secret":"","callback":"/auth/github/callback","scope":["user","user:email"]},"microsoft":{"enabled":false,"icon":"windows","key":"","secret":"","callback":"/auth/microsoft/callback","scope":["user.read"]},"twitter":{"enabled":false,"icon":"twitter","key":"","secret":"","callback":"/auth/twitter/callback"},"instagram":{"enabled":false,"icon":"instagram","key":"","secret":"","callback":"/auth/instagram/callback"},"vk":{"enabled":false,"icon":"vk","key":"","secret":"","callback":"/auth/vk/callback","scope":["email"]},"twitch":{"enabled":false,"icon":"twitch","key":"","secret":"","callback":"/auth/twitch/callback","scope":["user:read:email"]},"linkedin":{"enabled":false,"icon":"linkedin","key":"","secret":"","callback":"/auth/linkedin/callback","scope":["r_liteprofile","r_emailaddress"]},"cognito":{"enabled":false,"icon":"aws","key":"","secret":"","subdomain":"my.subdomain.com","callback":"/auth/cognito/callback","scope":["email","openid","profile"]}}	object		
33	plugin_content_manager_configuration_content_types::strapi::role	{"uid":"strapi::role","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"code":{"edit":{"label":"Code","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Code","searchable":true,"sortable":true}},"description":{"edit":{"label":"Description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Description","searchable":true,"sortable":true}},"users":{"edit":{"label":"Users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"firstname"},"list":{"label":"Users","searchable":false,"sortable":false}},"permissions":{"edit":{"label":"Permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"action"},"list":{"label":"Permissions","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","code","description"],"editRelations":["users","permissions"],"edit":[[{"name":"name","size":6},{"name":"code","size":6}],[{"name":"description","size":6}]]}}	object		
30	model_def_plugins::users-permissions.role	{"uid":"plugins::users-permissions.role","collectionName":"users-permissions_role","kind":"collectionType","info":{"name":"role","description":""},"options":{"timestamps":false},"attributes":{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"collection":"permission","via":"role","plugin":"users-permissions","configurable":false,"isVirtual":true},"users":{"collection":"user","via":"role","configurable":false,"plugin":"users-permissions","isVirtual":true},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true}}}	object	\N	\N
31	model_def_plugins::users-permissions.user	{"uid":"plugins::users-permissions.user","collectionName":"users-permissions_user","kind":"collectionType","info":{"name":"user","description":""},"options":{"draftAndPublish":false,"timestamps":["created_at","updated_at"]},"attributes":{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"model":"role","via":"users","plugin":"users-permissions","configurable":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true}}}	object	\N	\N
32	plugin_content_manager_configuration_content_types::strapi::permission	{"uid":"strapi::permission","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"action","defaultSortBy":"action","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"action":{"edit":{"label":"Action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Action","searchable":true,"sortable":true}},"subject":{"edit":{"label":"Subject","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Subject","searchable":true,"sortable":true}},"fields":{"edit":{"label":"Fields","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Fields","searchable":false,"sortable":false}},"conditions":{"edit":{"label":"Conditions","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Conditions","searchable":false,"sortable":false}},"role":{"edit":{"label":"Role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Role","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","action","subject","created_at"],"editRelations":["role"],"edit":[[{"name":"action","size":6},{"name":"subject","size":6}],[{"name":"fields","size":12}],[{"name":"conditions","size":12}]]}}	object		
34	plugin_content_manager_configuration_content_types::strapi::user	{"uid":"strapi::user","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"firstname","defaultSortBy":"firstname","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"firstname":{"edit":{"label":"Firstname","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Firstname","searchable":true,"sortable":true}},"lastname":{"edit":{"label":"Lastname","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Lastname","searchable":true,"sortable":true}},"username":{"edit":{"label":"Username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Username","searchable":true,"sortable":true}},"email":{"edit":{"label":"Email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Email","searchable":true,"sortable":true}},"password":{"edit":{"label":"Password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"ResetPasswordToken","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"ResetPasswordToken","searchable":true,"sortable":true}},"registrationToken":{"edit":{"label":"RegistrationToken","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"RegistrationToken","searchable":true,"sortable":true}},"isActive":{"edit":{"label":"IsActive","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"IsActive","searchable":true,"sortable":true}},"roles":{"edit":{"label":"Roles","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Roles","searchable":false,"sortable":false}},"blocked":{"edit":{"label":"Blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Blocked","searchable":true,"sortable":true}}},"layouts":{"list":["id","firstname","lastname","username"],"editRelations":["roles"],"edit":[[{"name":"firstname","size":6},{"name":"lastname","size":6}],[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6},{"name":"resetPasswordToken","size":6}],[{"name":"registrationToken","size":6},{"name":"isActive","size":4}],[{"name":"blocked","size":4}]]}}	object		
35	model_def_faq.question-faq	{"uid":"faq.question-faq","collectionName":"components_faq_question_faqs","info":{"name":"question FAQ","icon":"info-circle","description":""},"options":{"timestamps":false},"attributes":{"question":{"type":"richtext","required":true},"reponse":{"type":"richtext","required":true}}}	object	\N	\N
36	plugin_content_manager_configuration_components::faq.question-faq	{"uid":"faq.question-faq","isComponent":true,"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"question":{"edit":{"label":"Question","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Question","searchable":false,"sortable":false}},"reponse":{"edit":{"label":"Reponse","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Reponse","searchable":false,"sortable":false}}},"layouts":{"list":["id"],"edit":[[{"name":"question","size":12}],[{"name":"reponse","size":12}]],"editRelations":[]}}	object		
37	model_def_application::section-faq.section-faq	{"uid":"application::section-faq.section-faq","collectionName":"faq-sections","kind":"collectionType","info":{"name":"faq section","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"attributes":{"Titre":{"type":"string","required":true},"liste_de_questions":{"type":"dynamiczone","components":["faq.question-faq"]},"published_at":{"type":"datetime","configurable":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true}}}	object	\N	\N
43	plugin_content_manager_configuration_content_types::application::faq.faq	{"uid":"application::faq.faq","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"id","defaultSortBy":"id","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"faq_sections":{"edit":{"label":"Faq_sections","description":"","placeholder":"","visible":true,"editable":true,"mainField":"Titre"},"list":{"label":"Faq_sections","searchable":false,"sortable":false}},"faq_tutos_videos":{"edit":{"label":"Faq_tutos_videos","description":"","placeholder":"","visible":true,"editable":true,"mainField":"titre"},"list":{"label":"Faq_tutos_videos","searchable":false,"sortable":false}},"published_at":{"edit":{"label":"Published_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Published_at","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","published_at","created_at","updated_at"],"edit":[],"editRelations":["faq_sections","faq_tutos_videos"]}}	object		
41	plugin_content_manager_configuration_content_types::application::faq-section.faq-section	{"uid":"application::faq-section.faq-section","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"Titre","defaultSortBy":"Titre","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"Titre":{"edit":{"label":"Titre","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Titre","searchable":true,"sortable":true}},"questions":{"edit":{"label":"Questions","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Questions","searchable":false,"sortable":false}},"published_at":{"edit":{"label":"Published_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Published_at","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","Titre","published_at","created_at"],"edit":[[{"name":"Titre","size":6}],[{"name":"questions","size":12}]],"editRelations":[]}}	object		
44	model_def_faq.tuto-video	{"uid":"faq.tuto-video","collectionName":"components_faq_tuto_videos","info":{"name":"Tuto vidéo","icon":"play-circle"},"options":{"timestamps":false},"attributes":{"titre":{"type":"string","required":true},"video":{"model":"file","via":"related","allowedTypes":["files","images","videos"],"plugin":"upload","required":true}}}	object	\N	\N
40	model_def_application::faq-section.faq-section	{"uid":"application::faq-section.faq-section","collectionName":"faq_sections","kind":"collectionType","info":{"name":"FAQ Section","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"attributes":{"Titre":{"type":"string","required":true},"questions":{"type":"dynamiczone","components":["faq.question-faq"]},"published_at":{"type":"datetime","configurable":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true}}}	object	\N	\N
46	model_def_application::faq-tutos-video.faq-tutos-video	{"uid":"application::faq-tutos-video.faq-tutos-video","collectionName":"faq_tutos_videos","kind":"collectionType","info":{"name":"FAQ Tutos vidéo"},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"attributes":{"titre":{"type":"string","required":true},"video":{"type":"dynamiczone","components":["faq.tuto-video"],"required":true},"published_at":{"type":"datetime","configurable":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true}}}	object	\N	\N
42	model_def_application::faq.faq	{"uid":"application::faq.faq","collectionName":"faqs","kind":"singleType","info":{"name":"FAQ","description":""},"options":{"increments":true,"timestamps":["created_at","updated_at"],"draftAndPublish":true},"attributes":{"faq_sections":{"collection":"faq-section","attribute":"faq-section","column":"id","isVirtual":true},"faq_tutos_videos":{"collection":"faq-tutos-video","attribute":"faq-tutos-video","column":"id","isVirtual":true},"published_at":{"type":"datetime","configurable":false},"created_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true},"updated_by":{"model":"user","plugin":"admin","configurable":false,"writable":false,"private":true}}}	object	\N	\N
45	plugin_content_manager_configuration_components::faq.tuto-video	{"uid":"faq.tuto-video","isComponent":true,"settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"titre","defaultSortBy":"titre","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":false,"sortable":false}},"titre":{"edit":{"label":"Titre","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Titre","searchable":true,"sortable":true}},"video":{"edit":{"label":"Video","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Video","searchable":false,"sortable":false}}},"layouts":{"list":["id","titre","video"],"edit":[[{"name":"titre","size":6},{"name":"video","size":6}]],"editRelations":[]}}	object		
47	plugin_content_manager_configuration_content_types::application::faq-tutos-video.faq-tutos-video	{"uid":"application::faq-tutos-video.faq-tutos-video","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"titre","defaultSortBy":"titre","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"titre":{"edit":{"label":"Titre","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Titre","searchable":true,"sortable":true}},"video":{"edit":{"label":"Video","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Video","searchable":false,"sortable":false}},"published_at":{"edit":{"label":"Published_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Published_at","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","titre","published_at","created_at"],"editRelations":[],"edit":[[{"name":"titre","size":6}],[{"name":"video","size":12}]]}}	object		
\.


--
-- Name: core_store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.core_store_id_seq', 47, true);


--
-- Data for Name: faq-sections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."faq-sections" (id, "Titre", published_at, created_by, updated_by, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: faq-sections_components; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."faq-sections_components" (id, field, "order", component_type, component_id, "faq-section_id") FROM stdin;
\.


--
-- Name: faq-sections_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."faq-sections_components_id_seq"', 1, false);


--
-- Name: faq-sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."faq-sections_id_seq"', 1, false);


--
-- Data for Name: faq_sections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faq_sections (id, "Titre", published_at, created_by, updated_by, created_at, updated_at) FROM stdin;
3	FONCTIONNALITÉS : exporter / imprimer	2021-04-22 20:03:46.407+00	1	1	2021-04-22 20:03:43.169+00	2021-04-22 20:07:37.556+00
5	QUESTIONS / CONTACTS	2021-04-22 20:14:05.518+00	1	1	2021-04-22 20:14:03.673+00	2021-04-22 20:14:05.537+00
6	COMMUNIQUER / SOUTENIR	2021-04-22 20:15:12.892+00	1	1	2021-04-22 20:15:10.932+00	2021-04-22 20:15:12.911+00
2	ACCÈS	2021-04-22 19:48:16.695+00	1	1	2021-04-22 19:47:17.432+00	2021-04-23 08:51:46.707+00
4	LES DONNÉES	2021-04-22 20:10:56.781+00	1	1	2021-04-22 20:10:48.076+00	2021-04-26 10:22:00.123+00
\.


--
-- Data for Name: faq_sections_components; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faq_sections_components (id, field, "order", component_type, component_id, faq_section_id) FROM stdin;
29	questions	1	components_faq_question_faqs	31	4
30	questions	2	components_faq_question_faqs	32	4
31	questions	3	components_faq_question_faqs	33	4
32	questions	4	components_faq_question_faqs	34	4
27	questions	1	components_faq_question_faqs	29	3
28	questions	2	components_faq_question_faqs	30	3
33	questions	1	components_faq_question_faqs	35	5
34	questions	2	components_faq_question_faqs	36	5
35	questions	1	components_faq_question_faqs	37	6
36	questions	2	components_faq_question_faqs	38	6
2	questions	1	components_faq_question_faqs	4	2
20	questions	2	components_faq_question_faqs	22	2
21	questions	3	components_faq_question_faqs	23	2
22	questions	4	components_faq_question_faqs	24	2
23	questions	5	components_faq_question_faqs	25	2
24	questions	6	components_faq_question_faqs	26	2
25	questions	7	components_faq_question_faqs	27	2
\.


--
-- Name: faq_sections_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faq_sections_components_id_seq', 36, true);


--
-- Name: faq_sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faq_sections_id_seq', 6, true);


--
-- Data for Name: faq_tutos_videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faq_tutos_videos (id, titre, published_at, created_by, updated_by, created_at, updated_at) FROM stdin;
2	Vidéo 2	2021-04-26 09:08:30.985+00	1	1	2021-04-26 09:08:22.241+00	2021-04-26 09:08:31.017+00
1	Vidéo 1	2021-04-26 09:08:36.476+00	1	1	2021-04-26 09:05:51.903+00	2021-04-26 09:08:36.502+00
\.


--
-- Data for Name: faq_tutos_videos_components; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faq_tutos_videos_components (id, field, "order", component_type, component_id, faq_tutos_video_id) FROM stdin;
2	video	1	components_faq_tuto_videos	2	1
3	video	1	components_faq_tuto_videos	3	2
\.


--
-- Name: faq_tutos_videos_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faq_tutos_videos_components_id_seq', 3, true);


--
-- Name: faq_tutos_videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faq_tutos_videos_id_seq', 2, true);


--
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faqs (id, published_at, created_by, updated_by, created_at, updated_at) FROM stdin;
1	2021-04-22 20:18:35.312+00	1	1	2021-04-22 20:18:30.35+00	2021-04-26 09:08:57.404+00
\.


--
-- Data for Name: faqs__faq_sections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faqs__faq_sections (id, faq_id, "faq-section_id") FROM stdin;
1	1	2
2	1	3
3	1	4
4	1	5
5	1	6
\.


--
-- Name: faqs__faq_sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faqs__faq_sections_id_seq', 5, true);


--
-- Data for Name: faqs__faq_tutos_videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faqs__faq_tutos_videos (id, faq_id, "faq-tutos-video_id") FROM stdin;
1	1	1
2	1	2
\.


--
-- Name: faqs__faq_tutos_videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faqs__faq_tutos_videos_id_seq', 2, true);


--
-- Data for Name: faqs_components; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faqs_components (id, field, "order", component_type, component_id, faq_id) FROM stdin;
\.


--
-- Name: faqs_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faqs_components_id_seq', 1, false);


--
-- Name: faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faqs_id_seq', 1, true);


--
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pages (id, titre, contenu, created_at, updated_at, created_by, updated_by) FROM stdin;
1	A propos	## FCE c'est quoi ?\n\n**L'état civil, l'activité et les données de l'administration dans une seule fiche destinée aux agents publics**\n\nFCE est un portail pour faciliter l’accès aux informations disponibles sur les entreprises et les échanges entre services.\nDéveloppé dans le cadre d’une startup d’Etat de [l’incubateur des ministères sociaux](https://incubateur.social.gouv.fr/startups/fce) le portail FCE offre une vue à 360° de l’entreprise et de ses établissements en rassemblant :\n\n- les données publiques sur l’identité et l’activité des entreprises\n- les données « métier » issues de l’activité des services de la Direccte\n\nIl s’agit d’un site qui a vocation à évoluer et s’enrichir selon vos retours.\nN’hésitez pas à nous faire part de vos besoins, vos attentes et vos satisfactions\n\n## Le constat \n\nLes agents des Direccte(s) interviennent dans la vie des entreprises sur des champs variés (travail, développement économique, protection des consommateurs) et pour des motifs différents qui peuvent parfois être contradictoires: contrôle, accompagnement ou aide financière. Par exemple, un agent peut intervenir auprès d’une entreprise pour s’assurer du respect de la durée légale du travail, alors qu’un autre vérifie l’application des règles liées à la concurrence et qu’un troisième lui octroie un financement pour favoriser le développement de l’emploi.\n\nLa multiplicité des systèmes d’information, des administrations de tutelle et le fonctionnement vertical des services ne permet pas toujours aux agents des Direccte de connaître les contrôles effectués ou les aides attribuées par leurs collègues.\n\n## Les conséquences\n\n####  Pour les agents des Direccte :\n\n- Perte de temps et d’efficacité dans la préparation des interventions\n- Perte de temps dans la restitution des actions menées\n- Allocations d’aides inadéquates\n\n####  Pour les entreprises :\n\nDes  contrôles non coordonnés et/ou actions contradictoires\n\n####  Pour l’action publique :\n\nUne image dégradée auprès des entreprises\n\n## Les gains attendus\n\n#### Faciliter les échanges entre service :\n\nSavoir qui dispose d’informations sur une entreprise afin d’orienter utilement ses demandes.\n\n#### Ajuster  les actions auprès des entreprises :\n\nDisposer d’une vision complète des relations entre la Direccte et les entreprises pour agir en connaissance de cause (report / annulation d’un contrôle, ajournement ou activation d’une aide financière ou d’un accompagnement...).\n\n#### Restituer de l’information aux décideurs :\n\nRestituer à un décideur (Préfet, Ministre….), en un minimum de temps, une fiche synthétique sur les (inter)actions menées par les services auprès d’une entreprise.\n\n## Et une startup d'État c’est quoi ?\n\nUne Startup d’État est une équipe dédiée et autonome qui développe une solution numérique à un problème de politique publique.\n\nElle naît de l’identification d’un problème rencontré par les citoyens ou les agents publics\nElle est financée par une administration porteuse qui lui garantit un espace de liberté pour innover : un incubateur.\n\nElle est constituée de :\n- un intrapreneur / chef de produit (un agent public) qui repère un irritant et propose et teste une solution en lien avec les utilisateurs\n- un coach qui apporte son savoir-faire en design de services numériques\n- un ou plusieurs  développeurs qui conçoivent le produit\n\n## L’équipe de FCE\n\nIntrapreneur / chef de produit : Chloé MANDELBLAT – Direccte Occitanie\n\nCo chef de Produit : Pierre VERCAUTEREN - DNUM SG MAS\n\nDéveloppeurs : [Commit 42](https://www.commit42.com/) - Studio d'innovation web - Toulouse\n\nUser experience : Romy - [Octo](https://www.octo.com/)\n\nUser Interface : Fabien - [Octo](https://www.octo.com/)\n	2020-06-30 10:16:02.706+00	2020-06-30 10:16:02.706+00	\N	\N
2	Conditions générales d'utilisation	## Sources de données\n\nFiche Commune Entreprise propose une vue consolidée de différentes sources de données :\n\n- API-Entreprise qui est une plateforme d’échange opérée par la DINSIC qui met à disposition des opérateurs publics et des administrations, des données et des documents administratifs de référence, relatifs aux entreprises et association, qui sont délivrés par les administrations et les organismes publics, à fin de simplifier les démarches administratives et la gestion des dossiers.\n- API-Sirene qui donne accès aux informations concernant les entreprises et les établissements immatriculés au répertoire interadministratif « Sirene » depuis sa création en 1973. Ces données sont disponibles sous licence ouverte. Conformément à l’engagement signé avec l’INSEE, Fiche Commune Entreprise s’engage à :\n    - N’utiliser ces informations qu’à la satisfaction de ses besoins propres et internes, et à ne pas les rediffuser ni les divulguer.\n    - Assurer une publicité, par la présente mention, et un suivi de ces conditions d’utilisation auprès de l’ensemble des agents ayant accès au référentiel, qu’ils soient en service central ou en service déconcentré.\n- Wiki’T\n- SORA\n- EOS\n- D@CCORD\n- DARES : IAE, contrats aidés\n\n## Liens externes\n\nCe site met à disposition des liens pouvant orienter l’utilisateur vers des sites réalisés par des tiers extérieurs. Ces tiers sont les seuls responsables du contenu de ces sites. L’équipe Fiche Commune Entreprise n’a aucun contrôle sur le contenu de ces sites, ces contenus ne sauraient engager la responsabilité du ministère.\n\n## Contact\n\nVous pouvez contacter l’équipe qui réalise ce service à l’adresse suivante : DSI-incubateur@sg.social.gouv.fr  ou par voie postale :\n\nDirection des systèmes d’information<br/>\nMinistère des affaires sociales et de la santé<br/>\n39-43 Quai André Citroën<br/>\n75015 PARIS\n\n## Accessibilité\n\nLa conformité aux normes d’accessibilité numérique est un objectif ultérieur mais nous tâchons de rendre ce site accessible à toutes et à tous.\n\nSignaler un dysfonctionnement : Si vous rencontrez un défaut d'accessibilité vous empêchant d'accéder à un contenu ou une fonctionnalité du site, merci de nous en faire part.\n\nSi vous n'obtenez pas de réponse rapide de notre part, vous êtes en droit de faire parvenir vos doléances ou une demande de saisine au Défenseur des droits.\n\nEn savoir plus : Pour en savoir plus sur la politique d'accessibilité numérique de l'État : http://references.modernisation.gouv.fr/accessibilite-numerique\n\n## Sécurité\n\nLe site est protégé par un certificat électronique, matérialisé pour la grande majorité des navigateurs par un cadenas. Cette protection participe à la confidentialité des échanges.\n\nEn aucun cas les services associés à la plateforme ne seront à l’origine d’envoi de courriels pour demander la saisie d’informations personnelles.\n	2020-06-30 10:16:27.74+00	2020-07-06 10:15:38.737+00	\N	\N
3	FCE - Les données	## Vue d'ensemble des fournisseurs de données :\n\nCi-dessous, une ligne par source de données.\nChaque source est détaillée par la suite.\n\n|Organisme|Système d'information|Description|\n|--|--|--|\n|INSEE|SIRENE|Répertoire des données Entreprises et Etablissements |\n|DINUM|API Entreprise / DCS|Données du RNA sur les associations   |\n|DINUM|API Entreprise / Infogreffe |Données RNCS (mandataires sociaux, observations RCS , immatriculation  |\n|DINUM|API Entreprise / DGFIP|chiffres d'affaires  |\n|DINUM|API Entreprise / ACOSS|Effectifs ETP  |\n|DNUM| Ministères sociaux|DSN|Effectifs salariés|\n|DNUM Ministères sociaux|DSN|Conventions Collectives|\n|DGT|WIKI'T|Contrôles de l'inspection de travail|\n|DGT|SIPSI|Prestation de Service Internationale|\n|DGCCRF|SORA|Contrôles CCRF (consommation concurrence et  répression de fraudes|\n|DGEFP|MDF|ntroes des SRC (Services régionaux de contrôles de la formation professionnelle)  a|\n|DGE|EOS|Visites des SEER (Service économique de l'Etat en région) |\n|DGT|DACCORD|Accords d'entreprise|\n|DGEFP|RUPCO|Ruptures collectives (PSE et RCC)|\n|DGEFP|APART|Activité partielle|\n|DGEFP|ARIANE| Apprentissage|\n|DGEFP|Extrapro |Contrat de professionnalisation|\n\nLes données  nomenclatures utilisées :\n\n|Organisme|Nomenclature|Description|\n|--|--|--|\n|INSEE|COG|Départements. [Lien COG - INSEE](https://www.insee.fr/fr/information/3720946)|\n|INSEE|COG|Communes. [Lien COG - INSEE](https://www.insee.fr/fr/information/3720946)|\n|INSEE|Cat Jur|Catégorie juridique des entreprises. [Lien CatJur - INSEE](https://www.insee.fr/fr/information/2028129)|\n|INSEE|NAF|Activité des entreprises. [Lien NAF - INSEE](https://www.insee.fr/fr/information/2120875)|\n|DGT|IDCC|Identifiant des conventions collectives. [Lien IDCC -DGT](https://travail-emploi.gouv.fr/dialogue-social/negociation-collective/article/conventions-collectives-nomenclatures)|\n|DGT|UC|Unité de contrôle de Travail|\n\n\n---\n\n## INSEE - Base SIRENE - Données Entreprises :\n\n- Fréquence : mensuelle\n- Volume : 30 millions de lignes\n\n|Nom|Libellé|Longueur|Type|\n|--|--|--|--|\n|siren|Numéro Siren|9|Texte|\n|statutDiffusionUniteLegale|Statut de diffusion de l’unité légale|1|Liste de codes|\n|unitePurgeeUniteLegale|Unité légale purgée|5|Texte|\n|dateCreationUniteLegale|Date de création de l'unité légale|10|Date|\n|sigleUniteLegale|Sigle de l’unité légale|20|Texte|\n|sexeUniteLegale|Caractère féminin ou masculin de la personne physique|1|Liste de codes|\n|prenom1UniteLegale|Premier prénom déclaré pour un personne physique|20|Texte|\n|prenom2UniteLegale|Deuxième prénom déclaré pour un personne physique|20|Texte|\n|prenom3UniteLegale|Troisième prénom déclaré pour un personne physique|20|Texte|\n|prenom4UniteLegale|Quatrième prénom déclaré pour un personne physique|20|Texte|\n|prenomUsuelUniteLegale|Prénom usuel de la personne physique|20|Texte|\n|pseudonymeUniteLegale|Pseudonyme de la personne physique|100|Texte|\n|identifiantAssociationUniteLegale|Numéro au Répertoire National des Associations|10|Texte|\n|trancheEffectifsUniteLegale|Tranche d’effectif salarié de l’unité légale|2|Liste de codes|\n|anneeEffectifsUniteLegale|Année de validité de la tranche d’effectif salarié de l’unité légale|4|Date|\n|dateDernierTraitementUniteLegale|Date du dernier traitement de l’unité légale dans le répertoire Sirene|19|Date|\n|nombrePeriodesUniteLegale|Nombre de périodes de l’unité légale|2|Numérique|\n|categorieEntreprise|Catégorie à laquelle appartient l’entreprise|3|Liste de codes|\n|anneeCategorieEntreprise|Année de validité de la catégorie d’entreprise|4|Date|\n|dateDebut|Date de début d'une période d'historique d'une unité légale|10|Date|\n|etatAdministratifUniteLegale|État administratif de l’unité légale|1|Liste de codes|\n|nomUniteLegale|Nom de naissance de la personnes physique|100|Texte|\n|nomUsageUniteLegale|Nom d’usage de la personne physique|100|Texte|\n|denominationUniteLegale|Dénomination de l’unité légale|120|Texte|\n|denominationUsuelle1UniteLegale|Dénomination usuelle de l’unité légale|70|Texte|\n|denominationUsuelle2UniteLegale|Dénomination usuelle de l’unité légale – deuxième champ|70|Texte|\n|denominationUsuelle3UniteLegale|Dénomination usuelle de l’unité légale – troisième champ|70|Texte|\n|categorieJuridiqueUniteLegale|Catégorie juridique de l’unité légale|4|Liste de codes|\n|activitePrincipaleUniteLegale|Activité principale de l’unité légale|6|Liste de codes|\n|nomenclatureActivitePrincipaleUniteLegale|Nomenclature d’activité de la variable activitePrincipaleUniteLegale|8|Liste de codes|\n|nicSiegeUniteLegale|Numéro interne de classement (Nic) de l’unité légale|5|Texte|\n|economieSocialeSolidaireUniteLegale|Appartenance au champ de l’économie sociale et solidaire|1|Liste de codes|\n|caractereEmployeurUniteLegale|Caractère employeur de l’unité légale|1|Liste de codes|\n\n## INSEE - Base SIRENE - Données Etablissements :\n\n- Fréquence : mensuelle\n- Volume : 30 millions de lignes\n\n|Nom|Libellé|Longueur|Type|\n|--|--|--|--|\n|siren|Numéro Siren|9|Texte|\n|nic|Numéro interne de classement de l'établissement|5|Texte|\n|siret|Numéro Siret|14|Texte|\n|statutDiffusionEtablissement|Statut de diffusion de l’établissement|1|Liste de codes|\n|dateCreationEtablissement|Date de création de l’établissement|10|Date|\n|trancheEffectifsEtablissement|Tranche d’effectif salarié de l’établissement|2|Liste de codes|\n|anneeEffectifsEtablissement|Année de validité de la tranche d’effectif salarié de l’établissement|4|Date|\n|activitePrincipaleRegistreMetiersEtablissement|Activité exercée par l’artisan inscrit au registre des métiers|6|Liste de codes|\n|dateDernierTraitementEtablissement|Date du dernier traitement de l’établissement dans le répertoire Sirene|19|Date|\n|etablissementSiege|Qualité de siège ou non de l’établissement|5|Texte|\n|nombrePeriodesEtablissement|Nombre de périodes de l’établissement|2|Numérique|\n|complementAdresseEtablissement|Complément d’adresse|38|Texte|\n|numeroVoieEtablissement|Numéro de voie|4|Numérique|\n|indiceRepetitionEtablissement|Indice de répétition dans la voie|1|Texte|\n|typeVoieEtablissement|Type de voie|4|Liste de codes|\n|libelleVoieEtablissement|Libellé de voie|100|Texte|\n|codePostalEtablissement|Code postal|5|Texte|\n|libelleCommuneEtablissement|Libellé de la commune|100|Texte|\n|libelleCommuneEtrangerEtablissement|Libellé de la commune pour un établissement situé à l’étranger|100|Texte|\n|distributionSpecialeEtablissement|Distribution spéciale de l’établissement|26|Texte|\n|codeCommuneEtablissement|Code commune de l’établissement|5|Liste de codes|\n|codeCedexEtablissement|Code cedex|9|Texte|\n|libelleCedexEtablissement|Libellé du code cedex|100|Texte|\n|codePaysEtrangerEtablissement|Code pays pour un établissement situé à l’étranger|5|Liste de codes|\n|libellePaysEtrangerEtablissement|Libellé du pays pour un établissement situé à l’étranger|100|Texte|\n|complementAdresse2Etablissement|Complément d’adresse secondaire|38|Texte|\n|numeroVoie2Etablissement|Numéro de la voie de l’adresse secondaire|4|Numérique|\n|indiceRepetition2Etablissement|Indice de répétition dans la voie pour l’adresse secondaire|1|Texte|\n|typeVoie2Etablissement|Type de voie de l’adresse secondaire|4|Liste de codes|\n|libelleVoie2Etablissement|Libellé de voie de l’adresse secondaire|100|Texte|\n|codePostal2Etablissement|Code postal de l’adresse secondaire|5|Texte|\n|libelleCommune2Etablissement|Libellé de la commune de l’adresse secondaire|100|Texte|\n|libelleCommuneEtranger2Etablissement|Libellé de la commune de l’adresse secondaire pour un établissement situé à l’étranger|100|Texte|\n|distributionSpeciale2Etablissement|Distribution spéciale de l’adresse secondaire de l’établissement|26|Texte|\n|codeCommune2Etablissement|Code commune de l’adresse secondaire|5|Liste de codes|\n|codeCedex2Etablissement|Code cedex de l’adresse secondaire|9|Texte|\n|libelleCedex2Etablissement|Libellé du code cedex de l’adresse secondaire|100|Texte|\n|codePaysEtranger2Etablissement|Code pays de l’adresse secondaire pour un établissement situé à l’étranger|5|Liste de codes|\n|libellePaysEtranger2Etablissement|Libellé du pays de l’adresse secondaire pour un établissement situé à l’étranger|100|Texte|\n|dateDebut|Date de début d'une période d'historique d'un établissement|10|Date|\n|etatAdministratifEtablissement|État administratif de l’établissement|1|Liste de codes|\n|enseigne1Etablissement|Première ligne d’enseigne de l’établissement|50|Texte|\n|enseigne2Etablissement|Deuxième ligne d’enseigne de l’établissement|50|Texte|\n|enseigne3Etablissement|Troisième ligne d’enseigne de l’établissement|50|Texte|\n|denominationUsuelleEtablissement|Dénomination usuelle de l’établissement|100|Texte|\n|activitePrincipaleEtablissement|Activité principale de l'établissement pendant la période|6|Liste de codes|\n|nomenclatureActivitePrincipaleEtablissement|Nomenclature d’activité de la variable activitePrincipaleEtablissement|8|Liste de codes|\n|caractereEmployeurEtablissement|Caractère employeur de l’établissement|1|Liste de codes|\n\n## INSEE - Base SIRENE - Données Liens succession:\n\n- Fréquence : mensuelle\n- Volume : x millions de lignes\n\n|Nom|Libellé|Longueur|Type|\n|--|--|--|--|\n|siretEtablissementPredecesseur|Numéro Siret de l'établissement prédécesseur|14|Texte|\n|siretEtablissementSuccesseur|Numéro Siret de l'établissement successeur|14|Texte|\n|dateLienSuccession|Date d'effet du lien de succession|10|Date|\n|transfertSiege|Indicatrice de transfert de siège|5|Texte|\n|continuiteEconomique|Indicatrice de continuité économique entre les deux établissements|5|Texte|\n|dateDernierTraitementLienSuccession|Date de traitement du lien de succession|19|Date|\n\n## DINUM - API Entreprise\nL'API entreprise des données entreprises réservées aux administrations\nhttps://entreprise.api.gouv.fr/\n\n###  Données  - API Entreprise / Infogreffe\nhttps://entreprise.api.gouv.fr/catalogue/#infogreffe-extrait-rcs\n https://entreprise.api.gouv.fr/catalogue/#entreprises\n\n Extrait des données présentes dans le registre du commerce et des sociétés pour un numéro de siren donné. Il ne s’agit donc pas de la totalité des données présentes sur le Kbis mais d’une partie succincte.\n\nTous les commentaires laissés par les greffiers. Ces observations concernent entre autres les changements de capital, les transferts de siège, les fusions, les redressements et liquidations judiciaires (si la donnée est publique).\n\n\n###  Données  - API Entreprise / DGFIP\nhttps://entreprise.api.gouv.fr/catalogue/#exercices\n\n###  Données  - API Entreprise / Effectifs  ETP\nhttps://entreprise.api.gouv.fr/catalogue/#effectifs-acoss\nEffectif mensuel établissement\nEffectif mensuel entreprise\nEffectif annuel entreprise\n\n  Cette API permet d’accéder à tous les effectifs des entreprises, à l’exception :\n        des administrations et collectivités territoriales ;\n        des entreprises de Mayotte (ce qui représente 3500 établissements) ;\n        des entreprises des marins ;\n        des entreprises des cultes ;\n        des junior-entreprises (environ 200).\nLe calcul des effectifs se fait en prenant en compte l’ensemble des contrats établis dans l’entreprise, mis à part les : \n        convention de stage ; \n        contrat d’apprentissage ;\n        contrat de volontariat de service civique ; \n        contrat d’initiative emploi ;\n        contrat d’accompagnement  ;\n        contrat de professionnalisation ;\n        contrat CDD en remplacement d’un salarié absent ; \n        contrat CDD en remplacement d’un salarié en formation professionnelle ; \n        contrat de soutien et d’aide par le travail ;  \n        ligne de service ;\n        mandat d’élu ;\n        fonctionnaire en détachement ;\n        vendeur à domicile indépendant ;\n        mandat social ;\n        contrat colporteurs de presse ;\n        voyageurs et représentants de commerce multi-carte ;\n        contrat collaborateur occasionnel du service public ;\n        militaires de réserve ;\n        parcours d’accès aux carrières (Pacte). \n\n\n\n---\n## |DNUM Ministères sociaux - Base DSN - Effectifs\n\n- Fréquence : mensuelle\n- Volume : 20 millions de lignes\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|MOIS|YYYY-MM|Mois de référence. Ne semble pas à jour, ne pas utiliser. Prendre le mois dans le titre du fichier|\n|SIRET|NUM 14|SIRET de l’établissement|\n|EFF_HOMME|NUM|Nombre de salarié homme|\n|EFF_FEMME|NUM|Nombre de salarié femme|\n|NB_CDD|NUM|Nombre de salarié en CDD|\n|NB_CDI|NUM|Nombre de salarié en CDI|\n|NB_CDI_INTERIM|NUM|Nombre de CDI d'intérim|\n|NB_INTER_MISSION|NUM|Nombre de salarié en inter mission (travail temporaire)|\n|NB_INTERIM|NUM|Nombre de salariées intérimaires|\n|DATE_MAJ|YYYY/MM/DD|Date de génération du fichier|\n\n## |DNUM Ministères sociaux- Base DSN - IDCC\n\n- Fréquence : mensuelle\n- Volume : 2 millions de lignes\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|MOIS|YYYY-MM|Mois de référence. Ne semble pas à jour, ne pas utiliser. Prendre le mois dans le titre du fichier|\n|SIRET|NUM 14|SIRET de l’établissement|\n|IDCC|NUM 4|Code Convention Collective|\n|DATE_MAJ|YYYY/MM/DD|Date de génération du fichier|\n\n## DGT - Base WIKI’T - Contrôles pôle T\n\n- Fréquence : mensuelle\n- Volume : 150 000 lignes\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|SIRET|NUM 14|SIRET de l’établissement|\n|DATE|DD/MM/YYYY|Date du dernier contrôle|\n|PROPRIETAIRE|VARCHAR|Libellé de l’unité de contrôle|\n\n## DGT - SIPSI - Prestations de Services Internationales\n\n- Fréquence : \n- Volume : 15 000 lignes\n\n\n- entreprise\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|SIREN|NUM 9|SIREN de l’entreprise|\n|salaries_distincts_2020|NUM 8|Nombre de salariés distinct détachés dans l'entreprise|\n|Année|Date|Année détachement|\n\nDans le cadre de la réalisation d'une prestation les salariés peuvent être détachés  sur :\n      -  un ou plusieurs établissements de l'entreprise \n      -  un ou plusieurs établissements  d'une autre entreprise donneur d'ordre dans le cas d'une sous traitance\n      -  un chantier ou lieu temporaire de travail non rattaché à un établissement\n\n\n- établissement\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|SIRET|NUM 14|SIRET de l’établissement|\n|salaries_distincts_2020|NUM 8|Nombre de salariés distinct détachés dans l'établissement|\n|Année|Date|Année détachement|\n\nÉtablissement identifié comme lieu d'une ou plusieurs prestation(s) de service internationale (PSI) \n(directement pour le compte de l'entreprise et/ou pour une autre entreprise donneur d'ordre)\n\n\n## DGCCRF - Base SORA - Contrôles pôle C\n\n- Fréquence : Accè svia API (à finaliser)\n- Volume : 300 000 contrôles\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|SIRET|NUM 14|SIRET de l’établissement|\n|ANNEE|INT|Année de la visite|\n|MOIS|INT|Mois de la visite|\n|JOUR|INT|Jour de la visite|\n|SUITE|INT|Suite : Oui (1) ou Non (0)|\n|UNITE|VARCHAR|Nom de l'unité fonctionnelle|\n|MESSAGERIE|VARCHAR|Mail de l'unitée fonctionnelle|\n\n## DGE - Base EOS - Visites -SEER\n\n- Fréquence : mensuelle\n- Volume :\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|SIRET|NUM 14|SIRET de l’établissement|\n|DATE|YYYY-MM-DD|Date de la visite. Format à vérifier|\n|REGION|VARCHAR|Nom de la région|\n|AGENT|VARCHAR|Nom des agents|\n|FILIERE|VARCHAR|Libellé filière|\n|TYPE|VARCHAR|Type de visite|\n|SUIVI|VARCHAR|Type de suivi|\n\n## DGEFP - Base MDF - Contrôles SRC\n\n- Fréquence : mensuelle\n- Volume : 4 000 lignes\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|REGION|INT|Code INSEE de la région|\n|SIRET|NUM 14|SIRET de l’établissement|\n|NUM DOSSIER|VARCHAR|Numéro du dossier|\n|TYPE CONTROLE|VARCHAR|SType du contrôle : FPC, CSA, Apprentissage, ...|\n|DATE|DD/MM/YYYY|Date du contrôle|\n\n## DGT - Base DACCORD - Accords d'entreprise\n\n- Fréquence : mensuelle\n- Volume : 1 350 000 lignes\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|NUM DOSSIER|CHAR 12|Numéro dossier DACCORD|\n|SIRET|NUM 14|SIRET de l’établissement|\n|DATE SIGNATURE|YYYY-MM-DD|Date de signature de l’accord|\n|EPARGNE SALARIALE|INT|Nb accords épargne salariale|\n|REMUNERATION|INT|Nb accords rémunération|\n|TEMPS TRAVAIL|INT|Nb accords temps de travail|\n|CONDITION TRAVAIL|INT|Nb accords conditions de travail|\n|EMPLOI|INT|Nb accords emploi|\n|EGALITE PROFESSIONNELLE|INT|Nb accords égalité professionnelle|\n|CLASSIFICATIONS|INT|Nb accords classifications|\n|FORMATION PROFESSIONNELLE|INT|Nb accords formation professionnelle|\n|PROTECTION SOCIALE|INT|Nb accords protection sociale|\n|DROIT SYNDICAL|INT|Nb accords droit syndical|\n|AUTRES|INT|Nb accords autres|\n|NOUVELLES TECHNO NUMERIQUES|INT|Nb accords nouvelles technos|\n\n## DGEFP - Base RUPC0 - Ruptures collectives (PSE et RCC)\n\n- Fréquence : mensuelle\n- Volume : 20 000 lignes\n\n### Les procédures :\n- PSE : plan de sauvegarde de l'emploi\n- RCC : rupture conventionnelle collective\n\n| Colonnes  Format | Commentaire |\n|--|--|--|\n|NUMERO|INT|Numero |\n|TYPE|VARCHAR|Type de dossier (PSE ou RCC)|\n|DATE_ENREGISTREMENT||date d'enregistrement du dossier|\n|ETAT DU DOSSIER|VARCHAR|état de l'instruction|\n|NOM GROUPE|VARCHAR|Ne pas utiliser|\n|EFFECTIF GROUPE|NUM|Ne pas utiliser|\n|SIREN ENTREPRISE|NUM 9||\n|EFFECTIF ENTREPRISE||Ne pas utiliser|\n|SITUATION JURIDIQUE|VARCHAR|situation juridique de l'entreprise au moment de la procédure|\n|DATE_JUGEMENT|DD-MM-YYYY|date de jugement du tribunal si RJ ou LJ|\n|ACCORD SIGNE|VARCHAR|existence d'un accord avec les organisations syndicales ou le conseil d’entreprise|\n|NB RUPTURE DEBUT PROCEDURE|NUM|Nombre maximum de rupture de contrats prévus dans l'entreprise au début de la procédure|\n|NNB RUPTURE FIN PROCEDURE|NUM|Nombre maximum de rupture de contrats prévus dans l'entreprise à la fin de la procédure|\n\n### Les établissements associés :\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|NUMERO|INT|Numero du dossierPSE|\n|TYPE|VARCHAR|Type de dossier (PSE ou RCC)|\n|DATE ENREGISTREMENT||date d'enregistrement du dossier|\n|EFFECTIF|INT|Effectif de l’établissement|\n|SIRET|NUM 14|SIRET de l'établissement impacté |\n|NB RUPTURE DEBUT PROCEDURE|INT|Nombre maximum de rupture de contrats prévus dans l'établissement début de la procédure|\n|NB RUPTURE FINPROCEDURE|INT|Nombre maximum de rupture de contrats prévus dans l'établissement à la fin de la procédure|\n|SIREN|NUM 9||\n|SITUATION_JURIDIQUE|VARCHAR|situation juridique de l'entreprise au moment de la procédure|\n|DATE_JUGEMENT|DD/MM/YYYY|Date de jugement du tribunal si RJ ou LJ|\n\n## DGEFP - Base APART - Activité partielle\n\n- Fréquence : mensuelle\n- Volume :\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|SIRET|NUM 14|SIRET de l'établissement|\n|NUM_CONVENTION|NUM 9|Numéro d’identification de la convention|\n|DATE_DECISION|yyyy-MM-DD|Date de décision du service instructeur de l'unité départementale Direccte|\n|NUM_AVENANT|NUM 1 |Numéro d'avenant à la convention initiale|\n|DA_INIT|VARCHAR|Decision auutorisation initiale  (oui ou non) |\n|NB_H_AUTO_AVN|NUM|Nombre d'heures autorisées dernier avenant|\n|NB_H_AUTO_CUM|NUM|Nombre total d'heures autorisées |\n|NB_H_CONSO_CUM|NUM|Nombre d'heures consommées (donnée évolutive dans le temps)|\n|CAUSE|VARCHAR|Motif de la demande |\n\n## DGEFP - Base Extrapro - Contrats Professionnels\n\n- Fréquence : mensuelle\n- Volume : 5 000 lignes\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|TYPE CONTRAT|NUM|Type de contrat (liste à récupérer)|\n|MUM ENREGISTREMENT|VARCHAR|Numéro d'enregistrement|\n|DATE DEBUT|DD/MM/YYYY|Date de début du contrat|\n|DATE RUPTURE|DD/MM/YYYY|Date de rupture du contrat|\n|SIRET|NUM 14|SIRET de l'employeur|\n\n\n## DGEFP - Base Ariane - Apprentissage\n\n- Fréquence : mensuelle\n- Volume : 5 000 lignes\n\n| Colonnes | Format | Commentaire |\n|--|--|--|\n|TYPE CONTRAT|NUM|Type de contrat (liste à récupérer)|\n|MUM ENREGISTREMENT|VARCHAR|Numéro d'enregistrement|\n|DATE DEBUT|DD/MM/YYYY|Date de début du contrat|\n|DATE RUPTURE|DD/MM/YYYY|Date de rupture du contrat|\n|SIRET|NUM 14|SIRET de l'employeur|	2020-06-30 10:16:41.034+00	2021-03-30 14:27:42.069+00	\N	2
4	Mentions légales	## Editeur de la plateforme\n\nLe site Fiche Commune Entreprise est édité par l’Incubateur des ministères sociaux situé :\n\nTour Mirabeau<br>\n39-43 Quai André Citroën<br>\n75015 PARIS<br>\nTél. : 01 40 56 60 00\n\n## Directeur de la publication\n\nHélène BRISSET\n\n## Hébergement\n\nCe site est hébergé en propre par le Ministère des Affaires sociales et de la Santé :\n\nMicrosoft Azure<br>\n37-39 Quai du Président Roosevelt<br>\n92130 Issy les Moulineaux\n\n## Cookies et suivi d'audience\n\nNous enregistrons des logs anonymes pour suivre l'évolution du site et les pratiques des utilisateurs.\nAucune donnée n'est utilisée à des fins commerciales.\n\n##Signaler un dysfonctionnement\n\nSi vous rencontrez un défaut d’accessibilité vous empêchant d’accéder à un contenu ou une fonctionnalité du site, merci de nous en faire part.\nSi vous n’obtenez pas de réponse rapide de notre part, vous êtes en droit de faire parvenir vos doléances ou une demande de saisine au Défenseur des droits.\n	2020-06-30 10:17:19.112+00	2021-03-24 09:49:25.238+00	\N	2
6	Politique de confidentialité	## Traitement des données à caractère personnel\n\nLa présente plateforme FCE « Fiche Commune entreprise » est à l’initiative du Ministère des solidarités et de la santé.\n\nLe responsable de traitement des données à caractère personnel collectées par la plateforme FCE est Madame Hélène BRISSET, Directrice du Numérique.\n\n## Finalités\n\nLe site peut collecter des données à caractère personnelles pour les finalités suivantes :\n\n- Centraliser les informations détenues par l’administration et ses différents services au sujet d’une entreprise ;\n- Faciliter l’accès et le partage de l’information entre les entreprises et l’administration.\n\n## Données à caractère personnel traitées\nLa plateforme peut collecter les données à caractère personnel suivantes :\n\n- Données des agents utilisateurs (adresse e-mail) ;\n- Données de connexion ;\n- Cookies\n\n## Bases juridiques des traitements de données\nConformément aux articles 6-c et 6-e, le traitement de données est nécessaire au respect d’une obligation légale et à l’exécution d’une mission d’intérêt public ou relevant de l’exercice de l’autorité publique dont est investi le responsable de traitement.\n\n## Durée de conservation\nLes données traitées à l’occasion de ces traitements ont plusieurs fondements juridiques :\n- L’obligation légale à laquelle est soumise le responsable de traitements au sens de l’article 6-c du RGPD ;\n- L’exécution d’une mission d’intérêt public ou relevant de l’exercice de l’autorité publique dont est investi le responsable de traitement au sens de l’article 6-e du RPGD.\n\nCes fondements sont précisés ci-dessous :\n\n1. Données des agents utilisateurs\nCe traitement est nécessaire à l’exécution d’une mission d’intérêt public ou relevant de l’exercice de l’autorité publique dont est investi le responsable de traitement au sens de l’article 6-e du règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l’égard du traitement des données à caractère personnel et à la libre circulation de ces données.\n2. Données d’hébergeur ou de connexion\nCe traitement est nécessaire au respect d'une obligation légale à laquelle le responsable de traitement est soumis au sens de l'article 6-c du Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données.\nL'obligation légale est posée par la loi LCEN n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique et par les articles 1 et 3 du décret n°2011-219 du 25 février 2011\n3. Cookies\nEn application de l’article 5(3) de la directive 2002/58/CE modifiée concernant le traitement des données à caractère personnel et la protection de la vie privée dans le secteur des communications électroniques, transposée à l’article 82 de la loi n°78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, les traceurs ou cookies suivent deux régimes distincts. \nLes cookies strictement nécessaires au service ou n’ayant pas pour finalité exclusive de faciliter la communication par voie électronique sont dispensés de consentement préalable au titre de l’article 82 de la loi n°78-17 du 6 janvier 1978. \nLes cookies n’étant pas strictement nécessaires au service ou n’ayant pas pour finalité exclusive de faciliter la communication par voie électronique doivent être consenti par l’utilisateur.\nCe consentement de la personne concernée pour une ou plusieurs finalités spécifiques constitue une base légale au sens du RGPD et doit être entendu au sens de l'article 6-a du Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données.\n\n## Durée de conservation\n\n- Données des agents utilisateurs : 1 an, à compter de la fin du contrat de l’agent.\n- Données d’hébergeur  : 1 an, conformément au décret n°2011-219 du 25 février 2011.\n- Cookies : Dans un délai de 13 mois, conformément aux recommandations de la CNIL\n\n## Droit des personnes concernées\n\nVous disposez des droits suivants concernant vos données à caractère personnel :\n- Droit d’information et droit d’accès aux données\n- Droit de rectification et le cas échéant de suppression des données\n\nPour les exercer, faites-nous parvenir une demande en précisant la date et l’heure précise de la requête – ces éléments sont indispensables pour nous permettre de retrouver votre recherche \n-  par voie électronique à l’adresse suivante : chloe.mandelblat@direccte.gouv.fr\n- par voie postale: \n\nDirection du Numérique\nMinistère des solidarités et de la santé\n39-43 Quai André Citroën\n75015 Paris\n\nEn raison de l’obligation de sécurité et de confidentialité dans le traitement des données à caractère personnel qui incombe au responsable de traitement, votre demande ne sera traitée que si vous apportez la preuve de votre identité. \nPour vous aider dans votre démarche, vous trouverez ici https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces, un modèle de courrier élaboré par la CNIL.\n\nLe responsable de traitement s’engage à répondre dans un délai raisonnable qui ne saurait dépasser 1 mois à compter de la réception de votre demande.\n\n## Destinataires des données\nLe responsable de traitement s’engage à ce que les données à caractères personnels soient traitées par les seules personnes autorisées.\n\n## Sécurité et confidentialité des données\nLes mesures techniques et organisationnelles de sécurité adoptées pour assurer la confidentialité, l’intégrité et protéger l’accès des données sont notamment : \n -Anonymisation \n- Stockage des données en base de données\n- Stockage des mots de passe en base sont hâchés\n- Cloisonnement des données\n- Mesures de traçabilité\n- Surveillance\n- Protection contre les virus, malwares et logiciels espions\n- Protection des réseaux\n- Sauvegarde\n- Mesures restrictives limitant l’accès physiques aux données à caractère personnel\n\n## Sous-traitants\nCertaines des données sont envoyées à des sous-traitants pour réaliser certaines missions. Le responsable de traitement s'est assuré de la mise en œuvre par ses sous-traitants de garanties adéquates et du respect de conditions strictes de confidentialité, d’usage et de protection des données.\n\n- Partenaire:  Microsoft Azure\t\n- https://privacy.microsoft.com/fr-fr/privacystatement\n- Pays destinataire: France\n- Traitement réalisé : Hébergement\n- Garanties :https://privacy.microsoft.com/fr-fr/privacystatement\n\n## Cookies\nUn cookie est un fichier déposé sur votre terminal lors de la visite d’un site. Il a pour but de collecter des informations relatives à votre navigation et de vous adresser des services adaptés à votre terminal (ordinateur, mobile ou tablette).\nLe site dépose des cookies de mesure d’audience (nombre de visites, pages consultées), respectant les conditions d’exemption du consentement de l’internaute définies par la recommandation « Cookies » de la Commission nationale informatique et libertés (CNIL). Cela signifie, notamment, que ces cookies ne servent qu’à la production de statistiques anonymes et ne permettent pas de suivre la navigation de l’internaute sur d’autres sites. \nNous utilisons pour cela Matomo, un outil de mesure d’audience web libre, paramétré pour être en conformité avec la recommandation « Cookies » de la CNIL. Cela signifie que votre adresse IP, par exemple, est anonymisée avant d’être enregistrée. Il est donc impossible d’associer vos visites sur ce site à votre personne.\n\nIl convient d’indiquer que :\nLes données collectées ne sont pas recoupées avec d’autres traitements\nLes cookies ne permettent pas de suivre la navigation de l’internaute sur d’autres sites\n\n**[BOUTON MODIFIER LES REGLAGES]**\nÀ tout moment, vous pouvez refuser l’utilisation des cookies et désactiver le dépôt sur votre ordinateur en utilisant la fonction dédiée de votre navigateur (fonction disponible notamment sur Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox, Apple Safari et Opera).\n\nPour aller plus loin, vous pouvez consulter les fiches proposées par la Commission Nationale de l'Informatique et des Libertés (CNIL) : \n* [Cookies & traceurs : que dit la loi ?](https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi)\n* [Cookies : les outils pour les maîtriser](https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser)\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n	2021-03-24 09:53:44.302+00	2021-03-24 13:27:32.744+00	2	2
7	FAQ	### ACCES\n\n\n**1. A qui s’adresse précisément le portail FCE ?**\n\nLe portail FCE s’adresse à tous les agents publics relevant des DR(I)EETS, DEETS et DDETS (PP). \nIl facilite l’accès aux informations disponibles sur les entreprises et les échanges entre services.\n\n**2. Comment accéder à FCE ?**\n\nL’accès est réservé aux seuls agents du réseau des DR(I)EETS, DEETS et DDETS (PP) \nPour se connecter, deux étapes :\n\n- 1- saisir son adresse mail\n\n*plus de précisions sur les adresses mails autorisées dans la question numéro 4*\n\n- 2-entrer le mot de passe reçu par mail\n\nL’authentification de l’agent sur FCE est valable pendant 30 jours.\nCependant l’historique n’est plus conservé sur nos postes de travail sur Chrome, c’est pourquoi nous suggérons l’utilisation de Mozilla Firefox.\nIl semble que dans certains départements l’historique ne soit pas conservée non plus sur Mozilla Firefox, dans ce cas une nouvelle authentification sera demandée lors de la connexion.\n\n\n**3.  Pourquoi je ne dispose pas d’un mot de passe unique pour accéder à  FCE ?**\n\nFCE étant encore développé de manière expérimentale nous mettons en place des solutions techniques à notre portée permettant de répondre aux questions de sécurité d’accès.\nL’accès par reconnaissance de mails sur une durée de 30 jours permet :\n\n - de garantir le périmètre d’accès, initialement réservé aux agents des Direccte (UD et UR) et désormais aux agents du réseau DREETS, DDETS(PP).\n\n- d’éviter la gestion d’un annuaire utilisateurs avec les départs et arrivées des agents dans les services\n\n**4. Est ce que mon accès à FCE sera toujours possible avec ma nouvelle messagerie en DDETS ?**\n\nPour vous connecter au portail FCE vous devez utiliser une adresse mail au  format : \n- @direccte.gouv.fr\n- @dieccte.gouv.fr\n- @dreets.gouv.fr\n- @drieets.gouv.fr\n- @deets.gouv.fr\n\nLes adresses au format **@département.gouv.fr** utilisées dans les DDETS(PP) ne fonctionnent pas actuellement \n\nEn effet, l'accès à FCE était initialement réservé aux agents des Direccte UD et UR par reconnaissance de leurs adresses mail.\n\nLe passage en DDI et les changements de mails (@departement.gouv.fr) nous compliquent la tâche car nous ne savons pas identifier les agents relevant des DDETS des autres agents de la préfecture pour lesquels nous ne bénéficions pas d’une autorisation des administrations centrales fournisseuses des données d’accès à FCE.\n\nFCE étant encore développé de manière expérimentale nous mettons en place des solutions techniques à notre portée.\nCependant, nous étudions avec la DNUM les solutions à moyen terme, mais dans l'immédiat vous devez utiliser votre adresse mail @direccte.gouv.fr sur laquelle une redirection sera maintenue pendant les prochains mois\n\n\n**5. Quels sont les navigateurs web compatibles avec FCE ?**\n\nNavigateurs compatibles : Edge, Chrome, Mozilla Firefox et Safari\nAttention Internet explorer n’est pas compatible avec FCE\n\nConseils sur vos postes de travail:\nPrivilégiez les navigateurs Edge ou Mozilla Firefox sur lesquels la gestion des cookies permet de conserver une authentification sur le portail pendant 30 jours.\n\n\n**6. FCE est-il accessible sur smartphone et tablette ?**\n\nFCE est accessible depuis n’importe quel terminal à partir du moment ou vous êtes en mesure  d’accéder à votre messagerie professionnelle sur laquelle votre mot de passe de connexion est envoyé \nA chaque fois que vous changez de terminal ou de navigateur vous devez procéder à une nouvelle authentification.\n\n\n**7. Existe-t-il une application pour smartphone et tablette FCE ?**\n\nNon, pas encore.\n\n### FONCTIONNALITÉS : exporter / imprimer\n\n**8. Comment exporter une liste de résultats ?**\n\nAprès avoir effectué une recherche: \n\n- cliquez sur le bouton  Export Excel situé en haut à droite de la liste des établissements \n- Puis enregistrez le fichier sur votre ordinateur et ouvrez le.\n\nVous trouverez dans le fichier les informations disponibles dans la liste de résultats SIRET, état, raison sociale de l’entreprise +  enseigne de l’établissement, catégorie d’établissement, code postal, secteur d’activité, tranche d’effectif DSN +  l’adresse de l’établissement \n\nL’export est réalisé au format Excel (extension xslx) \n\n**9. Comment imprimer une fiche ou l’enregistrer au format PDF**\n\nPour imprimer les données relatives à un ETABLISSEMENT:\n\n- cliquez sur le bouton “imprimer” en haut de la fiche établissement\n- puis sélectionnez l’imprimante de votre choix  pour une impression papier OU l’option  “Microsoft print to PDF”  pour enregistrer le document au format PDF sur votre ordinateur\n\nPour imprimer les données relatives à l’ENTREPRISE  :\n\n- allez sur les informations relatives à l’entreprise en cliquant sur le bouton vert “voir la fiche entreprise” en haut à gauche \n- puis cliquez sur le bouton “imprimer” en haut de la fiche relative à l’entreprise\n\n\n### LES DONNEES\n\n**10. Quelles sont les sources de données de FCE ?**\n\nLes données disponibles dans FCE proviennent des différents systèmes d’informations utilisés par les agents et sont mises à disposition par chaque administration centrale compétente :\n\n- DGT:  Wiki’T, D@ccord, SIPSPI\n- DGEFP: RUPCO, APART, SIA, Mes démarches formations \n- DGE: EOS\n- DGCCRf: SORA\n- DINUM via API entreprise : pour les données du RCS, de la DGFIP, de l’Acoss\n\nConsultez la liste exhaustive des données sur cette page :[ https://fce.fabrique.social.gouv.fr/sources-des-donnees](link)\n\n \n**11. A quelle fréquence sont mises à jour les données FCE ?**\n\nLe référentiel entreprise/établissements (base sirène de l’Insee) est actualisé mensuellement dans FCE (le 1er samedi de chaque mois). Nous œuvrons pour une actualisation quotidienne d’ici quelques mois.\nLes données métiers sont mises à jour à des temporalités différentes, pensez à vérifier la source et la date de mise à jour, indiquées à droite de chaque indicateur dans les fiches.\n\nDe manière indicative la mise à jour des données est :\n\n-    trimestrielle pour les données PSI\n-    mensuelle pour les contrôles du SIT, les visites du Seer\n-    bi-mensuelle pour les ruptures collectives et l’activité partielle\n-   quotidienne pour les infos du RCS, les dirigeants, le CA \n-   ponctuelle (à ce stade) pour les contrôles CCRF et  SRC, et les aides et agréments (politique de l’emploi)\n\nUn description détaillée est disponible sur le site dans la rubrique source de données :  [ https://fce.fabrique.social.gouv.fr/sources-des-donnees](link)\n\n \n**12. Où trouver les informations sur les dirigeants? Les informations légales du RCS ?  Les indicateurs financiers ?** \n\nPensez à consulter la rubrique dédiée à l’entreprise  en cliquant sur le bouton vert en haut à gauche de la fiche de l’établissement : “Voir la fiche entreprise” \n\nVous trouverez des informations légales et administratives relevant de l’entreprise : \n\n- Information générales  : secteur d’activité, forme juridique, siège social, effectif en ETP\n- Informations juridiques : date d’immatriculation et observations notifiées au RCS\n- Données financières : derniers chiffres d’affaires\n- Dirigeants/ Mandataires sociaux\n- Accords d’entreprise déposés par les établissements\n- Mais aussi  une vision synthétique des établissements de l’entreprise  ayant eu un contrôle, un recours à l’activité partielle, une procédure de licenciement collectif….\n\n\n  \n**13. Où sont hébergées les données FCE ?**\n\nLes données sont hébergées sur un serveur Azure (France) géré par la DNUM des ministères sociaux\nVous pouvez consulter les informations concernant la politique de confidentialité des données sur FCE ici : [https://fce.prep.fabrique.social.gouv.fr/politique-de-confidentialite](link)\n\n### QUESTIONS / CONTACTS\n \n**14. Comment signaler un dysfonctionnement du portail à l’équipe FCE ?**\n\nContactez directement l’équipe via la boîte de dialogue du site ou à l’adresse suivante : chloe.mandelblat@dreets.gouv.fr\n \n**16. Comment écrire un message à l’équipe FCE ?**\n\nContactez directement l’équipe via la boîte de dialogue du site ou à l’adresse suivante : chloe.mandelblat@dreets.gouv.fr\n \n\n### COMMUNIQUER / SOUTENIR\n\n**17. Comment soutenir l’initiative FCE ?**\n\nFaites connaître le portail à vos collègues. Plus vous serez nombreux à l’utiliser, plus nous pourrons le développer et l’améliorer. Merci d’avance !\n \n**18. Comment recevoir les dernières actualités du portail FCE ?**\n\nAbonnez-vous à notre lettre d’information (page d’accueil ou page “Contact”) \n \n	2021-04-22 14:48:17.86+00	2021-04-22 20:47:34.433+00	2	1
\.


--
-- Name: pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pages_id_seq', 7, true);


--
-- Data for Name: section_faqs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.section_faqs (id, titre, published_at, created_by, updated_by, created_at, updated_at, "Titre") FROM stdin;
2	\N	2021-04-22 19:22:57.199+00	1	1	2021-04-22 19:22:28.922+00	2021-04-22 19:22:57.225+00	Section 1
\.


--
-- Data for Name: section_faqs_components; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.section_faqs_components (id, field, "order", component_type, component_id, section_faq_id) FROM stdin;
2	liste_de_questions	1	components_faq_question_faqs	2	2
\.


--
-- Name: section_faqs_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.section_faqs_components_id_seq', 2, true);


--
-- Name: section_faqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.section_faqs_id_seq', 2, true);


--
-- Data for Name: strapi_administrator; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.strapi_administrator (id, username, email, password, "resetPasswordToken", blocked, firstname, lastname, "registrationToken", "isActive") FROM stdin;
2	chloe	chloe.mandelblat@direccte.gouv.fr	$2a$10$oyZXL0tW2pL0.7xyI5gZM.m/y5rpXO9f0zPXr.17ff/kdGsBaQUXq	\N	f	\N	\N	\N	t
3	pierre	pierre.vercauteren@sg.social.gouv.fr	$2a$10$Jv3.WOFQWH1slMqpEfI5HeWaaLpg84jCSjbjArY8p859vMmDlRbx.	\N	f	\N	\N	\N	t
1	commit42	contact@commit42.fr	$2a$10$1PZDKn2nkFIoSGnTH45pQeIgVwnLsUABQtpgHVZyy0PhdZsscMe86	901f65011129e8da5e5efd9d4b79f44b6f646e1b	\N	\N	\N	\N	t
\.


--
-- Name: strapi_administrator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.strapi_administrator_id_seq', 3, true);


--
-- Data for Name: strapi_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.strapi_permission (id, action, subject, fields, conditions, role, created_at, updated_at) FROM stdin;
1	plugins::content-manager.explorer.create	application::page.page	["titre", "contenu"]	[]	2	2020-10-08 13:23:46.271+00	2020-10-08 13:23:46.284+00
2	plugins::content-manager.explorer.read	application::page.page	["titre", "contenu"]	[]	2	2020-10-08 13:23:46.271+00	2020-10-08 13:23:46.284+00
3	plugins::content-manager.explorer.update	application::page.page	["titre", "contenu"]	[]	2	2020-10-08 13:23:46.271+00	2020-10-08 13:23:46.284+00
4	plugins::content-manager.explorer.delete	application::page.page	\N	[]	2	2020-10-08 13:23:46.271+00	2020-10-08 13:23:46.284+00
5	plugins::upload.read	\N	\N	[]	2	2020-10-08 13:23:46.271+00	2020-10-08 13:23:46.284+00
6	plugins::upload.assets.create	\N	\N	[]	2	2020-10-08 13:23:46.271+00	2020-10-08 13:23:46.284+00
7	plugins::upload.assets.download	\N	\N	[]	2	2020-10-08 13:23:46.271+00	2020-10-08 13:23:46.284+00
8	plugins::upload.assets.update	\N	\N	[]	2	2020-10-08 13:23:46.272+00	2020-10-08 13:23:46.284+00
9	plugins::upload.assets.copy-link	\N	\N	[]	2	2020-10-08 13:23:46.272+00	2020-10-08 13:23:46.289+00
10	plugins::content-manager.explorer.create	application::page.page	["titre", "contenu"]	["admin::is-creator"]	3	2020-10-08 13:23:46.316+00	2020-10-08 13:23:46.332+00
11	plugins::content-manager.explorer.read	application::page.page	["titre", "contenu"]	["admin::is-creator"]	3	2020-10-08 13:23:46.316+00	2020-10-08 13:23:46.333+00
12	plugins::content-manager.explorer.update	application::page.page	["titre", "contenu"]	["admin::is-creator"]	3	2020-10-08 13:23:46.316+00	2020-10-08 13:23:46.333+00
13	plugins::content-manager.explorer.delete	application::page.page	\N	["admin::is-creator"]	3	2020-10-08 13:23:46.316+00	2020-10-08 13:23:46.333+00
14	plugins::upload.read	\N	\N	["admin::is-creator"]	3	2020-10-08 13:23:46.316+00	2020-10-08 13:23:46.333+00
15	plugins::upload.assets.create	\N	\N	[]	3	2020-10-08 13:23:46.317+00	2020-10-08 13:23:46.333+00
16	plugins::upload.assets.update	\N	\N	["admin::is-creator"]	3	2020-10-08 13:23:46.317+00	2020-10-08 13:23:46.333+00
17	plugins::upload.assets.download	\N	\N	[]	3	2020-10-08 13:23:46.317+00	2020-10-08 13:23:46.333+00
18	plugins::upload.assets.copy-link	\N	\N	[]	3	2020-10-08 13:23:46.317+00	2020-10-08 13:23:46.336+00
19	plugins::content-manager.explorer.create	application::page.page	["titre", "contenu"]	[]	1	2020-10-08 13:23:46.366+00	2020-10-08 13:23:46.382+00
20	plugins::content-manager.explorer.create	plugins::users-permissions.user	["username", "email", "provider", "password", "resetPasswordToken", "confirmed", "blocked", "role"]	[]	1	2020-10-08 13:23:46.366+00	2020-10-08 13:23:46.382+00
21	plugins::content-manager.explorer.read	application::page.page	["titre", "contenu"]	[]	1	2020-10-08 13:23:46.366+00	2020-10-08 13:23:46.383+00
22	plugins::content-manager.explorer.read	plugins::users-permissions.user	["username", "email", "provider", "password", "resetPasswordToken", "confirmed", "blocked", "role"]	[]	1	2020-10-08 13:23:46.366+00	2020-10-08 13:23:46.383+00
23	plugins::content-manager.explorer.update	application::page.page	["titre", "contenu"]	[]	1	2020-10-08 13:23:46.366+00	2020-10-08 13:23:46.383+00
24	plugins::content-manager.explorer.update	plugins::users-permissions.user	["username", "email", "provider", "password", "resetPasswordToken", "confirmed", "blocked", "role"]	[]	1	2020-10-08 13:23:46.366+00	2020-10-08 13:23:46.383+00
25	plugins::content-manager.explorer.delete	application::page.page	\N	[]	1	2020-10-08 13:23:46.366+00	2020-10-08 13:23:46.383+00
26	plugins::content-manager.explorer.delete	plugins::users-permissions.user	\N	[]	1	2020-10-08 13:23:46.367+00	2020-10-08 13:23:46.383+00
27	plugins::content-type-builder.read	\N	\N	[]	1	2020-10-08 13:23:46.367+00	2020-10-08 13:23:46.387+00
28	plugins::upload.read	\N	\N	[]	1	2020-10-08 13:23:46.37+00	2020-10-08 13:23:46.388+00
29	plugins::upload.assets.create	\N	\N	[]	1	2020-10-08 13:23:46.407+00	2020-10-08 13:23:46.409+00
31	plugins::upload.assets.copy-link	\N	\N	[]	1	2020-10-08 13:23:46.413+00	2020-10-08 13:23:46.426+00
32	plugins::upload.assets.download	\N	\N	[]	1	2020-10-08 13:23:46.413+00	2020-10-08 13:23:46.426+00
33	plugins::content-manager.single-types.configure-view	\N	\N	[]	1	2020-10-08 13:23:46.413+00	2020-10-08 13:23:46.426+00
34	plugins::upload.settings.read	\N	\N	[]	1	2020-10-08 13:23:46.413+00	2020-10-08 13:23:46.426+00
35	plugins::content-manager.components.configure-layout	\N	\N	[]	1	2020-10-08 13:23:46.413+00	2020-10-08 13:23:46.426+00
36	plugins::content-manager.collection-types.configure-view	\N	\N	[]	1	2020-10-08 13:23:46.413+00	2020-10-08 13:23:46.426+00
37	plugins::users-permissions.roles.create	\N	\N	[]	1	2020-10-08 13:23:46.413+00	2020-10-08 13:23:46.426+00
30	plugins::upload.assets.update	\N	\N	[]	1	2020-10-08 13:23:46.411+00	2020-10-08 13:23:46.426+00
38	plugins::users-permissions.roles.read	\N	\N	[]	1	2020-10-08 13:23:46.417+00	2020-10-08 13:23:46.431+00
39	plugins::users-permissions.roles.update	\N	\N	[]	1	2020-10-08 13:23:46.44+00	2020-10-08 13:23:46.449+00
40	plugins::users-permissions.roles.delete	\N	\N	[]	1	2020-10-08 13:23:46.451+00	2020-10-08 13:23:46.459+00
41	plugins::users-permissions.providers.read	\N	\N	[]	1	2020-10-08 13:23:46.455+00	2020-10-08 13:23:46.468+00
42	plugins::users-permissions.providers.update	\N	\N	[]	1	2020-10-08 13:23:46.455+00	2020-10-08 13:23:46.468+00
43	plugins::users-permissions.email-templates.read	\N	\N	[]	1	2020-10-08 13:23:46.455+00	2020-10-08 13:23:46.468+00
44	plugins::users-permissions.email-templates.update	\N	\N	[]	1	2020-10-08 13:23:46.455+00	2020-10-08 13:23:46.469+00
45	plugins::users-permissions.advanced-settings.read	\N	\N	[]	1	2020-10-08 13:23:46.455+00	2020-10-08 13:23:46.469+00
47	admin::marketplace.read	\N	\N	[]	1	2020-10-08 13:23:46.458+00	2020-10-08 13:23:46.472+00
48	admin::marketplace.plugins.install	\N	\N	[]	1	2020-10-08 13:23:46.458+00	2020-10-08 13:23:46.472+00
46	plugins::users-permissions.advanced-settings.update	\N	\N	[]	1	2020-10-08 13:23:46.455+00	2020-10-08 13:23:46.474+00
49	admin::marketplace.plugins.uninstall	\N	\N	[]	1	2020-10-08 13:23:46.46+00	2020-10-08 13:23:46.476+00
50	admin::webhooks.create	\N	\N	[]	1	2020-10-08 13:23:46.491+00	2020-10-08 13:23:46.495+00
51	admin::webhooks.read	\N	\N	[]	1	2020-10-08 13:23:46.494+00	2020-10-08 13:23:46.503+00
52	admin::webhooks.delete	\N	\N	[]	1	2020-10-08 13:23:46.499+00	2020-10-08 13:23:46.511+00
53	admin::webhooks.update	\N	\N	[]	1	2020-10-08 13:23:46.499+00	2020-10-08 13:23:46.511+00
54	admin::users.create	\N	\N	[]	1	2020-10-08 13:23:46.499+00	2020-10-08 13:23:46.511+00
55	admin::users.read	\N	\N	[]	1	2020-10-08 13:23:46.499+00	2020-10-08 13:23:46.511+00
56	admin::users.update	\N	\N	[]	1	2020-10-08 13:23:46.499+00	2020-10-08 13:23:46.511+00
57	admin::roles.read	\N	\N	[]	1	2020-10-08 13:23:46.5+00	2020-10-08 13:23:46.511+00
58	admin::users.delete	\N	\N	[]	1	2020-10-08 13:23:46.5+00	2020-10-08 13:23:46.511+00
59	admin::roles.create	\N	\N	[]	1	2020-10-08 13:23:46.5+00	2020-10-08 13:23:46.514+00
60	admin::roles.update	\N	\N	[]	1	2020-10-08 13:23:46.516+00	2020-10-08 13:23:46.528+00
61	admin::roles.delete	\N	\N	[]	1	2020-10-08 13:23:46.527+00	2020-10-08 13:23:46.532+00
84	plugins::content-manager.explorer.publish	application::faq.faq	\N	[]	1	2021-04-22 20:17:58.79+00	2021-04-22 20:17:58.812+00
75	plugins::content-manager.explorer.delete	application::faq-section.faq-section	\N	[]	1	2021-04-22 19:27:35.938+00	2021-04-22 19:27:35.954+00
76	plugins::content-manager.explorer.publish	application::faq-section.faq-section	\N	[]	1	2021-04-22 19:27:35.938+00	2021-04-22 19:27:35.958+00
88	plugins::content-manager.explorer.create	application::faq-tutos-video.faq-tutos-video	["titre", "video"]	[]	1	2021-04-26 09:03:39.438+00	2021-04-26 09:03:39.453+00
89	plugins::content-manager.explorer.read	application::faq-tutos-video.faq-tutos-video	["titre", "video"]	[]	1	2021-04-26 09:03:39.438+00	2021-04-26 09:03:39.453+00
77	plugins::content-manager.explorer.create	application::faq-section.faq-section	["Titre", "questions"]	[]	1	2021-04-22 19:35:56.04+00	2021-04-22 19:35:56.052+00
78	plugins::content-manager.explorer.read	application::faq-section.faq-section	["Titre", "questions"]	[]	1	2021-04-22 19:35:56.04+00	2021-04-22 19:35:56.052+00
79	plugins::content-manager.explorer.update	application::faq-section.faq-section	["Titre", "questions"]	[]	1	2021-04-22 19:35:56.04+00	2021-04-22 19:35:56.052+00
83	plugins::content-manager.explorer.delete	application::faq.faq	\N	[]	1	2021-04-22 20:17:58.79+00	2021-04-22 20:17:58.81+00
90	plugins::content-manager.explorer.update	application::faq-tutos-video.faq-tutos-video	["titre", "video"]	[]	1	2021-04-26 09:03:39.438+00	2021-04-26 09:03:39.453+00
91	plugins::content-manager.explorer.delete	application::faq-tutos-video.faq-tutos-video	\N	[]	1	2021-04-26 09:03:39.438+00	2021-04-26 09:03:39.453+00
92	plugins::content-manager.explorer.publish	application::faq-tutos-video.faq-tutos-video	\N	[]	1	2021-04-26 09:03:39.438+00	2021-04-26 09:03:39.459+00
93	plugins::content-manager.explorer.create	application::faq.faq	["faq_sections", "faq_tutos_videos"]	[]	1	2021-04-26 09:05:36.531+00	2021-04-26 09:05:36.542+00
94	plugins::content-manager.explorer.read	application::faq.faq	["faq_sections", "faq_tutos_videos"]	[]	1	2021-04-26 09:05:36.532+00	2021-04-26 09:05:36.542+00
95	plugins::content-manager.explorer.update	application::faq.faq	["faq_sections", "faq_tutos_videos"]	[]	1	2021-04-26 09:05:36.532+00	2021-04-26 09:05:36.542+00
\.


--
-- Name: strapi_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.strapi_permission_id_seq', 95, true);


--
-- Data for Name: strapi_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.strapi_role (id, name, code, description, created_at, updated_at) FROM stdin;
1	Super Admin	strapi-super-admin	Super Admins can access and manage all features and settings.	2020-10-08 13:23:46.217+00	2020-10-08 13:23:46.217+00
2	Editor	strapi-editor	Editors can manage and publish contents including those of other users.	2020-10-08 13:23:46.237+00	2020-10-08 13:23:46.237+00
3	Author	strapi-author	Authors can manage the content they have created.	2020-10-08 13:23:46.251+00	2020-10-08 13:23:46.251+00
\.


--
-- Name: strapi_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.strapi_role_id_seq', 3, true);


--
-- Data for Name: strapi_users_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.strapi_users_roles (id, user_id, role_id) FROM stdin;
1	2	1
2	1	1
3	3	1
\.


--
-- Name: strapi_users_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.strapi_users_roles_id_seq', 3, true);


--
-- Data for Name: strapi_webhooks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.strapi_webhooks (id, name, url, headers, events, enabled) FROM stdin;
\.


--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.strapi_webhooks_id_seq', 1, false);


--
-- Data for Name: upload_file; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.upload_file (id, name, "alternativeText", caption, width, height, formats, hash, ext, mime, size, url, "previewUrl", provider, provider_metadata, created_at, updated_at, created_by, updated_by) FROM stdin;
2	pexels-cityxcape-5838621.mp4			\N	\N	\N	pexels_cityxcape_5838621_9dbb61baab	.mp4	video/mp4	4656.36	/uploads/pexels_cityxcape_5838621_9dbb61baab.mp4	\N	local	\N	2021-04-26 08:11:24.801+00	2021-04-26 08:11:24.807+00	1	1
\.


--
-- Name: upload_file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.upload_file_id_seq', 2, true);


--
-- Data for Name: upload_file_morph; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.upload_file_morph (id, upload_file_id, related_id, related_type, field, "order") FROM stdin;
1	2	2	components_faq_tuto_videos	video	1
2	2	3	components_faq_tuto_videos	video	1
\.


--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.upload_file_morph_id_seq', 2, true);


--
-- Data for Name: users-permissions_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."users-permissions_permission" (id, type, controller, action, enabled, policy, role, created_by, updated_by) FROM stdin;
1	content-manager	components	findcomponent	f		1	\N	\N
2	content-manager	components	findcomponent	f		2	\N	\N
3	content-manager	components	listcomponents	f		1	\N	\N
4	content-manager	components	listcomponents	f		2	\N	\N
5	content-manager	components	updatecomponent	f		1	\N	\N
6	content-manager	components	updatecomponent	f		2	\N	\N
7	content-manager	contentmanager	checkuidavailability	f		1	\N	\N
8	content-manager	contentmanager	checkuidavailability	f		2	\N	\N
9	content-manager	contentmanager	count	f		1	\N	\N
10	content-manager	contentmanager	count	f		2	\N	\N
11	content-manager	contentmanager	create	f		1	\N	\N
12	content-manager	contentmanager	create	f		2	\N	\N
13	content-manager	contentmanager	delete	f		1	\N	\N
15	content-manager	contentmanager	deletemany	f		1	\N	\N
16	content-manager	contentmanager	deletemany	f		2	\N	\N
17	content-manager	contentmanager	find	f		1	\N	\N
18	content-manager	contentmanager	find	f		2	\N	\N
19	content-manager	contentmanager	findone	f		2	\N	\N
20	content-manager	contentmanager	findone	f		1	\N	\N
14	content-manager	contentmanager	delete	f		2	\N	\N
21	content-manager	contentmanager	generateuid	f		1	\N	\N
22	content-manager	contentmanager	generateuid	f		2	\N	\N
23	content-manager	contentmanager	update	f		1	\N	\N
24	content-manager	contentmanager	update	f		2	\N	\N
25	content-manager	contenttypes	findcontenttype	f		2	\N	\N
26	content-manager	contenttypes	findcontenttype	f		1	\N	\N
27	content-manager	contenttypes	listcontenttypes	f		1	\N	\N
28	content-manager	contenttypes	updatecontenttype	f		1	\N	\N
29	content-manager	contenttypes	listcontenttypes	f		2	\N	\N
30	content-manager	contenttypes	updatecontenttype	f		2	\N	\N
31	content-type-builder	builder	getreservednames	f		1	\N	\N
32	content-type-builder	builder	getreservednames	f		2	\N	\N
33	content-type-builder	componentcategories	deletecategory	f		1	\N	\N
34	content-type-builder	componentcategories	deletecategory	f		2	\N	\N
35	content-type-builder	componentcategories	editcategory	f		1	\N	\N
36	content-type-builder	componentcategories	editcategory	f		2	\N	\N
37	content-type-builder	components	createcomponent	f		1	\N	\N
38	content-type-builder	components	createcomponent	f		2	\N	\N
39	content-type-builder	components	deletecomponent	f		2	\N	\N
40	content-type-builder	components	deletecomponent	f		1	\N	\N
41	content-type-builder	components	getcomponent	f		1	\N	\N
42	content-type-builder	components	getcomponent	f		2	\N	\N
43	content-type-builder	components	getcomponents	f		1	\N	\N
44	content-type-builder	components	getcomponents	f		2	\N	\N
45	content-type-builder	components	updatecomponent	f		1	\N	\N
46	content-type-builder	components	updatecomponent	f		2	\N	\N
47	content-type-builder	connections	getconnections	f		2	\N	\N
49	content-type-builder	contenttypes	createcontenttype	f		1	\N	\N
48	content-type-builder	connections	getconnections	f		1	\N	\N
50	content-type-builder	contenttypes	createcontenttype	f		2	\N	\N
51	content-type-builder	contenttypes	deletecontenttype	f		1	\N	\N
52	content-type-builder	contenttypes	deletecontenttype	f		2	\N	\N
53	content-type-builder	contenttypes	getcontenttype	f		1	\N	\N
54	content-type-builder	contenttypes	getcontenttype	f		2	\N	\N
55	content-type-builder	contenttypes	getcontenttypes	f		1	\N	\N
56	content-type-builder	contenttypes	getcontenttypes	f		2	\N	\N
57	content-type-builder	contenttypes	updatecontenttype	f		1	\N	\N
58	content-type-builder	contenttypes	updatecontenttype	f		2	\N	\N
59	email	email	send	f		1	\N	\N
60	email	email	send	f		2	\N	\N
61	upload	proxy	uploadproxy	f		1	\N	\N
62	upload	proxy	uploadproxy	f		2	\N	\N
63	upload	upload	count	f		1	\N	\N
64	upload	upload	count	f		2	\N	\N
65	upload	upload	destroy	f		1	\N	\N
66	upload	upload	destroy	f		2	\N	\N
67	upload	upload	find	f		1	\N	\N
68	upload	upload	find	f		2	\N	\N
69	upload	upload	findone	f		1	\N	\N
70	upload	upload	findone	f		2	\N	\N
71	upload	upload	getsettings	f		1	\N	\N
72	upload	upload	getsettings	f		2	\N	\N
73	upload	upload	search	f		1	\N	\N
74	upload	upload	search	f		2	\N	\N
75	upload	upload	updatesettings	f		1	\N	\N
76	upload	upload	updatesettings	f		2	\N	\N
77	upload	upload	upload	f		1	\N	\N
78	upload	upload	upload	f		2	\N	\N
79	users-permissions	auth	callback	f		1	\N	\N
80	users-permissions	auth	connect	t		1	\N	\N
81	users-permissions	auth	callback	t		2	\N	\N
167	application	page	update	f		1	\N	\N
205	application	faq	delete	f		1	\N	\N
170	content-manager	contentmanager	findrelationlist	f		2	\N	\N
157	application	page	count	f		1	\N	\N
199	application	faq-section	find	f		1	\N	\N
211	application	faq-tutos-video	count	f		1	\N	\N
82	users-permissions	auth	connect	t		2	\N	\N
91	users-permissions	auth	sendemailconfirmation	f		1	\N	\N
100	users-permissions	user	destroyall	f		2	\N	\N
206	application	faq	delete	f		2	\N	\N
121	users-permissions	userspermissions	getpolicies	f		1	\N	\N
131	users-permissions	userspermissions	index	f		1	\N	\N
141	users-permissions	userspermissions	updateproviders	f		1	\N	\N
212	application	faq-tutos-video	count	f		2	\N	\N
158	application	page	count	f		2	\N	\N
171	content-manager	contentmanager	publish	f		1	\N	\N
221	application	faq-tutos-video	update	f		1	\N	\N
200	application	faq-section	find	f		2	\N	\N
83	users-permissions	auth	emailconfirmation	f		1	\N	\N
93	users-permissions	user	count	f		1	\N	\N
103	users-permissions	user	findone	f		1	\N	\N
113	users-permissions	userspermissions	deleterole	f		1	\N	\N
123	users-permissions	userspermissions	getproviders	f		1	\N	\N
207	application	faq	find	f		1	\N	\N
143	users-permissions	userspermissions	updaterole	f		1	\N	\N
213	application	faq-tutos-video	create	f		1	\N	\N
159	application	page	create	f		1	\N	\N
172	content-manager	contentmanager	publish	f		2	\N	\N
201	application	faq-section	findone	f		1	\N	\N
84	users-permissions	auth	emailconfirmation	t		2	\N	\N
94	users-permissions	user	count	f		2	\N	\N
104	users-permissions	user	findone	f		2	\N	\N
114	users-permissions	userspermissions	deleterole	f		2	\N	\N
124	users-permissions	userspermissions	getproviders	f		2	\N	\N
144	users-permissions	userspermissions	updaterole	f		2	\N	\N
202	application	faq-section	findone	f		2	\N	\N
208	application	faq	find	t		2	\N	\N
160	application	page	create	f		2	\N	\N
173	content-manager	contentmanager	unpublish	f		1	\N	\N
214	application	faq-tutos-video	create	f		2	\N	\N
85	users-permissions	auth	forgotpassword	f		1	\N	\N
95	users-permissions	user	create	f		1	\N	\N
105	users-permissions	user	me	t		1	\N	\N
115	users-permissions	userspermissions	getadvancedsettings	f		1	\N	\N
125	users-permissions	userspermissions	getrole	f		1	\N	\N
135	users-permissions	userspermissions	searchusers	f		1	\N	\N
209	application	faq	update	f		1	\N	\N
161	application	page	delete	f		1	\N	\N
174	content-manager	contentmanager	unpublish	f		2	\N	\N
215	application	faq-tutos-video	delete	f		1	\N	\N
86	users-permissions	auth	forgotpassword	t		2	\N	\N
96	users-permissions	user	create	f		2	\N	\N
106	users-permissions	user	me	t		2	\N	\N
116	users-permissions	userspermissions	getadvancedsettings	f		2	\N	\N
126	users-permissions	userspermissions	getrole	f		2	\N	\N
136	users-permissions	userspermissions	searchusers	f		2	\N	\N
210	application	faq	update	f		2	\N	\N
216	application	faq-tutos-video	delete	f		2	\N	\N
162	application	page	delete	f		2	\N	\N
168	application	page	update	f		2	\N	\N
193	application	faq-section	count	f		1	\N	\N
203	application	faq-section	update	f		1	\N	\N
87	users-permissions	auth	register	f		1	\N	\N
97	users-permissions	user	destroy	f		1	\N	\N
107	users-permissions	user	update	f		1	\N	\N
117	users-permissions	userspermissions	getemailtemplate	f		1	\N	\N
127	users-permissions	userspermissions	getroles	f		1	\N	\N
137	users-permissions	userspermissions	updateadvancedsettings	f		1	\N	\N
217	application	faq-tutos-video	find	f		1	\N	\N
163	application	page	find	f		1	\N	\N
194	application	faq-section	count	f		2	\N	\N
204	application	faq-section	update	f		2	\N	\N
88	users-permissions	auth	resetpassword	f		1	\N	\N
99	users-permissions	user	destroy	f		2	\N	\N
109	users-permissions	userspermissions	createrole	f		1	\N	\N
119	users-permissions	userspermissions	getpermissions	f		1	\N	\N
130	users-permissions	userspermissions	getroutes	f		2	\N	\N
139	users-permissions	userspermissions	updateemailtemplate	f		1	\N	\N
218	application	faq-tutos-video	find	f		2	\N	\N
222	application	faq-tutos-video	update	f		2	\N	\N
164	application	page	find	f		2	\N	\N
195	application	faq-section	create	f		1	\N	\N
89	users-permissions	auth	register	t		2	\N	\N
98	users-permissions	user	destroyall	f		1	\N	\N
108	users-permissions	user	update	f		2	\N	\N
118	users-permissions	userspermissions	getemailtemplate	f		2	\N	\N
128	users-permissions	userspermissions	getroles	f		2	\N	\N
138	users-permissions	userspermissions	updateadvancedsettings	f		2	\N	\N
219	application	faq-tutos-video	findone	f		1	\N	\N
165	application	page	findone	f		1	\N	\N
196	application	faq-section	create	f		2	\N	\N
90	users-permissions	auth	resetpassword	f		2	\N	\N
101	users-permissions	user	find	f		1	\N	\N
220	application	faq-tutos-video	findone	f		2	\N	\N
122	users-permissions	userspermissions	getpolicies	f		2	\N	\N
132	users-permissions	userspermissions	index	f		2	\N	\N
142	users-permissions	userspermissions	updateproviders	f		2	\N	\N
166	application	page	findone	t		2	\N	\N
197	application	faq-section	delete	f		1	\N	\N
92	users-permissions	auth	sendemailconfirmation	f		2	\N	\N
102	users-permissions	user	find	f		2	\N	\N
110	users-permissions	userspermissions	createrole	f		2	\N	\N
120	users-permissions	userspermissions	getpermissions	f		2	\N	\N
129	users-permissions	userspermissions	getroutes	f		1	\N	\N
140	users-permissions	userspermissions	updateemailtemplate	f		2	\N	\N
169	content-manager	contentmanager	findrelationlist	f		1	\N	\N
198	application	faq-section	delete	f		2	\N	\N
\.


--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users-permissions_permission_id_seq"', 222, true);


--
-- Data for Name: users-permissions_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."users-permissions_role" (id, name, description, type, created_by, updated_by) FROM stdin;
1	Authenticated	Default role given to authenticated user.	authenticated	\N	\N
2	Public	Default role given to unauthenticated user.	public	\N	\N
\.


--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users-permissions_role_id_seq"', 2, true);


--
-- Data for Name: users-permissions_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."users-permissions_user" (id, username, email, provider, password, "resetPasswordToken", confirmed, blocked, role, created_at, updated_at, created_by, updated_by) FROM stdin;
\.


--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."users-permissions_user_id_seq"', 2, true);


--
-- Name: components_faq_question_faqs components_faq_question_faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.components_faq_question_faqs
    ADD CONSTRAINT components_faq_question_faqs_pkey PRIMARY KEY (id);


--
-- Name: components_faq_tuto_videos components_faq_tuto_videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.components_faq_tuto_videos
    ADD CONSTRAINT components_faq_tuto_videos_pkey PRIMARY KEY (id);


--
-- Name: core_store core_store_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.core_store
    ADD CONSTRAINT core_store_pkey PRIMARY KEY (id);


--
-- Name: faq-sections_components faq-sections_components_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."faq-sections_components"
    ADD CONSTRAINT "faq-sections_components_pkey" PRIMARY KEY (id);


--
-- Name: faq-sections faq-sections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."faq-sections"
    ADD CONSTRAINT "faq-sections_pkey" PRIMARY KEY (id);


--
-- Name: faq_sections_components faq_sections_components_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq_sections_components
    ADD CONSTRAINT faq_sections_components_pkey PRIMARY KEY (id);


--
-- Name: faq_sections faq_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq_sections
    ADD CONSTRAINT faq_sections_pkey PRIMARY KEY (id);


--
-- Name: faq_tutos_videos_components faq_tutos_videos_components_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq_tutos_videos_components
    ADD CONSTRAINT faq_tutos_videos_components_pkey PRIMARY KEY (id);


--
-- Name: faq_tutos_videos faq_tutos_videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq_tutos_videos
    ADD CONSTRAINT faq_tutos_videos_pkey PRIMARY KEY (id);


--
-- Name: faqs__faq_sections faqs__faq_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs__faq_sections
    ADD CONSTRAINT faqs__faq_sections_pkey PRIMARY KEY (id);


--
-- Name: faqs__faq_tutos_videos faqs__faq_tutos_videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs__faq_tutos_videos
    ADD CONSTRAINT faqs__faq_tutos_videos_pkey PRIMARY KEY (id);


--
-- Name: faqs_components faqs_components_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs_components
    ADD CONSTRAINT faqs_components_pkey PRIMARY KEY (id);


--
-- Name: faqs faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs
    ADD CONSTRAINT faqs_pkey PRIMARY KEY (id);


--
-- Name: pages pages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: pages pages_titre_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_titre_unique UNIQUE (titre);


--
-- Name: section_faqs_components section_faqs_components_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_faqs_components
    ADD CONSTRAINT section_faqs_components_pkey PRIMARY KEY (id);


--
-- Name: section_faqs section_faqs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_faqs
    ADD CONSTRAINT section_faqs_pkey PRIMARY KEY (id);


--
-- Name: strapi_administrator strapi_administrator_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_administrator
    ADD CONSTRAINT strapi_administrator_email_unique UNIQUE (email);


--
-- Name: strapi_administrator strapi_administrator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_administrator
    ADD CONSTRAINT strapi_administrator_pkey PRIMARY KEY (id);


--
-- Name: strapi_permission strapi_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_permission
    ADD CONSTRAINT strapi_permission_pkey PRIMARY KEY (id);


--
-- Name: strapi_role strapi_role_code_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_role
    ADD CONSTRAINT strapi_role_code_unique UNIQUE (code);


--
-- Name: strapi_role strapi_role_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_role
    ADD CONSTRAINT strapi_role_name_unique UNIQUE (name);


--
-- Name: strapi_role strapi_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_role
    ADD CONSTRAINT strapi_role_pkey PRIMARY KEY (id);


--
-- Name: strapi_users_roles strapi_users_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_users_roles
    ADD CONSTRAINT strapi_users_roles_pkey PRIMARY KEY (id);


--
-- Name: strapi_webhooks strapi_webhooks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.strapi_webhooks
    ADD CONSTRAINT strapi_webhooks_pkey PRIMARY KEY (id);


--
-- Name: upload_file_morph upload_file_morph_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload_file_morph
    ADD CONSTRAINT upload_file_morph_pkey PRIMARY KEY (id);


--
-- Name: upload_file upload_file_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.upload_file
    ADD CONSTRAINT upload_file_pkey PRIMARY KEY (id);


--
-- Name: users-permissions_permission users-permissions_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_permission"
    ADD CONSTRAINT "users-permissions_permission_pkey" PRIMARY KEY (id);


--
-- Name: users-permissions_role users-permissions_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_role"
    ADD CONSTRAINT "users-permissions_role_pkey" PRIMARY KEY (id);


--
-- Name: users-permissions_role users-permissions_role_type_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_role"
    ADD CONSTRAINT "users-permissions_role_type_unique" UNIQUE (type);


--
-- Name: users-permissions_user users-permissions_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_user"
    ADD CONSTRAINT "users-permissions_user_pkey" PRIMARY KEY (id);


--
-- Name: users-permissions_user users-permissions_user_username_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."users-permissions_user"
    ADD CONSTRAINT "users-permissions_user_username_unique" UNIQUE (username);


--
-- Name: faq-sections_components faq-section_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."faq-sections_components"
    ADD CONSTRAINT "faq-section_id_fk" FOREIGN KEY ("faq-section_id") REFERENCES public."faq-sections"(id) ON DELETE CASCADE;


--
-- Name: faqs_components faq_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faqs_components
    ADD CONSTRAINT faq_id_fk FOREIGN KEY (faq_id) REFERENCES public.faqs(id) ON DELETE CASCADE;


--
-- Name: faq_sections_components faq_section_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq_sections_components
    ADD CONSTRAINT faq_section_id_fk FOREIGN KEY (faq_section_id) REFERENCES public.faq_sections(id) ON DELETE CASCADE;


--
-- Name: faq_tutos_videos_components faq_tutos_video_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq_tutos_videos_components
    ADD CONSTRAINT faq_tutos_video_id_fk FOREIGN KEY (faq_tutos_video_id) REFERENCES public.faq_tutos_videos(id) ON DELETE CASCADE;


--
-- Name: section_faqs_components section_faq_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_faqs_components
    ADD CONSTRAINT section_faq_id_fk FOREIGN KEY (section_faq_id) REFERENCES public.section_faqs(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

