---
title: "Static website with HTTPS and customized domain using S3, CloudFront and Route 53"
author: ["Lei"]
date: 2019-09-10
categories: ["AWS"]
draft: false
layout: "../../layouts/Article.astro"
---

## Create S3 bucket named as demo.example.com {#create-s3-bucket-named-as-demo-dot-example-dot-com}


## Create IAM user(user-demo.example.com) for uploading content {#create-iam-user--user-demo-dot-example-dot-com--for-uploading-content}


## Update S3 bucket policy (Update aws account, bucket name and username based on your own configuration) {#update-s3-bucket-policy--update-aws-account-bucket-name-and-username-based-on-your-own-configuration}

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::demo.example.com/*"
        },
        {
            "Sid": "Allow-deployment-To-Bucket",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<aws-account>:user/user-demo.example.com"
            },
            "Action": [
                "s3:ListBucket",
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:GetObjectAcl",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::demo.example.com",
                "arn:aws:s3:::demo.example.com/*"
            ]
        }
    ]
}
```


## Enable static website hosting in S3 bucket properties and record Endpoint like below: {#enable-static-website-hosting-in-s3-bucket-properties-and-record-endpoint-like-below}

<http://demo.example.com.s3-website-us-west-2.amazonaws.com>


## Upload content to s3 and test website using above URL {#upload-content-to-s3-and-test-website-using-above-url}


## Request a SSL Certificate using "Certificate Manager" for your own domain {#request-a-ssl-certificate-using-certificate-manager-for-your-own-domain}


## Create Web distribution in CloudFront using below settings {#create-web-distribution-in-cloudfront-using-below-settings}

| Origin Domain Name    | demo.example.com.s3-website-us-west-2.amazonaws.com                           |
|-----------------------|-------------------------------------------------------------------------------|
| Alternate Domain name | demo.example.com                                                              |
| SSL Certificate       | Custom SSL Certificate, and choose requested SSL Certificate in previous step |

It takes some time for this to take effect.

If you need update website content, you might need to invalidate CloudFront edge caches in some cases.


## Create a CNAME record in Route 53 for your domain and point to CloudFront domain name {#create-a-cname-record-in-route-53-for-your-domain-and-point-to-cloudfront-domain-name}

Once DNS is working, you should be able to access your website using HTTPS with your own domain.
