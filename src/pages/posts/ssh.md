---
title: "Immediately terminate SSH session"
author: ["Lei"]
date: 2017-09-27
categories: ["Linux"]
draft: false
layout: "../../layouts/Article.astro"
---

Reference: <https://askubuntu.com/a/29952>

Normal keys are forwarded over the ssh session, so none of those will
work. Instead, use the escape sequences. To kill the current session
hit subsequently Enter ↵, ~, ..

More of these escape sequences can be listed with Enter ↵, ~, ?:

Supported escape sequences:

```text
~.  - terminate session
~B  - send a BREAK to the remote system
~R  - Request rekey (SSH protocol 2 only)
~#  - list forwarded connections
~?  - this message
~~  - send the escape character by typing it twice
```

(Note that escapes are only recognized immediately after newline.)
You can close the list of Escape sequences by hitting enter.

Notice that because hitting ~~ causes ssh to send the ~ instead of
intercepting it, you can address N nested ssh connections by hitting ~
N times. (This only applies to `s that directly follow an enter.) That
 is to say that enter~~~~`. terminates an ssh session 5 layers deep and
keeps the other 4 intact.
