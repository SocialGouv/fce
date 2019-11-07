su -l postgres

chmod 0700 /var/lib/postgresql/data
initdb /var/lib/postgresql/data
echo "host all  all    0.0.0.0/0  md5" >> /var/lib/postgresql/data/pg_hba.conf
echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf
pg_ctl start

psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'fce'" | grep -q 1 || psql -U postgres -c "CREATE DATABASE fce" &&\
psql --command "ALTER USER postgres WITH ENCRYPTED PASSWORD 'w5@5lclO2F&4O8YQX#dI';"
