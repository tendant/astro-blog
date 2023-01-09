---
title: "ECS Notes"
author: ["Lei"]
date: 2017-09-04
categories: ["AWS"]
draft: false
layout: "../../layouts/Article.astro"
---

## ECS Policy {#ecs-policy}

The following IAM policy allows permission to create and list clusters. The CreateCluster and ListClusters actions do not accept any resources, so the resource definition is set to \* for all resources.

```src_javascript

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecs:CreateCluster",
        "ecs:ListClusters"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```


## ECS role for elb {#ecs-role-for-elb}

```src_javascript
 {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:AuthorizeSecurityGroupIngress",
        "ec2:Describe*",
        "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
        "elasticloadbalancing:DeregisterTargets",
        "elasticloadbalancing:Describe*",
        "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
        "elasticloadbalancing:RegisterTargets"
      ],
      "Resource": "*"
    }
  ]
}
```


## ecs load balancer {#ecs-load-balancer}

ansible ecs_service

<https://github.com/ansible/ansible-modules-extras/issues/2998>

The module does support the new application load balancer type already. You just need to specify the ELB target group arn.

E,g,

```text
load_balancers:
  - targetGroupArn: arn::blabla
    containerName: mycontainer
    containerPort: 8080
```


## ecs elb {#ecs-elb}

<https://stackoverflow.com/questions/42715647/whats-the-target-group-port-for-when-using-application-load-balancer-ec2-con>


## ecs ec2 container service {#ecs-ec2-container-service}

Create AmazonEC2ContainerServiceforEC2Role policy, this policy will be attached to container EC2 instance.

```src_javascript
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecs:CreateCluster",
        "ecs:DeregisterContainerInstance",
        "ecs:DiscoverPollEndpoint",
        "ecs:Poll",
        "ecs:RegisterContainerInstance",
        "ecs:StartTelemetrySession",
        "ecs:Submit*",
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```


## aws elb should be available in same availability zone as instances {#aws-elb-should-be-available-in-same-availability-zone-as-instances}

or else error:

reason: Target is in an Availability Zone that is not enabled for the load balancer


## manually create ecs application load balancer {#manually-create-ecs-application-load-balancer}

special health check uri: /uri


## aws ecs application elb {#aws-ecs-application-elb}

<https://aws.amazon.com/blogs/compute/microservice-delivery-with-amazon-ecs-and-application-load-balancers/>

1.  Key features of Application Load Balancers include:

Path-based routing – URL-based routing policies enable using the same ELB URL to route to different microservices
Multiple ports routing on same server
AWS integration – Integrated with many AWS services, such as ECS, IAM, Auto Scaling, and CloudFormation
Application monitoring – Improved metrics and health checks for the application

1.  Core components of Application Load Balancers include:

Load balancer – The entry point for clients
Listener – Listens to requests from clients on a specific protocol/port and forwards to one or more target group based on rules
Rule – Determines how to route the request – based on path-based condition and priority matches to one or more target groups
Target – The entity that runs the backend servers – currently EC2 is the available target group. The same EC2 instance can be registered multiple times with different ports
Target group – Each target group identifies a set of backend servers which can be routed based on a rule. Health checks can be defined per target group. The same load balancer can have many target groups


## Trouble shooting aws elb {#trouble-shooting-aws-elb}

1.  make sure elb have access to instances
2.  make sure server is up in stance/container


## ecs_service with load_balancers {#ecs-service-with-load-balancers}


## <span class="org-todo todo TODO">TODO</span> Added more details for for ecs_service load_balancers doc {#added-more-details-for-for-ecs-service-load-balancers-doc}

each load balancer dict should define loadBalancerName, containerName and containerPort. This was not mentioned on the Ansible doc. but it is available on boto doc here:  <http://boto3.readthedocs.io/en/latest/reference/services/ecs.html>


## ECS auto-scaling {#ecs-auto-scaling}

<http://garbe.io/blog/2016/10/17/docker-on-ecs-scale-your-ecs-cluster-automatically/>

In the end, the size of your cluster is not important for your AutoScaling policies. Important is the maximum memory or CPU of any of your tasks (containers) and the capacity of one of your container instances (basically the ec2 instance type). Based on that you can calculate the percentage when you have to scale your cluster.

Threshold = (1 - max(Container Reservation) / Total Capacity of a Single Container Instance) \* 100

Now we can calculate the threshold for the examples above: Container instance capacity: 2048 MB
Maximum of container reservation: 512 MB

Threshold = (1 - 512 / 2048) \* 100 Threshold = 75%

We calculated the threshold now only for memory but normally would need to do that for CPU as well. And the lower number of these two thresholds should be used.


## ECS container instance troubl shooting {#ecs-container-instance-troubl-shooting}

Container got killed  before it is health, because health check time interval is defined two small for service to be online, it is killed before JVM started.
