create type user_role as enum ('user', 'admin');

create table user_profile (
  id uuid references auth.users(id) primary key,
  email text unique not null,
  role user_role default 'user',
  first_name text,
  last_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create trigger to automatically create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.user_profile (id, email, role)
    values (new.id, new.email, 'user');
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Create profiles for existing users
insert into user_profile (id, email, role)
select id, email, 'user'
from auth.users
where id not in (select id from user_profile)
on conflict (id) do nothing;