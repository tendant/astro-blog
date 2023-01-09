---
title: "quick start with aws ecscli"
author: ["Lei"]
date: 2017-09-27
tags: ["QuickStart"]
categories: ["AWS"]
draft: false
layout: "../../layouts/Article.astro"
---

1.  Install ecscli
    Mac OSX:
    ```src_shell
    $ sudo curl -o /usr/local/bin/ecs-cli https://s3.amazonaws.com/amazon-ecs-cli/ecs-cli-darwin-amd64-latest
    ```
    Linux:
    ```src_shell
    $ sudo curl -o /usr/local/bin/ecs-cli https://s3.amazonaws.com/amazon-ecs-cli/ecs-cli-linux-amd64-latest
    ```
2.  Apply execute permissions to the binary.
    ```src_shell
    $ sudo chmod +x /usr/local/bin/ecs-cli
    ```
3.  Verify that the CLI is working properly.
    ```src_shell
    $ ecs-cli --version
    ```
4.  Configure awscli
    ```src_shell
    $ ecs-cli configure --region us-west-2 --access-key $AWS_ACCESS_KEY_ID --secret-key $AWS_SECRET_ACCESS_KEY --cluster ecs-cli-demo
    ```
