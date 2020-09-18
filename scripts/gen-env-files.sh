# Enter the DB username you want to initialize the database with.
echo 'Enter a username for the API database.'
read -p 'Username: ' dbUsername

# Enter the Synology username.
echo 'Enter a username for Synology.'
read -p 'Username: ' synologyUsername

# Enter the Synology password.
echo 'Enter a password for Synology.'
read -p 'Password: ' synologyPassword

echo 'Enter the password for your SSL certificate you generated.'
read -p 'Password: ' sslPassword

# Generate a random password.
dbName=vic-web
dbPassword=$(date +%s | sha256sum | base64 | head -c 32)
salt=$(date +%s | sha256sum | base64 | head -c 32)
secret=$(date +%s | sha256sum | base64 | head -c 32)

# Set environment variables.
if test -f "./api/db/.env"; then
    echo "./api/db/.env exists"
else
echo \
"MYSQL_ROOT_PASSWORD=$dbPassword
MYSQL_DATABASE=$dbName
MYSQL_USER=$dbUsername
MYSQL_PASSWORD=$dbPassword" >> ./api/db/.env
fi

if test -f "./api/src/.env"; then
    echo "./api/src/.env exists"
else
echo \
"ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=https://*:443;http://*:80

ASPNETCORE_Kestrel__Certificates__Default__Path=/root/https/aspnetcore.pfx
ASPNETCORE_Kestrel__Certificates__Default__Password=password

Synology__Username=$synologyUsername
Synology__Password=$synologyPassword

ConnectionStrings__VicWeb=SERVER=database;PORT=3306;DATABASE=$dbName;
DB_USERID=$dbUsername
DB_PASSWORD=$dbPassword

Authentication__Issuer=https://localhost:10443/
Authentication__Audience=https://localhost:10443/
Authentication__Salt=$salt
Authentication__Secret=$secret

Cors__WithOrigins=http://localhost:3000 https://localhost:3000

Mail__Host=smtp.ethereal.email
Mail__Port=587
Mail__Name=Jamey Pfeffer
Mail__Username=jamey80@ethereal.email
Mail__Password=
Mail__FromEmail=contact@victoriabiblestudy.com
Mail__ContactEmail=contact@victoriabiblestudy.com" >> ./api/src/.env
fi

if test -f "./api/src/.vs.env"; then
    echo "./api/src/.vs.env exists"
else
echo \
"ASPNETCORE_ENVIRONMENT=VS
ASPNETCORE_URLS=https://*:10443;http://*:1080

ASPNETCORE_Kestrel__Certificates__Default__Path=../certs/aspnetcore.pfx
ASPNETCORE_Kestrel__Certificates__Default__Password=password

Synology__Username=$synologyUsername
Synology__Password=$synologyPassword

ConnectionStrings__VicWeb=SERVER=localhost;PORT=3306;DATABASE=$dbName;
DB_USERID=$dbUsername
DB_PASSWORD=$dbPassword

Authentication__Issuer=https://localhost:10443/
Authentication__Audience=https://localhost:10443/
Authentication__Salt=$salt
Authentication__Secret=$secret

Cors__WithOrigins=http://localhost:3000 https://localhost:3000

Mail__Host=smtp.ethereal.email
Mail__Port=587
Mail__Name=Jamey Pfeffer
Mail__Username=jamey80@ethereal.email
Mail__Password=
Mail__FromEmail=contact@victoriabiblestudy.com
Mail__ContactEmail=contact@victoriabiblestudy.com" >> ./api/src/.vs.env
fi

if test -f "./api/libs/Data/.env"; then
    echo "./api/libs/Data/.env exists"
else
echo \
"ASPNETCORE_ENVIRONMENT=Development
DB_USERID=$dbUsername
DB_PASSWORD=$dbPassword
ConnectionStrings__VicWeb=SERVER=localhost;PORT=3306;DATABASE=$dbName;" >> ./api/libs/Data/.env
fi

if test -f "./app/.env"; then
    echo "./app/.env exists"
else
echo \
"NODE_ENV=Production
REACT_APP_API_URL=https://localhost:10443" >> ./app/.env
fi

if test -f "./app/.env.development"; then
    echo "./app/.env.development exists"
else
echo \
"NODE_ENV=Development
CHOKIDAR_USEPOLLING=true
REACT_APP_API_URL=https://localhost:10443" >> ./app/.env.development
fi
