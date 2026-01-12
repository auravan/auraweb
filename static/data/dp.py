def solve_with_dp():
    budget = 1600
    prices = [300, 500, 700]
    
    # dp[i] 表示花费刚好为 i 元的买法数量
    # 预算是 1600，所以数组长度 1601
    dp = [0] * (budget + 1)
    dp[0] = 1  # 基础：花费 0 元的方法只有 1 种（什么都不买）

    # 核心状态转移
    for p in prices:
        for j in range(p, budget + 1):
            dp[j] += dp[j - p]

    # 计算总数（排除花费 0 的情况）
    total_valid_schemes = sum(dp[1:budget + 1])
    
    # 计算大于 1000 的总数
    greater_than_1000 = sum(dp[1001:budget + 1])

    print(f"所有买法总数: {total_valid_schemes}")
    print(f"大于1000的买法数: {greater_than_1000}")
    print(f"占比: {greater_than_1000}/{total_valid_schemes}")

solve_with_dp()