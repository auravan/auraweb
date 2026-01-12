import numpy as np
import random

def simulate_markov(initial_state='A', steps=100):
    """
    模拟马尔可夫链的单次轨迹
    
    Parameters:
    -----------
    initial_state : str
        初始状态 ('A', 'B', 'C')
    steps : int
        模拟步数
    
    Returns:
    --------
    list : 状态序列
    """
    # 状态映射
    state_to_idx = {'A': 0, 'B': 1, 'C': 2}
    idx_to_state = {0: 'A', 1: 'B', 2: 'C'}
    
    # 转移概率矩阵
    transition_matrix = [
        [0.7, 0.2, 0.1],  # 从A出发
        [0.5, 0.3, 0.2],  # 从B出发
        [0.0, 0.1, 0.9]   # 从C出发
    ]
    
    # 初始状态
    current_state = initial_state
    current_idx = state_to_idx[current_state]
    trajectory = [current_state]
    
    for _ in range(steps-1):
        # 获取当前行的转移概率
        probs = transition_matrix[current_idx]
        
        # 根据概率随机选择下一个状态
        next_idx = np.random.choice([0, 1, 2], p=probs)
        next_state = idx_to_state[next_idx]
        
        trajectory.append(next_state)
        current_idx = next_idx
        current_state = next_state
    
    return trajectory

# 运行模拟
print("=== 单次模拟 (500步) ===")
trajectory = simulate_markov(initial_state='A', steps=10000)
print(f"轨迹前20步: {trajectory[:20]}")
print(f"最终状态: {trajectory[-1]}")
print(f"A出现次数: {trajectory.count('A')}")
print(f"B出现次数: {trajectory.count('B')}")
print(f"C出现次数: {trajectory.count('C')}")