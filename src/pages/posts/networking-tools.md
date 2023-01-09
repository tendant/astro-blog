---
title: "Networking Tools"
author: ["Lei"]
date: 2017-09-27
categories: ["Linux"]
draft: false
layout: "../../layouts/Article.astro"
---

## Start a particular openvpn client {#start-a-particular-openvpn-client}

```src_shell
$ sudo systemctl start openvpn@client1

$ sudo systemctl status openvpn@client1
```


## test server networking using UDP {#test-server-networking-using-udp}

```src_shell
$ nc -v -z -u server port # test server:port using UDP
```


## find opening port {#find-opening-port}

```src_shell
$ netstat -an
```


## find which process opening a particular port {#find-which-process-opening-a-particular-port}

```src_shell
$ lsof -i :5000
```
