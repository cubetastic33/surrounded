import random

moveable_tiles = {
    'c1': [7, 2],
    'c2': [1, 8, 3],
    'c3': [2, 9, 4],
    'c4': [3, 10, 5],
    'c5': [4, 11, 6],
    'c6': [5, 12],
    'c7': [13, 8, 1],
    'c8': [7, 14, 9, 2],
    'c9': [8, 15, 10, 3],
    'c10': [9, 16, 11, 4],
    'c11': [10, 17, 12, 5],
    'c12': [11, 18, 6],
    'c13': [19, 14, 7],
    'c14': [13, 20, 15, 8],
    'c15': [14, 21, 16, 9],
    'c16': [15, 22, 17, 10],
    'c17': [16, 23, 18, 11],
    'c18': [17, 24, 12],
    'c19': [25, 20, 13],
    'c20': [19, 26, 21, 14],
    'c21': [20, 27, 22, 15],
    'c22': [21, 28, 23, 16],
    'c23': [22, 29, 24, 17],
    'c24': [23, 30, 18],
    'c25': [31, 26, 19],
    'c26': [25, 32, 27, 20],
    'c27': [26, 33, 28, 21],
    'c28': [27, 34, 29, 22],
    'c29': [28, 35, 30, 23],
    'c30': [29, 36, 24],
    'c31': [32, 25],
    'c32': [31, 33, 26],
    'c33': [32, 34, 27],
    'c34': [33, 35, 28],
    'c35': [34, 36, 29],
    'c36': [35, 30]
}

def enemy_move(ally_positions, enemy_positions):
    chosenTile = enemy_positions[random.choice(range(0, len(enemy_positions)))]
    moveable_locations = moveable_tiles['c' + chosenTile]
    move_to = get_move_to_location(moveable_locations, ally_positions, enemy_positions)
    return [chosenTile, move_to]

def get_move_to_location(moveable_locations, ally_positions, enemy_positions):
    print('starting')
    move_to = moveable_locations[random.choice(range(0, len(moveable_locations)))]
    for team in [ally_positions, enemy_positions]:
        for occupied_position in team:
            print(move_to, occupied_position)
            if int(move_to) == int(occupied_position):
                print('same')
                return get_move_to_location(moveable_locations, ally_positions, enemy_positions)
    return move_to
