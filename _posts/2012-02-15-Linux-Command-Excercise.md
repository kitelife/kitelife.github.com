---
layout: post
title: Linux命令习题
tags: [Linux]
---

For each of the outputs listed below, find one sequence of commands connected by pipes that produces the output. For each problem, turn in the command sequence that you used to generate the requested output. (Do NOT turn in the output itself.)

\1. A listing of all processes that you are currently running on the machine you are using, sorted by the command name in alphabetical order (i.e. a process running acroread should be listed before a process running bash). The output should consist only of the processes you are running, and nothing else (i.e. if you are running 6 processes, the output should only have 6 lines). 

    ps -e --sort cmd

\2. The number of words in the file /usr/share/dict/words (\*) which start with the letter a.

\* Note: On some Unix/Linux systems, the dictionary has the filename /usr/dict/words

    cat /usr/share/words | grep ^a.* | wc -l

\3. A "long" listing of the smallest 5 files in the /etc directory whose name contains the string ".conf", sorted by increasing file size. 

    ls -lSrp | grep [^/]$ | grep [\.]conf$ | head -n 5
