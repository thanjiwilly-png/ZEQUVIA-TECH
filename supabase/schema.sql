create extension if not exists pgcrypto;

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 2 and 120),
  academic_year text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null check (length(trim(full_name)) between 1 and 120),
  created_at timestamptz not null default now()
);

create or replace function public.create_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  profile_name text;
begin
  profile_name := nullif(trim(new.raw_user_meta_data ->> 'full_name'), '');
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(profile_name, nullif(split_part(coalesce(new.email, new.phone, ''), '@', 1), ''), 'User'));
  return new;
end;
$$;

revoke all on function public.is_school_member(uuid) from public, anon;
revoke all on function public.has_school_role(uuid, text[]) from public, anon;
revoke all on function public.can_access_course(uuid) from public, anon;
revoke all on function public.is_parent_of(uuid, uuid) from public, anon;
grant execute on function public.is_school_member(uuid) to authenticated;
grant execute on function public.has_school_role(uuid, text[]) to authenticated;
grant execute on function public.can_access_course(uuid) to authenticated;
grant execute on function public.is_parent_of(uuid, uuid) to authenticated;

drop trigger if exists create_profile_after_signup on auth.users;
create trigger create_profile_after_signup
after insert on auth.users
for each row execute function public.create_profile_for_auth_user();

create table if not exists public.school_memberships (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null check (role in ('student', 'teacher', 'admin', 'parent')),
  created_at timestamptz not null default now(),
  unique (school_id, user_id)
);

