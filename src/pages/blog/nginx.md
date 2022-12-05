---
layout: ../../layouts/Article.astro
title: "Nginx quickstart"
author: ["Lei Wang"]
date: "2018-10-03"
categories: ["Linux"]
draft: false
---

## Install nginx {#install-nginx}

```shell
# For CentOS
$ yum install nginx

# For Ubuntu
$ apt install nginx
```


## nginx static website {#nginx-static-website}

Create file /etc/nginx/conf.d/www.example.com.conf

```nginx
server {
  listen 80;
  listen [::]:80;
  root /var/www/www.example.com;
  index index.html;
  server_name example.com www.example.com;
  location / {
    try_files $uri $uri/ =404;
  }
}
```


## nginx application server using proxy\_pass {#nginx-application-server-using-proxy-pass}

Create file /etc/nginx/conf.d/app.example.com.conf

```nginx
server {
    server_name app.example.com;  # Replace DOMAINNAME with the actual domain
    listen 80;
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        # Replace this INTERNALIPADDRESS:PORT with the IP and port
        # combination for the server on your network handling the
        # above-specified domain name.
        proxy_pass http://192.168.122.29:3001;
    }
}
```


## Restart nginx {#restart-nginx}

```shell
$ systemctl restart nginx
```


## Enable firewall to port 80 and 443 {#enable-firewall-to-port-80-and-443}


## Install certbot {#install-certbot}

```shell
# For CentOS
$ yum install epel-release
$ yum install certbot-nginx

# For Ubuntu
# $ apt install software-properties-common
# $ add-apt-repository ppa:certbot/certbot
$ apt update
$ apt install python3-certbot
$ apt install python3-certbot-nginx
```


## Add letscrypt acme challenge {#add-letscrypt-acme-challenge}

Add below configuration to nginx server configuration

```nginx
location ^~ /.well-known/acme-challenge {
    root /var/www/letscrypt/;
    default_type "text/plain";
}
location = /.well-known/acme-challenge/ {
    return 404;
}
```


## Use certbot {#use-certbot}

```shell
$ sudo certbot --nginx -d www.example.com
```

If using cloudflare, add parameter "--preferred-challenges http-01"

Generated nginx server configuration for SSL:

```nginx
listen 443 ssl; # managed by Certbot
ssl_certificate /etc/letsencrypt/live/recording.qa.wishlife.com/fullchain.pem; # managed by Certbot
ssl_certificate_key /etc/letsencrypt/live/recording.qa.wishlife.com/privkey.pem; # managed by Certbot
include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
```

If redirection is enabled:

```nginx
server {
    if ($host = www.example.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot
    server_name www.example.com;
    listen 80;
    return 404; # managed by Certbot
}
```

OR only generate certificate

```shell
$ certbot certonly --webroot -w /var/www/www.example.com -d www.example.com
```


## Backup folder /etc/letscrypt {#backup-folder-etc-letscrypt}


## Explanation of let's encrypt acme challenge {#explanation-of-let-s-encrypt-acme-challenge}

<https://community.letsencrypt.org/t/how-to-nginx-configuration-to-enable-acme-challenge-support-on-all-http-virtual-hosts/5622>

```nginx

#############################################################################
# Configuration file for Let's Encrypt ACME Challenge location
# This file is already included in listen_xxx.conf files.
# Do NOT include it separately!
#############################################################################
#
# This config enables to access /.well-known/acme-challenge/xxxxxxxxxxx
# on all our sites (HTTP), including all subdomains.
# This is required by ACME Challenge (webroot authentication).
# You can check that this location is working by placing ping.txt here:
# /var/www/letsencrypt/.well-known/acme-challenge/ping.txt
# And pointing your browser to:
# http://xxx.domain.tld/.well-known/acme-challenge/ping.txt
#
# Sources:
# https://community.letsencrypt.org/t/howto-easy-cert-generation-and-renewal-with-nginx/3491
#
#############################################################################

# Rule for legitimate ACME Challenge requests (like /.well-known/acme-challenge/xxxxxxxxx)
# We use ^~ here, so that we don't check other regexes (for speed-up). We actually MUST cancel
# other regex checks, because in our other config files have regex rule that denies access to files with dotted names.
location ^~ /.well-known/acme-challenge/ {

    # Set correct content type. According to this:
    # https://community.letsencrypt.org/t/using-the-webroot-domain-verification-method/1445/29
    # Current specification requires "text/plain" or no content header at all.
    # It seems that "text/plain" is a safe option.
    default_type "text/plain";

    # This directory must be the same as in /etc/letsencrypt/cli.ini
    # as "webroot-path" parameter. Also don't forget to set "authenticator" parameter
    # there to "webroot".
    # Do NOT use alias, use root! Target directory is located here:
    # /var/www/common/letsencrypt/.well-known/acme-challenge/
    root         /var/www/letsencrypt;
}

# Hide /acme-challenge subdirectory and return 404 on all requests.
# It is somewhat more secure than letting Nginx return 403.
# Ending slash is important!
location = /.well-known/acme-challenge/ {
    return 404;
}
```