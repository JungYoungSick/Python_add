import sys

# 콜백함수를 통한 덧셈
def plus(x, y):
    return x + y
# 콜백함수를 통한 뺄셈
def minus(x, y):
    return x - y
# 콜백함수를 통한 곱셈
def multiply(x, y):
    return x * y
# 콜백함수를 통한 제곱    
def square(x, y):
    return x ** y
# 콜백함수를 통한 나눗셈
def divide(x, y):
    if y != 0:
      return x / y
# 콜백함수를 통한 나눗셈
def pusent(x, y):
    if y != 0:
      return x % y
# 나머지 오류
    else:
      return "계산 할 수 없습니다."

# 숫자와 input 숫자 입력

OneNum = float(input("첫 번째 숫자를 입력하세요: "))
operator = input("연산자를 입력하세요 (+, -, *, /, **, %): ")
TwoNum = float(input("두 번째 숫자를 입력하세요: "))

# 입력된 연산자에 따라 계산 수행
if operator == '+':
    result = plus(OneNum, TwoNum)
elif operator == '-':
    result = minus(OneNum, TwoNum)
elif operator == '*':
    result = multiply(OneNum, TwoNum)
elif operator == '/':
    result = divide(OneNum, TwoNum)
elif operator == '%':
    result = pusent(OneNum, TwoNum)
elif operator == '**':
    result = square(OneNum, TwoNum)
else:
    result = "올바른 연산자를 입력하세요."

# 결과 출력
print(f"계산 결과: {result}")

continue_input = input("계산을 종료하시겠습니까? (y/n): ")
if continue_input.lower() != 'y':
    sys.exit()