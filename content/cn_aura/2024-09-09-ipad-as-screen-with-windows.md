---
title: 软件实现HDMI阻塞的iPad/Windows无线副屏方案
author: 李崎滨
date: '2024-09-09'
slug: ipad-as-screen-with-windows
categories:
  - 生活小技巧
tags:
  - ipad
  - 无线串流
  - moonlight
  - sunshine
  - vitrual display driver
# images:
#   - /images/cn_aura/2024-09-09-ipad-as-screen-with-windows/screen.png
disable_author_date: true
disable_donate: false
disable_comments: true
disable_adsense: true
disable_mathjax: true
disable_prismjs: true
---


# 使用场景
如果办公需要屏幕拓展，苹果电脑用户常用Airplay（随航）将iPad作为一个副屏使用。有无线屏幕拓展需求的pc用户如今也可以使用iPad实现同样的功能，更加丝滑，可配置。

曾经这个实现受限于投屏软件的使用，但[moonlight](https://moonlight-stream.org/)的出现和普及使得这个方案变得可行。
# 前置任务（完成moonlight串流）
如果你有有使用moonlight**串流PCVR游戏或者windows桌面**的经验，你将很快实现本文所说的方案。
如果没有，你应该尝试搜索b站完成moonlight的相关配置。当你成功之后这个方案将唾手可得（划掉）。

# 实现虚拟拓展副屏
现在开始，只差临门一脚。我们只需要一个0成本的方案提供一块虚拟副屏，让windows操作系统认为我们接上了实际的屏幕，并使moonlight串流显示额外的屏幕内容，而不是默认的主屏幕。

Mike Rodriguez开源的[Virtual-Display-Driver](https://github.com/itsmikethetech/Virtual-Display-Driver)(简称vdd)项目给出了只需要软件配置就可以实现的虚拟副屏的方案，而非HDMI阻塞的传统方案。
你需要按照指引解决安装问题，直到windows系统识别到第二块屏幕。这中间可能会踩到一些坑，但是相信我这对于最后的成功来说这是值得的。

# 最后的配置
注意，由于是虚拟屏幕，所以设备的标识会如同ip地址一样被随机分配，你可能会**经常**使用下面的步骤：
sunshine在windows的配置中需要指定一块屏幕，sunshine的软件包中给出了好用的工具帮我们识别这些屏幕在系统中的标识。
```
#PS C:\Program Files\Sunshine\tools>在Sunshine的安装包内tools文件夹打开terminal
.\dxgi-info.exe
```
得到结果如下：
```
====== ADAPTER =====
Device Name      : NVIDIA GeForce RTX 3060 Laptop GPU
Device Vendor ID : 0x000010DE
Device Device ID : 0x00002560
Device Video Mem : 6010 MiB
Device Sys Mem   : 0 MiB
Share Sys Mem    : 8096 MiB

    ====== OUTPUT ======
    Output Name       : \\.\DISPLAY1     //这是电脑自带的主屏幕
    AttachedToDesktop : yes
    Resolution        : 2560x1600

    Output Name       : \\.\DISPLAY23
    AttachedToDesktop : yes
    Resolution        : 2560x1600

```
找到对应新建的虚拟副屏,找到这个副屏对应的标识\\**\\\.\DISPLAY23**(不同机器标识不同)。
运行sunshine后，打开浏览器进入//localhost:47990/config#界面。

将此标识写入Audio/vedio选项卡的**输出名称**下，即可实现丝滑串流。（配置建议moonlight打开120hz）

# 可能的坑
由于vdd实现的虚拟屏幕并不支持实时监测屏幕的连接和删除，ipad在关闭串流后，内留在ipad窗口的软件并不会重新显示在pc主屏幕上。


解决办法：把两个屏幕内容合并。在windows屏幕配置界面做如下位置修改。

![](/images/config_screen.png)

# 结语
如果你成功实现，那么你收获了一个非常不错的ipad做wireless副屏的解决方案。
这个过程中你会熟悉命令行，适配器和显示器的知识，串流码率的配置和一些奇怪的知识。

# 参考资料

[这位台湾老哥](https://ivonblog.com/posts/moonlight-use-a-tablet-as-a-second-monitor/)的资料是一切的开始。

如果您觉得不错或者有问题需要帮助，请赞赏留言。



