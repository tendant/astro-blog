---
title: "Writing IAM Policies: How to Grant Access to an Amazon S3 Bucket"
author: ["Lei"]
summary: "The following sample IAM policy grants programmatic read-write access to the test bucket:"
date: 2017-09-27
categories: ["AWS"]
draft: false
layout: "../../layouts/Article.astro"
---

## Policy for Programmatic Access

Sample 1: Programmatic read and write permissions

```src_javascript
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::test"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": ["arn:aws:s3:::test/*"]
    }
  ]
}
```

The policy is separated into two parts because the ListBucket action requires permissions on the bucket while the other actions require permissions on the objects in the bucket. We used two different Amazon Resource Names (ARNs) to specify bucket-level and object-level permissions. The first Resource element specifies arn:aws:s3:::test for the ListBucket action so that applications can list all objects in the test bucket. The second Resource element specifies arn:aws:s3:::test/\* for the GetObject, PutObject, and DeletObject actions so that applications can read, write, and delete any objects in the test bucket.

We did not combine the two ARNs by using a wildcard, such as arn:aws:s3:::test\*. Even though this ARN would grant permissions for all actions in a single statement, it is broader and grants access to any bucket and objects in that bucket that begin with test, like test-bucket or testing.


## Policy for Console Access

For console access, we’ll need to make an addition to the previous policy. The console requires permission to list all buckets in the account. To list all buckets, users require the GetBucketLocation and ListAllMyBuckets actions for all resources in Amazon S3, as shown in the following sample:

Sample 2: Enable AWS Management Console access to an Amazon S3 bucket

```src_javascript

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetBucketLocation",
        "s3:ListAllMyBuckets"
      ],
      "Resource": "arn:aws:s3:::*"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": ["arn:aws:s3:::test"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": ["arn:aws:s3:::test/*"]
    }
  ]
}
```

With the additional statement, users can view the test bucket by using the console. Without those permissions, access is denied. The console lists all buckets in the account, but users cannot view the contents of any other bucket. The read-write permissions are specified only for the test bucket, just like in the previous policy. If a user tries to view another bucket, access is denied.
