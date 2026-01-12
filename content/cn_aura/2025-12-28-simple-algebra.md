---
title: "简单高等代数"
author: "李崎滨"
date: '2025-12-28'
slug: "my_own_logic_about_algbra"
description: "my_own_logic_about_algbra"
categories:
  - 音乐
tags:
 - 
disable_author_date: true
disable_donate: false
disable_comments: true
disable_adsense: true
disable_mathjax: false
disable_prismjs: true
---

# 前言
要彻底代数必须结合几何理解，遇到任何一个概念都要问自己，这个概念对应的几何意义是是什么。
本文按姚慕生，谢启鸿的高等代数介绍的概念，对出现的概念的几何意义按顺序进行统一阐释。

## 1.1.1 行列式
### 1.行列式
    行列式的几何意义？
参见[视频](https://www.bilibili.com/video/BV1Y84y1E7GB/?spm_id_from=333.337.search-card.all.click&vd_source=743607143c5aaf23f5d60644e3890025)

答：设 $A$ 是 $n \times n$ 矩阵，其列向量为 $\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n \in \mathbb{R}^n$。行列式 $D_n$ 定义为：

$$
D_n = \det(A) = \begin{vmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\\\
a_{21} & a_{22} & \cdots & a_{2n} \\\\
\vdots & \vdots & \ddots & \vdots \\\\
a_{n1} & a_{n2} & \cdots & a_{nn}
\end{vmatrix}
$$

$|D_n|$ 的几何意义是向量 $\mathbf{v}_1, \dots, \mathbf{v}_n$ 张成的 $n$ 维平行多面体的体积。

    直观的想法：行列式是否满足加减乘除？

答：加减不符合，乘除符合矩阵相关规则对应的运算。
### 2.余子式