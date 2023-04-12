# Setup Instructions

> Requirements
>
> - Supabase CLI
> - Docker
> - Yarn/NPM

> For this specific project, you'll be doing local development work with a local instance of supabase. This will help you to develop faster and iterate better.

1. Install all the packages. We're using yarn so make sure not to use `npm`

```
yarn install
```

2. Generate an .env.example file which will have all the necessary environment variables populated within it. Once you've populated it with the right variables, change it to `.env `

```
yarn run generate-env
```

3. Make sure that your database types are accurate. To do so, you'll need a `DATABASE_URL` environment variable to be able to allow keysely to connect and introspect the prod db.

```
yarn run db-codegen
```

4. Login to supabase. You'll need to generate an access token for your local supabase instance. You can do so by going to [supabase's dashboard](https://app.supabase.com/account/tokens).

```
supabase login
```

5. Now you want to start a local development instance of supabase. You can do by running the command with

```
supabase start
```

This will in turn result in the following output

```
  schulz git:(main) ✗ supabase start


Applying migration 20230412102446_init_db.sql...
Seeding data supabase/seed.sql...
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: <anonKey>
service_role key: <serviceRoleKey>
```

# Guides

## Database Migrations

> This guide teaches you how to test your proposed changes against a local docker instance.

Supabase provides an easy mechanism for us to perform any sort of migration.

1. First, ensure all migrations have been performed against your local docker isntance

```bash
schulz git:(main) ✗ supabase db reset

Resetting database...
Initialising schema...
Applying migration 20230412102446_init_db.sql...
Seeding data supabase/seed.sql...
Finished supabase db reset on branch main.
```

2. Create a new migraiton

```
supabase migration new <migrationName>
```

3. Generate a diff of the new proposed changes

```
supabase db diff -f <migrationName>
```
