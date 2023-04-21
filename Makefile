start:
	supabase stop
	supabase start
	supabase status -o env --override-name auth.anon_key=SUPABASE_ANON_KEY --override-name auth.service_role_key=SUPABASE_SERVICE_KEY > .env