create table if not exists public.parent_students (
  school_id uuid not null references public.schools (id) on delete cascade,
  parent_id uuid not null references public.profiles (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (school_id, parent_id, student_id),
  foreign key (school_id, parent_id)
    references public.school_memberships (school_id, user_id) on delete cascade,
  foreign key (school_id, student_id)
    references public.school_memberships (school_id, user_id) on delete cascade,
  check (parent_id <> student_id)
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools (id) on delete cascade,
  name text not null check (length(trim(name)) between 1 and 120),
  teacher_id uuid references public.profiles (id) on delete set null,
  room text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.course_enrollments (
  course_id uuid not null references public.courses (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  primary key (course_id, student_id)
);

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  teacher_id uuid references public.profiles (id) on delete set null,
  title text not null check (length(trim(title)) between 1 and 200),
  instructions text not null default '',
  due_at timestamptz,
  points integer not null default 100 check (points between 1 and 10000),
  created_at timestamptz not null default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  answer text not null default '',
  submitted_at timestamptz not null default now(),
  score numeric(7,2) check (score >= 0),
  feedback text not null default '',
  graded_at timestamptz,
  unique (assignment_id, student_id)
);

create table if not exists public.attendance_sessions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  teacher_id uuid references public.profiles (id) on delete set null,
  session_date date not null default current_date,
  topic text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.attendance_records (
  session_id uuid not null references public.attendance_sessions (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  status text not null check (status in ('present', 'late', 'absent', 'excused')),
  note text not null default '',
  recorded_at timestamptz not null default now(),
  primary key (session_id, student_id)
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools (id) on delete cascade,
  author_id uuid references public.profiles (id) on delete set null,
  title text not null check (length(trim(title)) between 1 and 200),
  body text not null check (length(trim(body)) between 1 and 10000),
  published_at timestamptz not null default now()
);

create table if not exists public.live_classes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  host_id uuid not null references public.profiles (id) on delete restrict,
  title text not null check (length(trim(title)) between 1 and 200),
  starts_at timestamptz not null,
  ends_at timestamptz,
  meeting_url text not null default '',
  status text not null default 'scheduled'
    check (status in ('scheduled', 'live', 'ended', 'cancelled')),
  created_at timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at)
);

create table if not exists public.live_class_attendance (
  live_class_id uuid not null references public.live_classes (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  left_at timestamptz,
  primary key (live_class_id, student_id)
);

create table if not exists public.live_class_messages (
  id uuid primary key default gen_random_uuid(),
  live_class_id uuid not null references public.live_classes (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (length(trim(body)) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table if not exists public.fee_charges (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  title text not null check (length(trim(title)) between 1 and 160),
  amount numeric(12,2) not null check (amount > 0),
  currency text not null default 'NGN' check (currency ~ '^[A-Z]{3}$'),
  due_at date,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.fee_payments (
  id uuid primary key default gen_random_uuid(),
  charge_id uuid not null references public.fee_charges (id) on delete restrict,
  amount numeric(12,2) not null check (amount > 0),
  method text not null check (method in ('cash', 'bank_transfer', 'card', 'other')),
  reference text not null default '',
  received_by uuid references public.profiles (id) on delete set null,
  paid_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create or replace function public.validate_fee_payment_total()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  charge_total numeric(12,2);
  paid_total numeric(12,2);
begin
  select charge.amount
    into charge_total
    from public.fee_charges charge
   where charge.id = new.charge_id
   for update;

  if charge_total is null then
    raise exception 'Fee charge does not exist';
  end if;

  select coalesce(sum(payment.amount), 0)
    into paid_total
    from public.fee_payments payment
   where payment.charge_id = new.charge_id;

  if paid_total + new.amount > charge_total then
    raise exception 'Payment exceeds the remaining balance';
  end if;

  return new;
end;
$$;

drop trigger if exists validate_fee_payment_before_insert on public.fee_payments;
create trigger validate_fee_payment_before_insert
before insert on public.fee_payments
for each row execute function public.validate_fee_payment_total();
revoke all on function public.validate_fee_payment_total() from public, anon, authenticated;

create index if not exists courses_school_idx on public.courses (school_id);
create index if not exists assignments_course_due_idx on public.assignments (course_id, due_at);
create index if not exists submissions_student_idx on public.submissions (student_id);
create index if not exists attendance_date_idx on public.attendance_sessions (course_id, session_date desc);
create index if not exists announcements_school_published_idx on public.announcements (school_id, published_at desc);
create index if not exists live_classes_course_start_idx on public.live_classes (course_id, starts_at);
create index if not exists live_messages_class_created_idx on public.live_class_messages (live_class_id, created_at);
create index if not exists fee_charges_student_due_idx on public.fee_charges (student_id, due_at);
create index if not exists fee_payments_charge_paid_idx on public.fee_payments (charge_id, paid_at desc);

create or replace function public.is_school_member(target_school uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.school_memberships membership
    where membership.school_id = target_school
      and membership.user_id = (select auth.uid())
  );
$$;

create or replace function public.has_school_role(target_school uuid, allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.school_memberships membership
    where membership.school_id = target_school
      and membership.user_id = (select auth.uid())
      and membership.role = any (allowed_roles)
  );
$$;

create or replace function public.can_access_course(target_course uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.courses course
    join public.school_memberships membership
      on membership.school_id = course.school_id
     and membership.user_id = (select auth.uid())
    where course.id = target_course
      and (
        membership.role in ('admin', 'teacher')
        or exists (
          select 1
          from public.course_enrollments enrollment
          where enrollment.course_id = course.id
            and enrollment.student_id = (select auth.uid())
        )
        or exists (
          select 1
          from public.course_enrollments enrollment
          join public.parent_students guardian
            on guardian.school_id = course.school_id
           and guardian.student_id = enrollment.student_id
          where enrollment.course_id = course.id
            and guardian.parent_id = (select auth.uid())
        )
      )
  );
$$;

create or replace function public.is_parent_of(target_student uuid, target_school uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.parent_students guardian
    where guardian.school_id = target_school
      and guardian.parent_id = (select auth.uid())
      and guardian.student_id = target_student
  );
$$;

alter table public.schools enable row level security;
alter table public.profiles enable row level security;
alter table public.school_memberships enable row level security;
alter table public.parent_students enable row level security;
alter table public.courses enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.attendance_sessions enable row level security;
alter table public.attendance_records enable row level security;
alter table public.announcements enable row level security;
alter table public.live_classes enable row level security;
alter table public.live_class_attendance enable row level security;
alter table public.live_class_messages enable row level security;
alter table public.fee_charges enable row level security;
alter table public.fee_payments enable row level security;

create policy "members can read their school"
on public.schools for select to authenticated
using (public.is_school_member(id));

create policy "users can read their own profile and school staff can read member profiles"
on public.profiles for select to authenticated
using (
  id = (select auth.uid())
  or exists (
    select 1
    from public.parent_students guardian
    where guardian.parent_id = (select auth.uid())
      and guardian.student_id = profiles.id
  )
  or exists (
    select 1
    from public.school_memberships own_membership
    join public.school_memberships target_membership
      on target_membership.school_id = own_membership.school_id
    where own_membership.user_id = (select auth.uid())
      and own_membership.role in ('admin', 'teacher')
      and target_membership.user_id = profiles.id
  )
  or exists (
    select 1
    from public.courses course
    where course.teacher_id = profiles.id
      and public.can_access_course(course.id)
  )
);

create policy "users can update their own profile"
on public.profiles for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy "members can read school memberships"
on public.school_memberships for select to authenticated
using (public.is_school_member(school_id));

create policy "admins can manage school memberships"
on public.school_memberships for all to authenticated
using (public.has_school_role(school_id, array['admin']))
with check (public.has_school_role(school_id, array['admin']));

create policy "parents students and staff can read guardian links"
on public.parent_students for select to authenticated
using (
  parent_id = (select auth.uid())
  or student_id = (select auth.uid())
  or public.has_school_role(school_id, array['admin', 'teacher'])
);

create policy "school admins manage guardian links"
on public.parent_students for all to authenticated
using (public.has_school_role(school_id, array['admin']))
with check (
  public.has_school_role(school_id, array['admin'])
  and exists (
    select 1
    from public.school_memberships parent_membership
    where parent_membership.school_id = parent_students.school_id
      and parent_membership.user_id = parent_students.parent_id
      and parent_membership.role = 'parent'
  )
  and exists (
    select 1
    from public.school_memberships student_membership
    where student_membership.school_id = parent_students.school_id
      and student_membership.user_id = parent_students.student_id
      and student_membership.role = 'student'
  )
);

create policy "members can read courses"
on public.courses for select to authenticated
using (public.is_school_member(school_id));

create policy "admins and teachers can manage courses"
on public.courses for all to authenticated
using (public.has_school_role(school_id, array['admin', 'teacher']))
with check (public.has_school_role(school_id, array['admin', 'teacher']));

create policy "members can read enrollments"
on public.course_enrollments for select to authenticated
using (
  student_id = (select auth.uid())
  or public.can_access_course(course_id)
);

create policy "admins and teachers can manage enrollments"
on public.course_enrollments for all to authenticated
using (
  exists (
    select 1 from public.courses course
    where course.id = course_enrollments.course_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
)
with check (
  exists (
    select 1 from public.courses course
    where course.id = course_enrollments.course_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
      and exists (
        select 1
        from public.school_memberships student_membership
        where student_membership.school_id = course.school_id
          and student_membership.user_id = course_enrollments.student_id
          and student_membership.role = 'student'
      )
  )
);

create policy "course members can read assignments"
on public.assignments for select to authenticated
using (public.can_access_course(course_id));

create policy "teachers and admins can manage assignments"
on public.assignments for all to authenticated
using (
  exists (
    select 1 from public.courses course
    where course.id = assignments.course_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
)
with check (
  exists (
    select 1 from public.courses course
    where course.id = assignments.course_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
);

create policy "students read own submissions and course staff read submissions"
on public.submissions for select to authenticated
using (
  student_id = (select auth.uid())
  or exists (
    select 1
    from public.assignments assignment
    join public.courses course on course.id = assignment.course_id
    where assignment.id = submissions.assignment_id
      and public.is_parent_of(student_id, course.school_id)
  )
  or exists (
    select 1
    from public.assignments assignment
    join public.courses course on course.id = assignment.course_id
    where assignment.id = submissions.assignment_id
      and exists (
        select 1
        from public.course_enrollments enrollment
        where enrollment.course_id = assignment.course_id
          and enrollment.student_id = submissions.student_id
      )
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
);

create policy "students submit for themselves"
on public.submissions for insert to authenticated
with check (
  student_id = (select auth.uid())
  and score is null
  and feedback = ''
  and graded_at is null
  and exists (
    select 1
    from public.assignments assignment
    join public.course_enrollments enrollment
      on enrollment.course_id = assignment.course_id
     and enrollment.student_id = (select auth.uid())
    where assignment.id = submissions.assignment_id
  )
);

create policy "students update own ungraded submissions and staff grade"
on public.submissions for update to authenticated
using (
  (student_id = (select auth.uid()) and score is null)
  or exists (
    select 1
    from public.assignments assignment
    join public.courses course on course.id = assignment.course_id
    where assignment.id = submissions.assignment_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
)
with check (
  (
    student_id = (select auth.uid())
    and score is null
    and feedback = ''
    and graded_at is null
  )
  or exists (
    select 1
    from public.assignments assignment
    join public.courses course on course.id = assignment.course_id
    where assignment.id = submissions.assignment_id
      and exists (
        select 1
        from public.course_enrollments enrollment
        where enrollment.course_id = assignment.course_id
          and enrollment.student_id = submissions.student_id
      )
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
);

create or replace function public.prevent_students_from_grading_their_work()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.student_id = (select auth.uid())
     and (
       new.score is distinct from old.score
       or new.feedback is distinct from old.feedback
       or new.graded_at is distinct from old.graded_at
     ) then
    raise exception 'Students cannot modify grading fields';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_submission_grades on public.submissions;
create trigger protect_submission_grades
before update on public.submissions
for each row execute function public.prevent_students_from_grading_their_work();

revoke all on function public.create_profile_for_auth_user() from public, anon, authenticated;
revoke all on function public.prevent_students_from_grading_their_work() from public, anon, authenticated;

create policy "course members can read attendance sessions"
on public.attendance_sessions for select to authenticated
using (public.can_access_course(course_id));

create policy "teachers and admins manage attendance sessions"
on public.attendance_sessions for all to authenticated
using (
  exists (
    select 1 from public.courses course
    where course.id = attendance_sessions.course_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
)
with check (
  exists (
    select 1 from public.courses course
    where course.id = attendance_sessions.course_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
);

create policy "students read own attendance and staff read course attendance"
on public.attendance_records for select to authenticated
using (
  student_id = (select auth.uid())
  or exists (
    select 1
    from public.attendance_sessions session
    join public.courses course on course.id = session.course_id
    where session.id = attendance_records.session_id
      and public.is_parent_of(attendance_records.student_id, course.school_id)
  )
  or exists (
    select 1
    from public.attendance_sessions session
    join public.courses course on course.id = session.course_id
    where session.id = attendance_records.session_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
      and exists (
        select 1
        from public.course_enrollments enrollment
        where enrollment.course_id = session.course_id
          and enrollment.student_id = attendance_records.student_id
      )
  )
);

create policy "teachers and admins record attendance"
on public.attendance_records for all to authenticated
using (
  exists (
    select 1
    from public.attendance_sessions session
    join public.courses course on course.id = session.course_id
    where session.id = attendance_records.session_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
)
with check (
  exists (
    select 1
    from public.attendance_sessions session
    join public.courses course on course.id = session.course_id
    where session.id = attendance_records.session_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
);

create policy "school members can read announcements"
on public.announcements for select to authenticated
using (public.is_school_member(school_id));

create policy "school staff can publish announcements"
on public.announcements for all to authenticated
using (public.has_school_role(school_id, array['admin', 'teacher']))
with check (public.has_school_role(school_id, array['admin', 'teacher']));

create policy "course members can read live classes"
on public.live_classes for select to authenticated
using (public.can_access_course(course_id));

create policy "school staff can manage live classes"
on public.live_classes for all to authenticated
using (
  exists (
    select 1 from public.courses course
    where course.id = live_classes.course_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
)
with check (
  exists (
    select 1 from public.courses course
    where course.id = live_classes.course_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
);

create policy "class members read and update own live attendance"
on public.live_class_attendance for select to authenticated
using (
  student_id = (select auth.uid())
  or exists (
    select 1
    from public.live_classes live_class
    join public.courses course on course.id = live_class.course_id
    where live_class.id = live_class_attendance.live_class_id
      and public.has_school_role(course.school_id, array['admin', 'teacher'])
  )
);

create policy "students can record their own live attendance"
on public.live_class_attendance for insert to authenticated
with check (
  student_id = (select auth.uid())
  and exists (
    select 1
    from public.live_classes live_class
    join public.course_enrollments enrollment
      on enrollment.course_id = live_class.course_id
     and enrollment.student_id = (select auth.uid())
    where live_class.id = live_class_attendance.live_class_id
  )
);

create policy "class members can read messages"
on public.live_class_messages for select to authenticated
using (
  exists (
    select 1
    from public.live_classes live_class
    where live_class.id = live_class_messages.live_class_id
      and public.can_access_course(live_class.course_id)
  )
);

create policy "class members send messages as themselves"
on public.live_class_messages for insert to authenticated
with check (
  author_id = (select auth.uid())
  and exists (
    select 1
    from public.live_classes live_class
    where live_class.id = live_class_messages.live_class_id
      and public.can_access_course(live_class.course_id)
  )
);

create policy "students parents and staff can read fee charges"
on public.fee_charges for select to authenticated
using (
  student_id = (select auth.uid())
  or public.is_parent_of(student_id, school_id)
  or public.has_school_role(school_id, array['admin', 'teacher'])
);

create policy "school staff manage fee charges"
on public.fee_charges for all to authenticated
using (public.has_school_role(school_id, array['admin', 'teacher']))
with check (
  public.has_school_role(school_id, array['admin', 'teacher'])
  and exists (
    select 1
    from public.school_memberships student_membership
    where student_membership.school_id = fee_charges.school_id
      and student_membership.user_id = fee_charges.student_id
      and student_membership.role = 'student'
  )
);

create policy "students parents and staff can read fee payments"
on public.fee_payments for select to authenticated
using (
  exists (
    select 1
    from public.fee_charges charge
    where charge.id = fee_payments.charge_id
      and (
        charge.student_id = (select auth.uid())
        or public.is_parent_of(charge.student_id, charge.school_id)
        or public.has_school_role(charge.school_id, array['admin', 'teacher'])
      )
  )
);

create policy "school staff record fee payments"
on public.fee_payments for insert to authenticated
with check (
  received_by = (select auth.uid())
  and exists (
    select 1
    from public.fee_charges charge
    where charge.id = fee_payments.charge_id
      and public.has_school_role(charge.school_id, array['admin', 'teacher'])
  )
);

grant usage on schema public to authenticated;
revoke all on public.schools, public.profiles, public.school_memberships, public.parent_students,
  public.courses, public.course_enrollments, public.assignments, public.submissions,
  public.attendance_sessions, public.attendance_records, public.announcements,
  public.live_classes, public.live_class_attendance, public.live_class_messages,
  public.fee_charges, public.fee_payments
  from anon;
grant select on public.schools, public.profiles, public.school_memberships, public.parent_students,
  public.courses, public.course_enrollments, public.assignments, public.submissions,
  public.attendance_sessions, public.attendance_records, public.announcements,
  public.live_classes, public.live_class_attendance, public.live_class_messages,
  public.fee_charges, public.fee_payments
  to authenticated;
grant update (full_name) on public.profiles to authenticated;
grant insert, update, delete on public.school_memberships, public.parent_students, public.courses,
  public.course_enrollments, public.assignments, public.submissions,
  public.attendance_sessions, public.attendance_records, public.announcements,
  public.live_classes, public.live_class_attendance, public.live_class_messages,
  public.fee_charges
  to authenticated;
grant insert on public.fee_payments to authenticated;
