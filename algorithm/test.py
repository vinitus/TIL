i = 120

a = ''
while i > 0:
    a = chr(ord('0') + (i % 10)) + a
    i //= 10

print(a)