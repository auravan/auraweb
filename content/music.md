---
title: 我的音乐事业
author: 李崎滨
date: '2025-12-05'
slug: music
disable_author_date: true
disable_donate: true
disable_comments: true
disable_adsense: true
disable_mathjax: true
disable_prismjs: true
---
我擅长唱歌，但是唱的越来越少，现在在我眼里它只是个求偶工具。（当然对[ai音乐](/cn_aura/2025/12/ai_music)来说不是，这是ai泛化能力的极好说明）我会弹点键盘（NI A61）自娱自乐，有台rc505（你可以看陶喆的一个抽象演出），一对真力8010，一台roland cube street ex。

[这里](https://www.hooktheory.com/chordProgressionNode)有大量流行歌的markov实例。所有你感兴趣的和弦进行应该都有。

这是我写的音乐演奏家的markov图（随意填写，如果你按此模拟，练习，排练，演出的大概比例是2.5:1.6:5.8）,**点击图像上的节点可以查看更多关于我的信息。**
{{< mermaid class="center bordered shadow" >}}
graph LR
Start([开始]) --> A((练习))
    A((练习))
    B((排练))
    C((演出))
    C --> D([结束])
    E((探索其他音乐技术))
    A -->|0.7| A
    A -->|0.2| B
    A -->|0.1| C
    B -->|0.5| A
    B -->|0.3| B
    B -->|0.2| C
    C -->|0.1| B
    C -->|0.9| C
    E
    click A "https://auravan.top/music/music_train" "寻找好用的练习"
    click C "https://auravan.top/music/music_show" "我的演出"
    click E "https://auravan.top/music/music_tech" "音乐科技"
{{< /mermaid >}}



## 音乐结构
关于我的大学论文，其实是一种对音乐结构的探索尝试。在看完[真理元素的一期视频](https://www.bilibili.com/video/BV1Aj8DzzE42)后我意识到我当时做的事情就是markov所尝试做的一小部分。我甚至没有尝试连续分析两个音符，这实在是太糟糕了.![这是曾经的一封邮件](/images/mail_to_SAITO.png)幸运的是我发现我最近也开始同Ulam一样尝试玩一些纸牌游戏，比如三牌游戏。说不定我也能从中发掘一些真理。

对音乐结构的理解，可以从乐理书中学到，也可以从ai大模型音乐生成的建模中学到。我最推荐你从https://www.hooktheory.com/ 学习具体歌曲的和弦进行，在billy joel she is always a woman这首[具体的音乐](https://www.hooktheory.com/theorytab/view/billy-joel/shes-always-a-woman#Chorus)面前，你可以剖析他的和弦，欣赏历史上美妙的音乐。甚至从和弦复杂性对大量音乐排序检索。they really did a great job.但是后来我意识到，这首歌还有how deep is your love 是911事件为数不多的留存资料的背景音乐。

横向切片：想象你在编辫子（纤维丛？maybe），你需要尽可能优美地编织线条，你可以和流苏一样加花。不同的轨道track就像织布机的不同轨道。需要合理的穿针引线。

垂直切片：想象一个弹簧，弹簧上每周分布12个点，对应八度里的12个音。中间的2维n边形就是和弦。

像素级别的分析是频谱分析，这是hz级别的分析。izotope可以做到。

理论级别的分析是编曲，除了歌曲整体的结构（总谱），他还会教你怎么正确理解和使用效果器来达到目标效果，这就像shader之于计算机视觉。

now with ai,目前的级别是token级别，每1ms都被分析成为一种可能的语句。

如果是演奏家，那么你更关注指法如何排列才能更好地演奏曲谱。
## 音乐的初始意志

首先当然是好听，然后是自由，想去哪就去哪。音乐之树从人类深处扎根，由生命得以滋养。每一片叶子(某种markov链)都是一处风景。

# 畅想
应该有个二级歌单，歌单内的歌单，或者就是歌单之间的推荐。也就是关于音乐最后的注意力应该在哪里，当然应该是作者本身的生平和成就以及不朽的作品，还有音乐交织起来的故事。
