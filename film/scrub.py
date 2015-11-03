source = 'ratings.txt'
target = 'ratings_clean.txt'

s = open(source, "r", encoding='utf-8')
t = open(target, "w", encoding='utf-8')

for line in s:
    split_line = line.split('\t')
    print(split_line)
    
    

