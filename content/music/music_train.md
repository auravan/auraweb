---
title: 音乐练习题
author: 李崎滨
date: '2024-09-01'
lastmod: '2024-09-02'
slug: music_train
disable_author_date: true
disable_donate: true
disable_comments: true
disable_adsense: true
disable_mathjax: true
disable_prismjs: true
---

# 练习题：
1. 《明天过后》的前奏：F调1-3b-4-1.右手旋律1345为Cadd11.
2. 默写5度，4度圈。默写各调251。
3. 从大模型的训练方式得到灵感，需要尝试音乐版本的完型填空。and you need huge sample and the analysis and generate attempts of that.比如小星星旋律：11556654433221，如果挖空可以怎么填写。1_____5,4_____1;
4. https://www.hooktheory.com/theorytab/view/lupe-fiasco/the-show-goes-on?node=1.56.6#chorus 总结这段和弦进行：多以第二转位为主，
5. 每个旋律对应一个独特的markov chain，需要熟悉这个状态转移。训练弹奏音阶，以Cmaj为例。上行则
{{< mermaid >}}
graph LR
    A((弹C))
    B((弹E))
    C((弹G))

    A -->|1|B
    B -->|1|C
    C -->|1|A 
{{< /mermaid >}}